"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import CardLaporan from "./cardlaporan";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LaporanPKL() {
    const [laporan, setLaporan] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:2008/pembimbingDudi/laporan-pkl-kendala", { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            setLaporan(res.data.data);
        })
    },[])

    return (
        <div>
            <WhiteTemplate>
                <h1 className="text-2xl mb-5 font-bold">Laporan PKL</h1>
                {laporan.map((laporan:any) => (
                    <CardLaporan name={laporan.tanggal} kendala={laporan.kendala} />
                ))}
            </WhiteTemplate>
        </div>
    );
}