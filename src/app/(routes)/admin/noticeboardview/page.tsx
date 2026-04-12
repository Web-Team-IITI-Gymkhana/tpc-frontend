"use client";

import { useEffect, useState } from "react";

interface NotificationItem {
    announcelogo: string;
    heading: string;
    info: string;
}

export default function NoticeBoardView(): JSX.Element {
    const [notifi, setNotifi] = useState<NotificationItem[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/api/v1/notification"
                );
                const data = await res.json();

                setNotifi(data.reverse());
            } catch (err) {
                console.error("Failed to load notifications:", err);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4">

            <h1 className="text-3xl md:text-4xl font-bold text-[#052659] mb-10 tracking-wide">
                Announcements
            </h1>

            {notifi.length === 0 ? (
                <div className="flex flex-col items-center space-y-4 text-gray-500 mt-16">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="No notifications"
                        className="w-28 h-28 opacity-80"
                    />
                    <p className="text-lg font-medium">
                        No announcements available
                    </p>
                </div>
            ) : (
                <div className="w-full md:w-[900px] flex flex-col gap-6">

                    {notifi.map((e, index) => (
                        <div
                            key={index}
                            className="group bg-white border border-gray-200 rounded-xl p-6 flex items-start justify-between gap-6 shadow-sm hover:shadow-lg transition duration-300"
                        >

                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-[4px] bg-[#0A3A8A] rounded-full"></div>

                                <div>
                                    <h2 className="text-lg md:text-xl font-semibold text-[#052659] group-hover:text-[#0A3A8A] transition">
                                        {e.heading}
                                    </h2>

                                    <div className="w-12 h-[2px] bg-gray-200 my-2"></div>

                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {e.info}
                                    </p>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <img
                                    src={e.announcelogo}
                                    alt="announcement"
                                    onClick={() => setSelectedImage(e.announcelogo)}
                                    className="h-[60px] w-[60px] object-cover rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:scale-110 transition duration-300"
                                />
                            </div>

                        </div>
                    ))}

                </div>
            )}

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative">
                
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-8 right-0 text-white text-3xl font-bold"
                        >
                            ✕
                        </button>

                        <img
                            src={selectedImage}
                            alt="preview"
                            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            )}

        </div>
    );
}