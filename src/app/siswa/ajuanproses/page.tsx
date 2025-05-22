"use client";
import { ProsesPKL } from "@/components/icons/icons";
import WhiteTemplate, { BlueTemplate } from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AjuanProses() {
    const [ajuan, setAjuan]: any = useState({});
    const [dudi, setDudi]: any = useState({});
    useEffect(() => {
        axios.get("http://localhost:2008/siswa/pengajuan_pkl/last/get", { withCredentials: true })
            .then((res) => {
                setAjuan(res.data.data);
                setDudi(res.data.data.dudi);
                console.log(res.data.data);
            })
    }, [])
    const date = new Date(ajuan.waktu_pengajuan)
    const formatDate = date.toDateString()
    return (
        <div>
            <BlueTemplate>
                <div className="flex flex-col justify-center items-center p-5 pt-20">
                    <ProsesPKL />
                    <h1 className="text-2xl mb-12 font-bold my-5 text-white">Ajuan DiProses</h1>
                    <div className="bg-white text-lg gap-2 py-5 w-full flex flex-col justify-center items-center rounded-lg shadow-md">
                        <h4>Status : </h4>
                        <p className="uppercase font-semibold">{ajuan.status}</p>
                        <h4>Instansi Dipilih : </h4>
                        <p className="font-semibold">{dudi.nama_instansi_perusahaan}</p>
                        <h4>Waktu Pengajuan : </h4>
                        <p className="font-semibold">{formatDate}</p>    
                        <h4>No. Telepon Instansi : </h4>
                        <p className="font-semibold">{dudi.no_telepon}</p>
                    </div>
                    <Link className="bg-accentColor text-white p-2 rounded-md w-full text-center my-5" href={"/siswa/home"}>Kembali ke Beranda</Link>
                </div>
            </BlueTemplate>
        </div>
    )
}