"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DetailSiswa({params}: {params: {siswa: string}}) {
    const [siswa, setSiswa] = useState<any>({});

    useEffect(() => {
        axios.get(`http://localhost:2008/admin/siswa/${params.siswa}`, { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            setSiswa(res.data.data);
        })
    },[])

    return(
        <div className="relative">
            <WhiteTemplate>
                <div className="flex flex-col justify-center items-center mb-20">
                    <h1 className="text-2xl font-bold">Detail Siswa {siswa.nama}</h1>

                    <p className="mt-6">Nama Siswa: <strong>{siswa.nama}</strong></p>
                    <p>NIS : <strong>{siswa.nis}</strong></p>
                    <p>Jenis Kelamin : <strong>{siswa.jenis_kelamin == "laki" ? "Laki-laki" : "Perempuan"}</strong></p>
                    <p>No Telepon : <strong>{siswa.no_telepon}</strong></p>
                    <p>Jurusan: <strong>{siswa.jurusan?.nama}</strong></p>
                    <p>Kelas : <strong>{siswa.kelas?.nama}</strong></p>
                    <p>Status PKL : <strong>{siswa.status == "sudah_pkl" ? "Sudah PKL" : "Belum PKL"}</strong></p>
                    <p>Guru Pembimbing : <strong>{siswa.guru_pembimbing?.nama}</strong></p>
                    <p>Alamat : <strong>{siswa.alamat?.detail_tempat} , {siswa.alamat?.desa} , {siswa.alamat?.kecamatan} , {siswa.alamat?.kabupaten} , {siswa.alamat?.provinsi}</strong></p>

                </div>
                <Link href={"/admin/masterdata/datasiswa"}>

                    <Button href="/admin/masterdata/datasiswa" className=" bottom-10 absolute right-10" color="primary" variant="flat">Kembali ke Data Siswa</Button>
                </Link>
                
            </WhiteTemplate>
        </div>
    )
}