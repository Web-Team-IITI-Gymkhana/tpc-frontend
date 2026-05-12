"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface AnnouncementFormData {
    clubname: string;
    heading: string;
    info: string;
    announcelogo: string;
}

export default function Announce(): JSX.Element {
    const router = useRouter();

    const [group, setGroup] = useState("all");
    const [manualEmails, setManualEmails] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [logoPreview, setLogoPreview] = useState("");

    const [formData, setFormData] = useState<AnnouncementFormData>({
        clubname: "CAMC",
        heading: "",
        info: "",
        announcelogo: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const imageBase64 = reader.result as string;

            setLogoPreview(imageBase64);

            setFormData((prev) => ({
                ...prev,
                announcelogo: imageBase64,
            }));
        };

        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        const validationErrors: string[] = [];

        if (!formData.heading.trim()) {
            validationErrors.push("Announcement heading is required.");
        }

        if (!formData.info.trim()) {
            validationErrors.push("Announcement content is required.");
        }

        setErrors(validationErrors);

        return validationErrors.length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors([]);

        try {
            const emailsArray = manualEmails
                .split(",")
                .map((email) => email.trim())
                .filter((email) => email.length > 0);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announce`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...formData,
                        group,
                        emails: emailsArray,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                if (result.errors && Array.isArray(result.errors)) {
                    setErrors(result.errors);
                } else {
                    setErrors([result.message || "Failed to publish announcement."]);
                }

                return;
            }

            alert(result.message || "Announcement published successfully.");

            setFormData({
                clubname: "CAMC",
                heading: "",
                info: "",
                announcelogo: "",
            });

            setLogoPreview("");
            setManualEmails("");
            setGroup("all");

            router.push("/admin/noticeboardview");
        } catch (error: any) {
            setErrors([
                error?.message || "Something went wrong while publishing announcement.",
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white shadow-lg border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Create Announcement
                    </h1>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    {errors.length > 0 && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                            {errors.map((error, index) => (
                                <p key={index} className="text-sm text-red-600">
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Club Name
                        </label>

                        <input
                            type="text"
                            value={formData.clubname}
                            readOnly
                            className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Heading
                        </label>

                        <input
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                            placeholder="Enter announcement heading"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Announcement Content
                        </label>

                        <textarea
                            name="info"
                            value={formData.info}
                            onChange={handleChange}
                            placeholder="Write your announcement here"
                            rows={6}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 resize-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Announcement Logo
                        </label>

                        <div className="flex items-center gap-4">
                            <label className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
                                {logoPreview ? (
                                    <img
                                        src={logoPreview}
                                        alt="Announcement logo"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-slate-400 text-center px-2">
                                        Upload Logo
                                    </span>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>

                            <p className="text-sm text-slate-500">
                                Optional image that will appear with the announcement.
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Recipient Group
                        </label>

                        <select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        >
                            <option value="none">None</option>
                            <option value="all@iiti.ac.in">All Students</option>
                        </select>
                    </div>

                    <div className="mb-8">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Extra Emails
                        </label>

                        <input
                            type="text"
                            value={manualEmails}
                            onChange={(e) => setManualEmails(e.target.value)}
                            placeholder="example1@gmail.com, example2@gmail.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                        />

                        <p className="mt-2 text-sm text-slate-500">
                            Enter additional email addresses separated by commas.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-700 px-4 py-3 text-white font-semibold hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400 transition"
                    >
                        {loading ? "Publishing..." : "Publish Announcement"}
                    </button>
                </form>
            </div>
        </div>
    );
}