"use client";

import { useEffect, useState } from "react";

interface NotificationItem {
    anouncment_photo: string;
    anouncement_heading: string;
    anouncment_info: string;
}

export default function Notification(): JSX.Element {
    const [notifi, setNotifi] = useState<NotificationItem[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await fetch("http://localhost:5000/notification");
                const data = await res.json();

                const filled: NotificationItem[] = data
                    .map((ann: any) => ({
                        anouncment_photo: ann.announcelogo,
                        anouncement_heading: ann.heading,
                        anouncment_info: ann.info,
                    }))
                    .reverse();

                setNotifi(filled);
            } catch (err) {
                console.error("Failed to load notifications:", err);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4">

            {/* Title */}
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

                            {/* Left */}
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-[4px] bg-[#0A3A8A] rounded-full"></div>

                                <div>
                                    <h2 className="text-lg md:text-xl font-semibold text-[#052659] group-hover:text-[#0A3A8A] transition">
                                        {e.anouncement_heading}
                                    </h2>

                                    <div className="w-12 h-[2px] bg-gray-200 my-2"></div>

                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        {e.anouncment_info}
                                    </p>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={e.anouncment_photo}
                                    alt="announcement"
                                    className="h-[60px] w-[60px] object-cover rounded-lg border border-gray-300 shadow-sm group-hover:scale-105 transition duration-300"
                                />
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}