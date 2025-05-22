"use client"

import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import { useEffect, useState } from "react";
import CardHistori from "./cardhistori";

export default function HistoriAbsen() {
    const [absen, setAbsen] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2008/siswa/absen", { withCredentials: true }).then((res) => {
            console.log(res.data.data)
            setAbsen(res.data.data)
        })
    },[])

    return (
        <div>
            <WhiteTemplate>
                <div className="text-2xl font-bold text-center">Histori Absen</div>
                <div className="grid grid-cols-3 gap-4 mt-10">
                    {absen.map((item: any) => (
                        <CardHistori key={item.id} tanggal={item.tanggal} status_absen_pulang={item.status_absen_pulang.toUpperCase()}></CardHistori>
                    ))}
                </div>
            </WhiteTemplate>

        </div>
    )
}