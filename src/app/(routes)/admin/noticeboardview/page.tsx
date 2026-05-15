"use client";

import { useEffect, useState } from "react";

interface NotificationItem {
    id?: string;
    announcelogo: string;
    heading: string;
    info: string;
    createdAt?: string;
    clubname?: string;
}

export default function NoticeBoardView(): JSX.Element {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notification`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch announcements."
                    );
                }

                if (Array.isArray(data)) {
                    setNotifications([...data].reverse());
                } else if (Array.isArray(data.data)) {
                    setNotifications([...data.data].reverse());
                } else {
                    setNotifications([]);
                }
            } catch (err: any) {
                setError(
                    err?.message || "Something went wrong while loading announcements."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <p className="text-slate-600 text-lg">Loading announcements...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Announcements
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Stay updated with the latest notices and updates.
                        </p>
                    </div>

                    {notifications.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                            <p className="text-lg font-medium text-slate-600">
                                No announcements available.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {notifications.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                                        <div className="flex-1">
                                            {item.clubname && (
                                                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
                                                    {item.clubname}
                                                </p>
                                            )}

                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                {item.heading}
                                            </h2>

                                            <p className="mt-4 whitespace-pre-line text-slate-700 leading-7">
                                                {item.info}
                                            </p>

                                            {item.createdAt && (
                                                <p className="mt-4 text-sm text-slate-400">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        {item.announcelogo && (
                                            <div className="md:w-32 flex-shrink-0">
                                                <img
                                                    src={item.announcelogo}
                                                    alt="Announcement logo"
                                                    onClick={() =>
                                                        setSelectedImage(item.announcelogo)
                                                    }
                                                    className="h-24 w-24 rounded-xl border border-slate-200 object-cover cursor-pointer hover:scale-105 transition"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white text-4xl font-bold"
                        >
                            ×
                        </button>

                        <img
                            src={selectedImage}
                            alt="Announcement preview"
                            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}