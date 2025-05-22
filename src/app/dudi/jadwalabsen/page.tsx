"use client";

import { LeftArrow } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

export default function JadwalAbsen() {
    const [hari, setHari] = useState('senin');
    const [jamMasuk, setJamMasuk] = useState('');
    const [jamPulang, setJamPulang] = useState('');
    const [minJamMasuk, setMinJamMasuk] = useState('');

    function selectHari(e:any) {        
        setHari(e.target.value);
        console.log(hari);       
    }

    function handleJamMasuk(e:any) {
        setJamMasuk(e.target.value);
    }

    function handleJamPulang(e:any) {
        setJamPulang(e.target.value);
    }

    function handleMinJamMasuk(e:any) {
        setMinJamMasuk(e.target.value);
    }

    const handleSubmit = ()=> {
        console.log(hari);
        const batas_absen_masuk = jamMasuk
        const batas_absen_pulang = jamPulang
        const min_jam_absen = minJamMasuk
        const data = { hari, batas_absen_masuk, batas_absen_pulang, min_jam_absen };
        const dataToPost = [data]
        axios.post("http://localhost:2008/pembimbingDudi/jadwal-absen", dataToPost, { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            toast.success("Jadwal Absen Berhasil")
        }).catch((err) => {
            console.log(err);
            toast.error(err)
        })
    }

    return (
        <div>
            <Toaster />
            <WhiteTemplate>
                <Link href={"/dudi/skemapkl/"}>
                    <LeftArrow />
                </Link>
                <h1 className="text-2xl mb-5 font-bold text-center">Buat Jadwal Absen</h1>
                <div className="bg-accentColor rounded-lg p-5 text-white">
                    <p className="p-5 font-bold text-center text-xl">Form Jadwal Absen PKL</p>
                    <select onChange={selectHari} className="w-full p-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white" name="hari" id="hari">
                        <option value="senin">Senin</option>
                        <option value="selasa">Selasa</option>
                        <option value="rabu">Rabu</option>
                        <option value="kamis">Kamis</option>
                        <option value="jumat">Jumat</option>
                        <option value="sabtu">Sabtu</option>
                        <option value="minggu">Minggu</option>
                    </select>

                    <input type="time" name="jamMasuk" value={jamMasuk} onChange={handleJamMasuk} placeholder="Jam Masuk" className="w-full p-3 mt-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white" />

                    <input type="time" name="jamPulang" value={jamPulang} onChange={handleJamPulang} placeholder="Jam Pulang" className="w-full p-3 mt-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white" />

                    <input type="number" name="minJamMasuk" value={minJamMasuk} onChange={handleMinJamMasuk} placeholder="Min Jam Masuk" className="w-full placeholder:text-white p-3 mt-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white" />

                    <button onClick={handleSubmit} className="w-full p-3 mt-5 bg-white text-accentColor rounded-lg font-bold">Submit</button>
                </div>
            </WhiteTemplate>
        </div>
    );
}
