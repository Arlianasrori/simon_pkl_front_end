"use client";

import { ProfileBlue, ProfileIcon, RightArrow } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PengajuanKeluar() {
    const [ajuanKeluar, setAjuanKeluar] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2008/pembimbingDudi/pengajuan-keluar-pkl", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setAjuanKeluar(res.data.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <div className="w-full">
            <WhiteTemplate>
                <h2 className="text-2xl font-semibold">Pengajuan Keluar PKL</h2>
                {ajuanKeluar.map((item: any, index) => (
                    <Link href={`/dudi/pengajuankeluar/${item.id}`} key={index}>
                        <div className="mt-5">
                            <div className="flex justify-between p-2 gap-2 bg-white rounded-lg shadow-md">
                                <div className="border-3 border-accentColor p-1 rounded-full">
                                    <ProfileBlue />
                                </div>
                                <div className="flex flex-col items-center">
                                    <h5 className="font-semibold">{item.siswa.nama}</h5>
                                    <p>Alasan : {item.alasan}</p>
                                </div>
                                <RightArrow />
                            </div>
                        </div>
                    </Link>
                ))}


            </WhiteTemplate>
        </div>
    );
}