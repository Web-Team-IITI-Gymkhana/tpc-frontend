"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";

import {
    ArrowLeft,
    Bell,
    CalendarDays,
    Eye,
    ImageIcon,
    Loader2,
    RefreshCw,
    Search,
    ShieldCheck,
    Trash2,
    X,
} from "lucide-react";

import {
    deleteAnnouncements,
    fetchAnnouncements,
} from "@/helpers/api";

import type {
    NoticeboardAnnouncement,
} from "@/helpers/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AnnouncementItem extends NoticeboardAnnouncement {
    id: number | string;
}

const sanitizeAnnouncement = (content: string): string => {
    // Preserve line breaks when the announcement contains plain text.
    const containsHtml = /<\/?[a-z][\s\S]*>/i.test(content);

    const contentToSanitize = containsHtml
        ? content
        : content.replace(/\r?\n/g, "<br />");

    return DOMPurify.sanitize(contentToSanitize, {
        ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "b",
            "em",
            "i",
            "u",
            "ul",
            "ol",
            "li",
            "a",
            "h1",
            "h2",
            "h3",
            "blockquote",
            "pre",
            "code",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
    });
};

const formatDate = (date?: string): string => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function NoticeBoardView(): JSX.Element {
    const [notifications, setNotifications] = useState<
        AnnouncementItem[]
    >([]);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] =
        useState<AnnouncementItem | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingIds, setDeletingIds] = useState<string[]>([]);
    const [bulkDeleting, setBulkDeleting] = useState(false);

    // Fetch announcements exclusively through the API helper.
    const loadAnnouncements = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetchAnnouncements();

            const items = Array.isArray(response?.data)
                ? response.data
                : [];

            // Show the newest announcements first.
            const sortedItems = [...items].sort(
                (a, b) =>
                    new Date(b.createdAt || "").getTime() -
                    new Date(a.createdAt || "").getTime(),
            );

            setNotifications(sortedItems as AnnouncementItem[]);
            setSelectedIds([]);
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to load announcements.";

            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadAnnouncements();
    }, [loadAnnouncements]);

    const filteredNotifications = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) return notifications;

        return notifications.filter((item) => {
            const searchableContent = [
                item.heading,
                item.info,
                item.clubname,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableContent.includes(query);
        });
    }, [notifications, searchTerm]);

    const visibleIds = filteredNotifications.map((item) =>
        String(item.id),
    );

    const allVisibleSelected =
        visibleIds.length > 0 &&
        visibleIds.every((id) => selectedIds.includes(id));

    const toggleSelectAll = () => {
        if (allVisibleSelected) {
            setSelectedIds((previous) =>
                previous.filter((id) => !visibleIds.includes(id)),
            );
        } else {
            setSelectedIds((previous) =>
                Array.from(new Set([...previous, ...visibleIds])),
            );
        }
    };

    const toggleSelection = (id: string | number) => {
        const normalizedId = String(id);

        setSelectedIds((previous) =>
            previous.includes(normalizedId)
                ? previous.filter((itemId) => itemId !== normalizedId)
                : [...previous, normalizedId],
        );
    };

    // Delete one or more announcements using the shared API helper.
    const handleDelete = async (
        ids: Array<string | number>,
    ) => {
        if (ids.length === 0) {
            toast.error("Please select an announcement.");
            return;
        }

        const confirmed = window.confirm(
            ids.length === 1
                ? "Are you sure you want to delete this announcement?"
                : `Are you sure you want to delete ${ids.length} announcements?`,
        );

        if (!confirmed) return;

        const normalizedIds = ids.map(String);

        if (ids.length === 1) {
            setDeletingIds(normalizedIds);
        } else {
            setBulkDeleting(true);
        }

        try {
            const result: any = await deleteAnnouncements(ids);

            // The backend should return { deletedCount, message }.
            if (
                !result ||
                typeof result.deletedCount !== "number"
            ) {
                throw new Error(
                    result?.message ||
                    "Failed to delete announcements.",
                );
            }

            if (result.deletedCount === 0) {
                throw new Error(
                    result.message ||
                    "No matching announcements were deleted.",
                );
            }

            const deletedSet = new Set(normalizedIds);

            setNotifications((previous) =>
                previous.filter(
                    (item) => !deletedSet.has(String(item.id)),
                ),
            );

            setSelectedIds((previous) =>
                previous.filter((id) => !deletedSet.has(id)),
            );

            if (
                selectedAnnouncement &&
                deletedSet.has(String(selectedAnnouncement.id))
            ) {
                setSelectedAnnouncement(null);
            }

            toast.success(
                result.message ||
                `${result.deletedCount} announcement(s) deleted successfully.`,
            );
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to delete announcements.";

            toast.error(message);
        } finally {
            setDeletingIds([]);
            setBulkDeleting(false);
        }
    };

    const isAnyDeleteRunning =
        bulkDeleting || deletingIds.length > 0;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-3 md:p-6">
            <div className="mx-auto w-full max-w-7xl">
                <Card className="overflow-hidden rounded-xl border-gray-200 bg-white shadow-lg md:rounded-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-5 text-white md:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                                <Bell className="h-7 w-7" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl font-bold md:text-2xl">
                                    Announcements
                                </h1>

                                <p className="mt-1 text-sm text-slate-200">
                                    Manage announcements and keep everyone informed.
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                                        <Bell className="mr-1.5 h-3.5 w-3.5" />
                                        {notifications.length} total
                                    </span>

                                    {selectedIds.length > 0 && (
                                        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                                            {selectedIds.length} selected
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex shrink-0 flex-wrap gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => void loadAnnouncements()}
                                    disabled={loading}
                                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                >
                                    <RefreshCw
                                        className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""
                                            }`}
                                    />
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="space-y-6 p-4 md:p-8">
                        {/* Summary cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                    <Bell className="h-5 w-5 text-indigo-700" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Announcements
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {notifications.length}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                    <Eye className="h-5 w-5 text-emerald-700" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Search Results
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {filteredNotifications.length}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100">
                                    <ShieldCheck className="h-5 w-5 text-violet-700" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Selected
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {selectedIds.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Search and actions */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                <Input
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search announcements..."
                                    className="pl-9"
                                />
                            </div>

                            {selectedIds.length > 0 && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={isAnyDeleteRunning}
                                    onClick={() => void handleDelete(selectedIds)}
                                    className="w-full sm:w-auto"
                                >
                                    {bulkDeleting ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="mr-2 h-4 w-4" />
                                    )}

                                    Delete Selected ({selectedIds.length})
                                </Button>
                            )}
                        </div>

                        {/* Error state */}
                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                                <p className="font-semibold text-red-800">
                                    Unable to load announcements
                                </p>

                                <p className="mt-1 text-sm text-red-700">
                                    {error}
                                </p>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => void loadAnnouncements()}
                                    className="mt-4 border-red-200 bg-white text-red-700 hover:bg-red-100"
                                >
                                    Try Again
                                </Button>
                            </div>
                        )}

                        {/* Announcements table */}
                        {!error && (
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                <div className="flex flex-col gap-2 border-b border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            All Announcements
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            View, search and manage published announcements.
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {filteredNotifications.length} records
                                    </span>
                                </div>

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center gap-3 p-12">
                                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />

                                        <p className="text-sm text-gray-500">
                                            Loading announcements...
                                        </p>
                                    </div>
                                ) : filteredNotifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-10 text-center md:p-16">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <Bell className="h-8 w-8 text-gray-400" />
                                        </div>

                                        <h3 className="text-base font-semibold text-gray-900">
                                            {searchTerm
                                                ? "No matching announcements"
                                                : "No announcements available"}
                                        </h3>

                                        <p className="mt-2 max-w-sm text-sm text-gray-500">
                                            {searchTerm
                                                ? "Try another search term to find an announcement."
                                                : "Published announcements will appear here."}
                                        </p>

                                        {searchTerm && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="mt-4"
                                                onClick={() => setSearchTerm("")}
                                            >
                                                Clear Search
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full min-w-[760px] text-left text-sm">
                                            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                                                <tr>
                                                    <th className="w-12 px-4 py-4 md:px-6">
                                                        <input
                                                            type="checkbox"
                                                            checked={allVisibleSelected}
                                                            onChange={toggleSelectAll}
                                                            aria-label="Select all visible announcements"
                                                            className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                                                        />
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Announcement
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Published By
                                                    </th>

                                                    <th className="px-4 py-4">
                                                        Published On
                                                    </th>

                                                    <th className="px-4 py-4 text-right">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-100">
                                                {filteredNotifications.map((item) => {
                                                    const id = String(item.id);

                                                    const isSelected =
                                                        selectedIds.includes(id);

                                                    const isDeleting =
                                                        deletingIds.includes(id) ||
                                                        bulkDeleting;

                                                    return (
                                                        <tr
                                                            key={id}
                                                            className={`transition-colors ${isSelected
                                                                    ? "bg-gray-50"
                                                                    : "hover:bg-gray-50/70"
                                                                }`}
                                                        >
                                                            <td className="px-4 py-4 md:px-6">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isSelected}
                                                                    onChange={() =>
                                                                        toggleSelection(item.id)
                                                                    }
                                                                    aria-label={`Select ${item.heading}`}
                                                                    className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                                                                />
                                                            </td>

                                                            <td className="max-w-md px-4 py-4">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                                                        {item.announcelogo ? (
                                                                            <img
                                                                                src={item.announcelogo}
                                                                                alt=""
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <ImageIcon className="h-5 w-5 text-gray-400" />
                                                                        )}
                                                                    </div>

                                                                    <div className="min-w-0">
                                                                        <p className="break-words font-semibold text-gray-900">
                                                                            {item.heading}
                                                                        </p>

                                                                        <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-gray-500">
                                                                            {item.info.replace(
                                                                                /<[^>]*>/g,
                                                                                " ",
                                                                            )}
                                                                        </p>

                                                                        {item.clubname && (
                                                                            <span className="mt-2 inline-flex rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                                                {item.clubname}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-gray-700">
                                                                {item.clubname || "CAMC"}
                                                            </td>

                                                            <td className="whitespace-nowrap px-4 py-4">
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" />

                                                                    <span>
                                                                        {formatDate(item.createdAt)}
                                                                    </span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            setSelectedAnnouncement(item)
                                                                        }
                                                                    >
                                                                        <Eye className="mr-1.5 h-4 w-4" />
                                                                        View
                                                                    </Button>

                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        disabled={isDeleting}
                                                                        onClick={() =>
                                                                            void handleDelete([item.id])
                                                                        }
                                                                    >
                                                                        {deletingIds.includes(id) ? (
                                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                                        ) : (
                                                                            <Trash2 className="h-4 w-4" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {!loading &&
                                    !error &&
                                    filteredNotifications.length > 0 && (
                                        <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between md:px-6">
                                            <p>
                                                Showing {filteredNotifications.length} of{" "}
                                                {notifications.length} announcements
                                            </p>

                                            <p>
                                                {selectedIds.length} selected
                                            </p>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Announcement detail modal */}
            {selectedAnnouncement && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 backdrop-blur-sm md:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedAnnouncement(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="announcement-dialog-title"
                        className="my-auto w-full max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl md:rounded-2xl"
                    >
                        <div className="flex items-start gap-4 bg-gradient-to-r from-slate-700 to-slate-800 p-5 text-white md:p-6">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                                <Bell className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
                                    Announcement Details
                                </p>

                                <h2
                                    id="announcement-dialog-title"
                                    className="mt-1 break-words text-lg font-bold md:text-xl"
                                >
                                    {selectedAnnouncement.heading}
                                </h2>

                                <p className="mt-2 text-sm text-slate-300">
                                    {selectedAnnouncement.clubname || "CAMC"}
                                    {" · "}
                                    {formatDate(selectedAnnouncement.createdAt)}
                                </p>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label="Close announcement details"
                                onClick={() => setSelectedAnnouncement(null)}
                                className="shrink-0 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="max-h-[70vh] overflow-y-auto p-5 md:p-8">
                            {selectedAnnouncement.announcelogo && (
                                <div className="mb-6 flex justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <img
                                        src={selectedAnnouncement.announcelogo}
                                        alt="Announcement logo"
                                        className="max-h-64 max-w-full rounded-lg object-contain"
                                    />
                                </div>
                            )}

                            <div
                                className="break-words text-sm leading-7 text-gray-700 [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_h1]:my-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:my-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:my-2 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-2 [&_p]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-gray-100 [&_pre]:p-3 [&_strong]:font-semibold [&_ul]:my-2"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeAnnouncement(
                                        selectedAnnouncement.info || "",
                                    ),
                                }}
                            />
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 p-4 sm:flex-row sm:justify-end md:px-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setSelectedAnnouncement(null)}
                            >
                                Close
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                disabled={isAnyDeleteRunning}
                                onClick={() => {
                                    void handleDelete([selectedAnnouncement.id]);
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Announcement
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}