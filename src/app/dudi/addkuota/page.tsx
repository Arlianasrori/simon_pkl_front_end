'use client'
import WhiteTemplate from "@/components/WhiteTemplate";
import { Button } from "@nextui-org/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Definisikan tipe data untuk jurusan
type Major = {
    id: string;
    nama: string;
    id_sekolah: string;
    id_tahun: string;
    kuotaWanita: number; // Tambahkan kuota wanita
    kuotaPria: number;   // Tambahkan kuota pria
};

const AddKuota = () => {
    const [jumlah_wanita, setjumlahWanita] = useState<number | "">("");
    const [jumlah_pria, setjumlahPria] = useState<number | "">("");
    const [kuotaJurusanWanita, setKuotaJurusanWanita] = useState<number | "">("");
    const [kuotaJurusanPria, setKuotaJurusanPria] = useState<number | "">("");
    const [majors, setMajors] = useState<Major[]>([]);
    const [kuota_jurusan, setKuotaJurusan] = useState<string | null>(null);
    const [kuota_jurusanData, setKuotaJurusanData] = useState(Boolean);

    // Mendapatkan daftar jurusan dari API saat komponen dimuat
    useEffect(() => {
        axios
            .get("http://localhost:2008/pembimbingDudi/jurusan", { withCredentials: true })
            .then((response) => {
                setMajors(response.data.data);
            })
            .catch((error) => {
                console.error("Gagal mendapatkan data jurusan:", error);
                toast.error("Gagal memuat data jurusan");
            });
    }, []);

    // Fungsi untuk mengatur jurusan yang dipilih dan menampilkan kuota
    const handleMajorChange = (id: string) => {
        setKuotaJurusan(id);
        setKuotaJurusanData(true);

    };

    const handleSubmit = () => {
        if (jumlah_wanita === "" || jumlah_pria === "" || !kuota_jurusan) {
            toast.error("Harap isi semua kolom");
            return;
        }

        const formData = {
            jumlah_wanita,
            jumlah_pria,
            kuota_jurusan,
        };

        console.log("Isi FormData:", formData);

        axios
            .post("http://localhost:2008/pembimbingDudi/kuota", formData, { withCredentials: true })
            .then((response) => {
                toast.success("Data berhasil dikirim");
            })
            .catch((error) => {
                console.error("Gagal mengirim data:", error);
                toast.error("Gagal mengirim data");
            });
    };

    return (
        <div className="">
            <WhiteTemplate>
                <div className="flex justify-center flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">Tambah Kuota DU/DI</h2>
                    <div className="flex gap-2 w-full justify-center">
                        <div className="flex flex-col">
                            <label className="mb-2 font-bold">Jumlah Wanita</label>
                            <input
                                type="number"
                                value={jumlah_wanita}
                                onChange={(e) => setjumlahWanita(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-bold">Jumlah Pria</label>
                            <input
                                type="number"
                                value={jumlah_pria}
                                onChange={(e) => setjumlahPria(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-[37%]">
                        <label className="mb-2 font-bold">Kuota Jurusan</label>
                        <select
                            value={kuota_jurusan ?? ""}
                            onChange={(e) => handleMajorChange(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        >
                            <option value="" disabled>Pilih jurusan</option>
                            {majors.map((major) => (
                                <option key={major.id} value={major.id}>{major.nama.toUpperCase()}</option>
                            ))}
                        </select>

                        {kuota_jurusanData && (
                            <div className="flex gap-2 w-full justify-center">
                                <div className="flex flex-col">
                                    <label className="mb-2 font-bold">Jumlah Wanita</label>
                                    <input
                                        type="number"
                                        value={kuotaJurusanWanita}
                                        onChange={(e) => setKuotaJurusanWanita(Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded mb-4"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-bold">Jumlah Pria</label>
                                    <input
                                        type="number"
                                        value={kuotaJurusanPria}
                                        onChange={(e) => setKuotaJurusanPria(Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded mb-4"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="px-10 bg-blue-500 text-white py-2 rounded"
                    >
                        Submit
                    </Button>
                </div>
            </WhiteTemplate>
        </div>
    );
};

export default AddKuota;
