"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import SiswaCard from "./siswacard";
import { useEffect, useState } from "react";
import axios from "axios";

// Definisikan tipe data untuk Siswa, Dudi, dan Laporan
interface Siswa {
    id: number;
    nis: string;
    nama: string;
    jenis_kelamin: string;
    email: string;
    no_telepon: string;
    status: string;
    token_FCM: string | null;
    foto_profile: string;
}

interface Dudi {
    id: number;
    nama_instansi_perusahaan: string;
    bidang_usaha: string;
    no_telepon: string;
    deskripsi: string;
    tersedia: boolean;
    id_sekolah: number;
    id_tahun: number;
}

interface LaporanItem {
    id: number;
    topik_pekerjaan: string;
    rujukan_kompetensi_dasar: string;
    dokumentasi: string | null;
    siswa: Siswa;
    dudi: Dudi;
}

interface Laporan {
    [key: string]: LaporanItem[]; // key berupa tanggal dan value berupa array laporan
}

export default function LaporanSiswa() {
    const [laporan, setLaporan] = useState<Laporan>({});

    useEffect(() => {
        axios.get("http://localhost:2008/guru-pembimbing/laporan-pkl-siswa", { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setLaporan(res.data.data); // Menyimpan data laporan ke state
            });
    }, []);

    return (
        <div>
            <WhiteTemplate>
                <h1 className="text-2xl mb-5 font-bold">Laporan Siswa</h1>

                {/* Looping tanggal */}
                {Object.keys(laporan).map((tanggal) => (
                    <div key={tanggal} className="mb-5">
                        <h2 className="text-xl font-semibold mb-3">{tanggal}</h2>

                        {/* Looping array yang ada di setiap tanggal */}
                        <div className="grid grid-cols-3 gap-5">
                            {laporan[tanggal].map((item) => (
                                <SiswaCard
                                    key={item.id}
                                    name={item.siswa.nama}
                                    kelas={item.dudi.nama_instansi_perusahaan}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </WhiteTemplate>
        </div>
    );
}
