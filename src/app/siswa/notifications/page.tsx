"use client";

import { NotificationChildren } from "@/components/notification_child";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import { useEffect, useState } from "react";

interface NotificationItem {
    id: number;
    title: string;
    body: string;
    created_at: string;
    reads: { id: number; is_read: boolean }[];
}

interface Notifications {
    [date: string]: NotificationItem[];
}

export default function Notification() {
    const [notifications, setNotifications] = useState<Notifications>({});

    useEffect(() => {
        axios.get("http://localhost:2008/siswa/notification", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setNotifications(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="">
            <WhiteTemplate>
                <h1 className="text-2xl mb-12 font-bold">Notification</h1>
                <div className="flex flex-col gap-5">
                    {Object.keys(notifications).map((date) => (
                        <div key={date} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">{date}</h2>
                            {notifications[date].map((notif) => (
                                <NotificationChildren
                                    key={notif.id}
                                    id={notif.id}
                                    title={notif.title}
                                    deskripsi={notif.body}
                                    tanggal={new Date(notif.created_at).toLocaleDateString()}
                                    isRead={notif.reads.some((read) => read.is_read)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </WhiteTemplate>
        </div>
    );
}
