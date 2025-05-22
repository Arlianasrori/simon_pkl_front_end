"use client";

import { LinkIcon, ProfileIcon } from "@/components/icons/icons";
import { GuruHomeComponent } from "@/components/siswa/BelumInstansi";
import SiswaCard from "@/components/siswacard";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function HomeGuruPage() {
    const [Siswa, setSiswa] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2008/guru-pembimbing/siswa", { withCredentials: true }).then((res) => {
            setSiswa(res.data.data)
        })
    }, [])
    console.log(Siswa);


    return (
        <div className="w-[100%]">
            <WhiteTemplate>
                <div>
                    <div className="">
                        <h1 className="font-bold text-3xl">Selamat Datang, Sulaiman S.Pd</h1>
                        <p>NIRP : 1212121313</p>
                    </div>
                    <GuruHomeComponent />
                    <Link className="items-center mb-10" href={"/guru/siswabimbingan"}>
                        <div className="flex justify-between mb-10 items-end">
                            <h2 className="font-semibold text-xl mt-10 text-gray-500">Siswa Bimbingan</h2>
                            <LinkIcon />
                        </div>
                    </Link>                    
                    <div className="grid grid-cols-3 gap-4">
                        {Siswa.map((item: any) => (
                            <SiswaCard key={item.id} variant="profile" url="/guru/profilesiswa" name={item.nama} kelas={item.kelas.nama.toUpperCase()} />
                        ))}
                    </div>
                </div>
            </WhiteTemplate>
        </div>
    )
}