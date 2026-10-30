"use client";

import "react-quill/dist/quill.snow.css";

import React, {
    useEffect,
    useMemo,
    useState,
    ChangeEvent,
    FormEvent,
} from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import {
    apiCall,
    fetchPrograms,
} from "@/helpers/api";

import {
    ArrowLeft,
    ImagePlus,
    Mail,
    Megaphone,
    Search,
    Send,
    Users,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
            Loading rich text editor...
        </div>
    ),
});

interface AnnouncementFormData {
    clubname: string;
    heading: string;
    info: string;
    announcelogo: string;
}

interface ProgramRecord {
    id: string;
    year: string;
    course: string;
    branch: string;
    department?: string;
}

interface ProgramOption {
    value: string;
    label: string;
}

type RecipientGroup = "none" | "all" | "manager" | "programs";

interface ApiErrorResponse {
    statusCode?: number;
    message?: string | string[];
    errors?: string[];
}

const RECIPIENT_GROUPS: {
    value: RecipientGroup;
    label: string;
}[] = [
        { value: "none", label: "None" },
        { value: "all", label: "All Students" },
        { value: "manager", label: "Placement Manager" },
        { value: "programs", label: "Specific Programs" },
    ];

const FIELD_CLASS =
    "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "blockquote", "code-block"],
        ["clean"],
    ],
};

const QUILL_FORMATS = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "blockquote",
    "code-block",
];

const isRichTextEmpty = (html: string): boolean => {
    const text = html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;|&#160;/gi, " ")
        .replace(/&amp;/gi, "&")
        .trim();

    return text.length === 0;
};

const getPlainTextLength = (html: string): number => {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;|&#160;/gi, " ")
        .trim().length;
};

