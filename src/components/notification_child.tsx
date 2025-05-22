"use client";

import { ProccessPkl, SuccessPkl } from "./icons/icons";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NotificationProps {
    id: number;
    title: string;
    deskripsi: string;
    tanggal: string;
    isRead: boolean; // Properti baru untuk status baca
}

export function NotificationChildren({ id, title, deskripsi, tanggal, isRead }: NotificationProps) {
    const [readStatus, setReadStatus] = useState(isRead); // Local state untuk mengatur status baca
    const pathname = usePathname();
    const isGuruPage = pathname.includes("/guru");
    const isDudiPage = pathname.includes("/dudi");

    const notifURL = isGuruPage
      ? `http://localhost:2008/guru-pembimbing/notification/read/${id}`
      : isDudiPage
      ? `http://localhost:2008/pembimbingDudi/notification/read/${id}` 
      : `http://localhost:2008/siswa/notification/read/${id}`;

    function markAsRead() {
        axios.post(notifURL, {}, { withCredentials: true })
            .then((res) => {
                setReadStatus(true);
                console.log(res.data.data);

            })
            .catch((err) => {
                console.log(err);

            })


    };

    return (
        <div className="flex justify-center">
            <div className={`flex flex-col gap-2 w-[70%] px-3 py-1 border-2 rounded-md my-1 ${readStatus ? "bg-gray-100" : ""}`}>
                <div className="flex w-[100%] justify-evenly gap-3">
                    <div className="flex items-center justify-between w-[100%]">
                        <div className="flex items-center gap-3 font-semibold">
                            <SuccessPkl />
                            {title}
                        </div>
                        <h4 className="font-semibold text-lg">{tanggal}</h4>
                    </div>
                </div>
                <div className="ml-12">
                    <p>{deskripsi}</p>
                </div>
                <div className="flex justify-center gap-2 my-1">
                    {!readStatus && (
                        <span
                            onClick={markAsRead}
                            className="text-accentColor w-[40%] border-2 border-accentColor font-semibold rounded-sm text-center p-1 cursor-pointer hover:shadow-lg"
                        >
                            Tandai Telah Dibaca
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
