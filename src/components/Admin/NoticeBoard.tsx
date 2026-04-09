"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
// import iiti from "../Images/iiti.png";


interface LoginInfo {
    clubname: string;
    heading: string;
    info: string;
    announcelogo: any;
}

export default function Announce(): JSX.Element {
    const router = useRouter();
    const params = useParams();

    const club_name = "CAMC";

    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setloading] = useState<boolean>(false);

    const [announcelogo, setannouncelogo] = useState<string>("");

    const [logininfo, setlogininfo] = useState<LoginInfo>({
        clubname: "CAMC",
        heading: "",
        info: "",
        announcelogo: "",
    });

    const handlelogochange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setannouncelogo(reader.result as string);
                setlogininfo((prev) => ({
                    ...prev,
                    announcelogo: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setlogininfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleVerification = async (email: string): Promise<boolean> => {
        try {
            const res = await fetch("http://localhost:5000/api/verifyadmin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            return data.authorized;
        } catch (err) {
            console.error("Verification error:", err);
            alert("Something went wrong. Try again later.");
            return false;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);

        const email = prompt("Enter your email to verify admin access:");
        if (!email) {
            alert("Email is required.");
            return;
        }

        const authorized = await handleVerification(email);

        if (!authorized) {
            alert("You're not authorized to make announcements.");
            router.push("/noticeboardview");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/v1/announce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logininfo),
            });

            const result = await res.json();

            if (res.ok) {
                alert(result.message || "Announcement successful");
                // setannouncelogo(iiti.src);
                setlogininfo({
                    clubname: "CAMC",
                    heading: "",
                    info: "",
                    announcelogo: "",
                });
                router.push("/noticeboardview");
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors([result.message || "Signup failed"]);
                }
            }
        } catch (err: any) {
            console.error("Submit error:", err);
            alert("Something went wrong: " + (err.message || err));
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
            <div className="relative w-full md:w-[500px] bg-white border border-gray-200 rounded-xl shadow-md p-8">
                <button
                    className="absolute top-4 right-4 w-[32px] h-[32px] rounded-full bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center transition"
                    onClick={() => router.back()}
                >
                    ✕
                </button>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center w-full"
                >
                    <h2 className="text-2xl font-bold text-[#052659] mb-6">
                        Create Announcement
                    </h2>

                    {errors.length > 0 && (
                        <div className="w-full mb-4 text-center bg-red-500 text-white p-3 rounded-md">
                            {errors.map((msg, idx) => (
                                <p key={idx}>{msg}</p>
                            ))}
                        </div>
                    )}

                    <div className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-semibold text-gray-800">
                        CAMC                        
                    </div>

                    <input
                        type="text"
                        placeholder="Announcement Heading"
                        name="heading"
                        value={logininfo.heading}
                        onChange={handleChange}
                        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3A8A] outline-none"
                    />

                    <textarea
                        placeholder="Announcement Info"
                        name="info"
                        value={logininfo.info}
                        onChange={handleChange}
                        className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg h-[120px] resize-none focus:ring-2 focus:ring-[#0A3A8A] outline-none"
                    />

                    <div className="flex items-center justify-between w-full mb-6">
                        <span className="font-semibold text-gray-700">
                            Announcement Logo
                        </span>

                        <label className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition">
                            <img
                                src={announcelogo}
                                className="w-full h-full object-cover"
                                alt="logo"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlelogochange}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-[#0A3A8A] hover:bg-[#052659] text-white font-bold text-lg transition shadow-sm"
                    >
                        Publish Announcement
                    </button>
                </form>
            </div>
        </div>
    );
}