export default function Announce(): JSX.Element {
    const router = useRouter();

    const [group, setGroup] = useState<RecipientGroup>("all");

    const [manualEmails, setManualEmails] = useState("");
    const [selectedProgramIds, setSelectedProgramIds] = useState<string[]>(
        [],
    );

    const [programOptions, setProgramOptions] = useState<ProgramOption[]>(
        [],
    );

    const [programSearch, setProgramSearch] = useState("");
    const [programsLoading, setProgramsLoading] = useState(false);
    const [programsError, setProgramsError] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [logoPreview, setLogoPreview] = useState("");

    const [formData, setFormData] = useState<AnnouncementFormData>({
        clubname: "CAMC",
        heading: "",
        info: "",
        announcelogo: "",
    });

    /*
     * Load academic programs through the shared API helper.
     */
    useEffect(() => {
        let active = true;

        const loadPrograms = async () => {
            setProgramsLoading(true);
            setProgramsError("");

            try {
                const response: any = await fetchPrograms();

                const programs: ProgramRecord[] = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data)
                        ? response.data
                        : [];

                if (
                    !Array.isArray(response) &&
                    !Array.isArray(response?.data)
                ) {
                    const message = Array.isArray(response?.message)
                        ? response.message.join(", ")
                        : response?.message;

                    throw new Error(
                        message || "Unable to load academic programs.",
                    );
                }

                if (!active) return;

                const options: ProgramOption[] = programs
                    .filter((program) => program?.id)
                    .map((program) => ({
                        value: String(program.id),
                        label: [
                            program.year,
                            program.course,
                            program.branch,
                        ]
                            .filter(Boolean)
                            .join(" · "),
                    }))
                    .sort((a, b) =>
                        a.label.localeCompare(b.label, undefined, {
                            numeric: true,
                        }),
                    );

                setProgramOptions(options);
            } catch (error: unknown) {
                if (active) {
                    setProgramsError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load academic programs.",
                    );
                }
            } finally {
                if (active) {
                    setProgramsLoading(false);
                }
            }
        };

        void loadPrograms();

        return () => {
            active = false;
        };
    }, []);

    const visiblePrograms = useMemo(() => {
        const query = programSearch.trim().toLowerCase();

        if (!query) return programOptions;

        return programOptions.filter((program) =>
            program.label.toLowerCase().includes(query),
        );
    }, [programOptions, programSearch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors([]);
    };

    /*
     * Save rich text editor content as HTML.
     */
    const handleRichTextChange = (value: string) => {
        setFormData((previous) => ({
            ...previous,
            info: value,
        }));

        setErrors([]);
    };

    /*
     * Validate and preview the announcement logo.
     */
    const handleLogoChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const supportedImageTypes = [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
        ];

        if (!supportedImageTypes.includes(file.type)) {
            setErrors([
                "Please select a PNG, JPG, GIF, or WebP image.",
            ]);

            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setErrors([
                "The announcement logo must be 2 MB or smaller.",
            ]);

            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result !== "string") {
                setErrors(["Unable to read the selected image."]);
                return;
            }

            const image = reader.result;

            setLogoPreview(image);

            setFormData((previous) => ({
                ...previous,
                announcelogo: image,
            }));

            setErrors([]);
        };

        reader.onerror = () => {
            setErrors(["Unable to read the selected image."]);
        };

        reader.readAsDataURL(file);
    };

    const removeLogo = () => {
        setLogoPreview("");

        setFormData((previous) => ({
            ...previous,
            announcelogo: "",
        }));
    };

    const toggleProgram = (programId: string) => {
        setSelectedProgramIds((previous) =>
            previous.includes(programId)
                ? previous.filter((id) => id !== programId)
                : [...previous, programId],
        );

        setErrors([]);
    };

    const selectAllVisiblePrograms = () => {
        setSelectedProgramIds((previous) =>
            Array.from(
                new Set([
                    ...previous,
                    ...visiblePrograms.map((program) => program.value),
                ]),
            ),
        );

        setErrors([]);
    };

    const clearSelectedPrograms = () => {
        setSelectedProgramIds([]);
        setErrors([]);
    };

    /*
     * Validate announcement content and recipients.
     */
    const validateForm = (): boolean => {
        const validationErrors: string[] = [];

        if (!formData.heading.trim()) {
            validationErrors.push("Announcement heading is required.");
        }

        if (isRichTextEmpty(formData.info)) {
            validationErrors.push("Announcement content is required.");
        }

        if (group === "programs" && selectedProgramIds.length === 0) {
            validationErrors.push("Please select at least one program.");
        }

        if (group === "programs" && programsError) {
            validationErrors.push(
                "Programs could not be loaded. Please refresh and try again.",
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const enteredEmails = manualEmails
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean);

        const invalidEmails = enteredEmails.filter(
            (email) => !emailPattern.test(email),
        );

        if (invalidEmails.length > 0) {
            validationErrors.push(
                `Invalid email address(es): ${invalidEmails.join(", ")}`,
            );
        }

        setErrors(validationErrors);

        return validationErrors.length === 0;
    };

    /*
     * Reset the form after a successful submission.
     */
    const resetForm = () => {
        setFormData({
            clubname: "CAMC",
            heading: "",
            info: "",
            announcelogo: "",
        });

        setLogoPreview("");
        setManualEmails("");
        setGroup("all");
        setSelectedProgramIds([]);
        setProgramSearch("");
        setErrors([]);
    };

    /*
     * Publish an announcement through the existing apiCall() helper.
     *
     * apiCall() handles:
     * - Backend URL construction
     * - JWT authorization
     * - JSON request bodies
     * - HTTP requests
     */
    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors([]);

        try {
            const emailsArray = manualEmails
                .split(",")
                .map((email) => email.trim())
                .filter(Boolean);

            const payload = {
                ...formData,
                group,
                emails: emailsArray,
                programIds:
                    group === "programs"
                        ? selectedProgramIds
                        : [],
            };

            const result = (await apiCall("/announce", {
                method: "POST",
                body: payload,
                isAuth: true,
                recieveResponse: true,
            })) as ApiErrorResponse | undefined;

            if (!result || typeof result !== "object") {
                throw new Error(
                    "No response received from the server. Please try again.",
                );
            }

            if (
                typeof result.statusCode === "number" &&
                result.statusCode >= 400
            ) {
                const message = Array.isArray(result.message)
                    ? result.message.join(", ")
                    : result.message;

                throw new Error(
                    message || "Failed to publish announcement.",
                );
            }

            window.alert(
                result.message ||
                "Announcement published successfully.",
            );

            resetForm();

            router.push("/admin/noticeboardview");
        } catch (error: unknown) {
            setErrors([
                error instanceof Error
                    ? error.message
                    : "Something went wrong while publishing the announcement.",
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-6">
            <div className="mx-auto w-full max-w-4xl">
                <Card className="overflow-hidden rounded-xl border-gray-200 bg-white shadow-lg md:rounded-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-5 text-white md:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                                <Megaphone className="h-6 w-6" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl font-bold md:text-2xl">
                                    Create Announcement
                                </h1>

                                <p className="mt-1 text-sm text-slate-200">
                                    Publish notices and updates for the intended recipients.
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => router.back()}
                                aria-label="Go back"
                                className="shrink-0 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-7 p-4 md:p-8"
                    >
                        {errors.length > 0 && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 p-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-1 text-sm font-semibold text-red-800">
                                            Please check the following
                                        </p>

                                        {errors.map((error, index) => (
                                            <p
                                                key={`${error}-${index}`}
                                                className="text-sm text-red-700"
                                            >
                                                {error}
                                            </p>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Dismiss errors"
                                        onClick={() => setErrors([])}
                                        className="text-red-500 transition hover:text-red-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Announcement details */}
                        <section className="space-y-5">
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Announcement Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Provide the details that recipients will see.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="clubname">
                                        Club Name
                                    </Label>

                                    <Input
                                        id="clubname"
                                        value={formData.clubname}
                                        readOnly
                                        className="bg-gray-50 text-gray-500"
                                    />

                                    <p className="text-xs text-gray-500">
                                        The publishing club is set automatically.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="heading">
                                        Announcement Heading
                                        <span className="ml-1 text-red-500">
                                            *
                                        </span>
                                    </Label>

                                    <Input
                                        id="heading"
                                        name="heading"
                                        value={formData.heading}
                                        onChange={handleChange}
                                        placeholder="Enter announcement heading"
                                        maxLength={500}
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Rich text editor */}
                        <section className="space-y-3">
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Announcement Content
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Format your announcement using headings, lists, links,
                                    and text styling.
                                </p>
                            </div>

                            <div className="noticeboard-rich-editor overflow-hidden rounded-lg border border-gray-200 bg-white transition focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-200">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.info}
                                    onChange={handleRichTextChange}
                                    modules={QUILL_MODULES}
                                    formats={QUILL_FORMATS}
                                    placeholder="Write your announcement here..."
                                />
                            </div>

                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-gray-500">
                                    Formatting will be saved with your announcement.
                                </p>

                                <p className="text-xs text-gray-500">
                                    {getPlainTextLength(formData.info)} characters
                                </p>
                            </div>
                        </section>

                        {/* Logo upload */}
                        <section className="relative space-y-4">
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Announcement Logo
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Add an optional image to accompany the announcement.
                                </p>
                            </div>

                            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 md:p-5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Announcement logo preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <ImagePlus className="h-8 w-8 text-gray-400" />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <Label
                                            htmlFor="announcement-logo"
                                            className="mb-2 block"
                                        >
                                            Upload an image
                                        </Label>

                                        <p className="mb-3 text-sm text-gray-500">
                                            PNG, JPG, GIF or WebP. Maximum file size: 2 MB.
                                        </p>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <label
                                                htmlFor="announcement-logo"
                                                className="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
                                            >
                                                <ImagePlus className="mr-2 h-4 w-4" />
                                                Choose Image
                                            </label>

                                            {logoPreview && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={removeLogo}
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Remove
                                                </Button>
                                            )}
                                        </div>

                                        <input
                                            id="announcement-logo"
                                            type="file"
                                            accept="image/png,image/jpeg,image/gif,image/webp"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Recipients */}
                        <section className="space-y-5">
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Recipients
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Choose who should receive this announcement.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipient-group">
                                    Recipient Group
                                </Label>

                                <select
                                    id="recipient-group"
                                    value={group}
                                    onChange={(event) => {
                                        const nextGroup =
                                            event.target.value as RecipientGroup;

                                        setGroup(nextGroup);

                                        if (nextGroup !== "programs") {
                                            setSelectedProgramIds([]);
                                        }

                                        setErrors([]);
                                    }}
                                    className={FIELD_CLASS}
                                >
                                    {RECIPIENT_GROUPS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <p className="text-xs text-gray-500">
                                    {group === "all" &&
                                        "Send to students in the student database."}

                                    {group === "none" &&
                                        "Send only to manually entered email addresses."}

                                    {group === "manager" &&
                                        "Send to the placement manager and any additional recipients."}

                                    {group === "programs" &&
                                        "Choose the academic programs whose students should receive the announcement."}
                                </p>
                            </div>

                            {/* Program selection */}
                            {group === "programs" && (
                                <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <Label className="text-sm font-semibold">
                                                Select Programs
                                            </Label>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Choose one or more programs.
                                            </p>
                                        </div>

                                        <span className="inline-flex w-fit items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                                            <Users className="mr-1.5 h-3.5 w-3.5" />
                                            {selectedProgramIds.length} selected
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                        <Input
                                            value={programSearch}
                                            onChange={(event) =>
                                                setProgramSearch(event.target.value)
                                            }
                                            placeholder="Search by year, course or branch..."
                                            className="pl-9"
                                            disabled={programsLoading}
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                programsLoading ||
                                                visiblePrograms.length === 0
                                            }
                                            onClick={selectAllVisiblePrograms}
                                        >
                                            Select visible
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            disabled={
                                                selectedProgramIds.length === 0
                                            }
                                            onClick={clearSelectedPrograms}
                                        >
                                            Clear selection
                                        </Button>
                                    </div>

                                    <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white">
                                        {programsLoading ? (
                                            <div className="flex items-center justify-center gap-2 p-8 text-sm text-gray-500">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
                                                Loading programs...
                                            </div>
                                        ) : programsError ? (
                                            <div className="p-4 text-sm text-red-600">
                                                {programsError}
                                            </div>
                                        ) : visiblePrograms.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <Search className="mx-auto mb-2 h-6 w-6 text-gray-300" />

                                                <p className="text-sm font-medium text-gray-700">
                                                    No programs found
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    Try another search term.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-100">
                                                {visiblePrograms.map((program) => {
                                                    const checked =
                                                        selectedProgramIds.includes(
                                                            program.value,
                                                        );

                                                    return (
                                                        <label
                                                            key={program.value}
                                                            className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition ${checked
                                                                    ? "bg-gray-50"
                                                                    : "hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={checked}
                                                                onChange={() =>
                                                                    toggleProgram(program.value)
                                                                }
                                                                className="h-4 w-4 shrink-0 rounded border-gray-300 accent-gray-900 focus:ring-gray-950"
                                                            />

                                                            <span className="min-w-0 flex-1">
                                                                <span className="block text-sm font-medium text-gray-900">
                                                                    {program.label}
                                                                </span>

                                                                <span className="mt-0.5 block text-xs text-gray-500">
                                                                    Program ID: {program.value}
                                                                </span>
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Additional email recipients */}
                        <section className="space-y-4">
                            <div className="border-b border-gray-200 pb-3">
                                <h2 className="text-base font-semibold text-gray-900">
                                    Additional Recipients
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Add email addresses alongside the selected group.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="manual-emails">
                                    Extra Email Addresses
                                </Label>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <Input
                                        id="manual-emails"
                                        type="text"
                                        value={manualEmails}
                                        onChange={(event) =>
                                            setManualEmails(event.target.value)
                                        }
                                        placeholder="person@example.com, another@example.com"
                                        className="pl-9"
                                    />
                                </div>

                                <p className="text-xs text-gray-500">
                                    Separate multiple email addresses with commas.
                                </p>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={() => router.back()}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={
                                    loading ||
                                    (programsLoading && group === "programs")
                                }
                                loading={loading}
                                size="lg"
                                className="w-full sm:min-w-52 sm:w-auto"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                {loading
                                    ? "Publishing..."
                                    : "Publish Announcement"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>

            {/* Rich text editor styling */}
            <style jsx global>{`
                .noticeboard-rich-editor .ql-toolbar.ql-snow {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2px;
                    border: none;
                    border-bottom: 1px solid #e5e7eb;
                    background: #f9fafb;
                    padding: 10px;
                }

                .noticeboard-rich-editor .ql-toolbar .ql-formats {
                    margin-right: 8px;
                }

                .noticeboard-rich-editor .ql-container.ql-snow {
                    border: none;
                    font-family: inherit;
                    font-size: 14px;
                }

                .noticeboard-rich-editor .ql-editor {
                    min-height: 220px;
                    padding: 16px;
                    color: #111827;
                    line-height: 1.7;
                }

                .noticeboard-rich-editor .ql-editor.ql-blank::before {
                    left: 16px;
                    right: 16px;
                    color: #9ca3af;
                    font-style: normal;
                }

                .noticeboard-rich-editor .ql-editor h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .noticeboard-rich-editor .ql-editor h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                .noticeboard-rich-editor .ql-editor h3 {
                    font-size: 1.125rem;
                    font-weight: 600;
                }

                .noticeboard-rich-editor .ql-editor a {
                    color: #1d4ed8;
                    text-decoration: underline;
                }

                .noticeboard-rich-editor .ql-editor blockquote {
                    border-left: 4px solid #d1d5db;
                    color: #4b5563;
                    padding-left: 12px;
                }

                @media (max-width: 640px) {
                    .noticeboard-rich-editor .ql-toolbar.ql-snow {
                        padding: 8px;
                    }

                    .noticeboard-rich-editor .ql-toolbar .ql-formats {
                        margin-right: 4px;
                    }

                    .noticeboard-rich-editor .ql-editor {
                        min-height: 180px;
                        padding: 12px;
                    }
                }
            `}</style>
        </div>
    );
}