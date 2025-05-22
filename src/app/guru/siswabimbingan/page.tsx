"use client";

import { LeftArrow } from "@/components/icons/icons";
import SiswaCard from "@/components/siswacard";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiswaBimbingan() {

    const [siswa, setSiswa] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2008/guru-pembimbing/siswa", { withCredentials: true }).then((res) => {
            setSiswa(res.data.data)
        })
    }, [])

    return (
        <div>
            <WhiteTemplate>
                <Link href={"/guru/"}>
                    <LeftArrow />
                </Link>
                <h1 className="text-2xl mb-5 text-center font-bold">Siswa Bimbingan</h1>
                <div className="grid grid-cols-3 gap-4">
                    {siswa.map((item: any) => (
                        <SiswaCard key={item.id} variant="profile" url="/guru/profilesiswa" name={item.nama} kelas={item.kelas.nama.toUpperCase()} />
                    ))}
                </div>
            </WhiteTemplate>
        </div>
    );
}