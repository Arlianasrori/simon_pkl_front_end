"use client";

import { useEffect, useState } from "react";
import { LeftArrow } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { set } from "react-hook-form";

export default function KendalaPKL() {
    const [tanggal, setTanggal] = useState("");
    const [idSiswa, setIdSiswa] = useState("");
    const [kendala, setKendala] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [siswa,setSiswa] = useState([])


    useEffect(()=>{
        axios.get("http://localhost:2008/pembimbingDudi/siswa",{withCredentials:true})
            .then((r) => setSiswa(r.data.data))
    },[])

    

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const data = {
            tanggal,
            id_siswa: parseInt(idSiswa),
            kendala,
            deskripsi,
        };

        axios.post("http://localhost:2008/pembimbingDudi/laporan-pkl-kendala", data, { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                toast.success("Data berhasil dikirim");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Data gagal dikirim");
            })
    };

    return (
        <div>
            <Toaster />
            <WhiteTemplate>
                <Link href={"/dudi/skemapkl/"}>
                    <LeftArrow />
                </Link>
                <h1 className="text-2xl mb-5 font-bold text-center">Laporan Kendala PKL</h1>
                <form onSubmit={handleSubmit} className="bg-accentColor rounded-lg p-5 text-white">
                    <p className="p-5 font-bold text-center text-xl">Form Lapor Kendala PKL</p>
                    
                    <input 
                        type="date"
                        required
                        className="w-full p-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white mb-4"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                    />


                    <div className="flex gap-3">
                        <select 
                            required 
                            className="w-full p-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white mb-4"
                            name="id_siswa" 
                            value={idSiswa}
                            onChange={(e) => setIdSiswa(e.target.value)}
                        >
                            <option value="" disabled>Pilih Siswa</option>
                            {/* Options for students */}
                            {siswa.map((siswa:any) => (
                                <option key={siswa.id} value={siswa.id}>
                                    {siswa.nama}
                                </option>
                            ))}
                        </select>
                        <input 
                            type="text"
                            required
                            placeholder="Kendala"
                            className="placeholder:text-white w-full p-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white mb-4"
                            value={kendala}
                            onChange={(e) => setKendala(e.target.value)}
                        />

                    </div>
                    <textarea
                        required
                        placeholder="Deskripsi"
                        className="placeholder:text-white w-full p-3 rounded-lg text-center bg-accentColor border-white border-2 focus:ring-white ring-white focus:border-white mb-4"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                    />


                    <button type="submit" className="w-full p-3 mt-5 bg-white text-accentColor rounded-lg font-bold">
                        Submit
                    </button>
                </form>
            </WhiteTemplate>
        </div>
    )
}
