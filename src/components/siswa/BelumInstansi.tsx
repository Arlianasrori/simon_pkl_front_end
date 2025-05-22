"use client"

import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DangerIcon, DetailIcon, KoperIcon, LaptopIcon, LocationIcon, ProfileIcon, TelephoneIcon } from "../icons/icons";

export function BelumInstansi(profile:any) {
    return (
        <div className="">
            <div className="bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                <h1 className="w-full text-center text-white text-xl">
                    Belum ada instansi yang dipilih
                </h1>
                <Link href="/siswa/daftarinstansi" className="w-auto py-2 px-12 mt-4 mx-auto text-white border border-white bg-transparent hover:bg-white hover:text-accentColor transition duration-300 ease-in-out rounded-full">
                    Pilih
                </Link>
            </div>
        </div>
    )
}
export function SudahInstansi() {
    const [dudi, setDudi]: any = useState([])
    useEffect(() => {
        axios.get("http://localhost:2008/siswa/pengajuan_pkl/last/get", { withCredentials: true }).then((res) => {
            setDudi(res.data.data.dudi)
          }).catch((err) => {
            console.log(err);
          })
    },[])
    
    return (
        <div className="">
            <div className="relative bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                <h2 className="absolute font-semibold text-white top-5 left-5">Ajuan Saya</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <KoperIcon />
                        <h1 className="w-full text-white text-xl">{dudi.nama_instansi_perusahaan}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <TelephoneIcon />
                        <h1 className="w-full text-white text-xl">{dudi.no_telepon}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <LocationIcon />
                        <h1 className="w-full text-white text-xl">Jl. Lorem Ipsum,No 19</h1>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Button className="bg-transparent border-white border-3 text-white">Cancel</Button>
                    <Link href={"/siswa/ajuanproses"}>
                        <Button className="bg-white border-white text-accentColor">Cek Status</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export function SudahDiterima() {
    const [dudi, setDudi]: any = useState([])
    useEffect(() => {
        axios.get("http://localhost:2008/siswa/pengajuan_pkl/last/get", { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            
            setDudi(res.data.data.dudi)
          }).catch((err) => {
            console.log(err);
          })
    },[])
    
    return (
        <div className="">
            <div className="relative bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                <Link href="/siswa/detailtempatpkl/">
                    <div className="absolute right-0 top-0 p-5 cursor-pointer">
                        <DetailIcon />
                    </div>
                </Link>
                <h2 className="absolute font-semibold text-white top-5 left-5 text-lg">Tempat PKL Saya</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <KoperIcon />
                        <h1 className="w-full text-white text-xl">{dudi.nama_instansi_perusahaan}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <TelephoneIcon />
                        <h1 className="w-full text-white text-xl">{dudi.no_telepon}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <LocationIcon />
                        <h1 className="w-full text-white text-xl">Jl. Lorem Ipsum,No 19</h1>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Link href={"/siswa/laporan"}>
                        <Button className="bg-transparent border-white border-3 text-white">Laporan</Button>
                    </Link>
                    <Link href={"/siswa/pilihanabsen"}>
                        <Button className="bg-white border-white text-accentColor">Absen</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export function GuruHomeComponent() {

    return (
        <div className="">
            <div className="relative bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                <h2 className="absolute font-semibold text-white top-5 left-5 text-lg">Tentang PKL</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <ProfileIcon />
                        <h1 className="w-full text-white text-xl">3 Siswa Bimbingan</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <KoperIcon />
                        <h1 className="w-full text-white text-xl">2 DU/DI Terkait</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <DangerIcon />
                        <h1 className="w-full text-white text-xl">0 Kendala Siswa</h1>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Link href={"/guru/monitoring"}>
                        <Button className="bg-white font-medium border-white text-accentColor"><LaptopIcon /> Monitoring PKL</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export function DudiHomeComponent() {

    return (
        <div className="">
            <div className="relative bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                <h2 className="absolute font-semibold text-white top-5 left-5 text-lg">Tentang PKL</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <ProfileIcon />
                        <h1 className="w-full text-white text-xl">3 Siswa Terikat</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <KoperIcon />
                        <h1 className="w-full text-white text-xl">2 Guru Terikat</h1>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <DangerIcon />
                        <h1 className="w-full text-white text-xl">4 Ajuan Menunggu Verifikasi</h1>
                    </div>
                </div>
                <div className="flex gap-3 mt-5">
                    <Link href={"/dudi/skemapkl"}>
                        <Button className="bg-white font-medium border-white text-accentColor"><LaptopIcon /> Skema PKL</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}