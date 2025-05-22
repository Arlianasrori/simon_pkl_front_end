"use client";


import WhiteTemplate from "@/components/WhiteTemplate";
import { API_ENDPOINTS } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import CardAbsen from "./cardAbsen";


export default function AbsenSiswa() {
    const [absen, setAbsen]:any = useState([]);
    useEffect(() => {
        axios.get(API_ENDPOINTS.adminGetAbsen, { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            setAbsen(res.data.data.data)
        })
    },[])
    return (
        <div>
            <WhiteTemplate>
                <h1 className="text-2xl mb-5 text-center font-bold">Absen Siswa</h1>

                <div className="mt-10 grid gap-2 grid-cols-3">
                    <CardAbsen nama={absen[2]?.nama.toUpperCase()} tanggal={absen[2]?.absen[0]?.tanggal} status={absen[2]?.absen[0]?.status_absen_pulang.toUpperCase()} />
                    <CardAbsen nama={absen[2]?.nama.toUpperCase()} tanggal={absen[2]?.absen[0]?.tanggal} status={absen[2]?.absen[0]?.status_absen_pulang.toUpperCase()} />
                    <CardAbsen nama={absen[2]?.nama.toUpperCase()} tanggal={absen[2]?.absen[0]?.tanggal} status={absen[2]?.absen[0]?.status_absen_pulang.toUpperCase()} />
                </div>
            </WhiteTemplate>
        </div>
    );
}