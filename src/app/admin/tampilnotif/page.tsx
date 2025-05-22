"use client";

import React, { useState } from "react";
import WhiteTemplate from "@/components/WhiteTemplate";

export default function TampilNotif() {
    const [showNotif, setShowNotif] = useState(false);

    const toggleNotif = () => {
        setShowNotif(!showNotif);
    };

    return (
        <div>
            <WhiteTemplate>
                <button onClick={toggleNotif}>Tampil Notif</button>
                <div className={`notif-container ${showNotif ? "show" : ""}`}>
                    <p>Notifikasi berhasil ditampilkan!</p>
                </div>
            </WhiteTemplate>
            <style jsx>{`
                .notif-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #4caf50;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .notif-container.show {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
}
