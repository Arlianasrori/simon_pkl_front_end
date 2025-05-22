"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { LeftArrow } from "@/components/icons/icons";

interface FormData {
    tanggal: string;
    kendala: string;
    deskripsi: string;
    file_laporan: File | null;
}

export default function KendalaPKL() {
    const [formData, setFormData] = useState<FormData>({
        tanggal: "",
        kendala: "",
        deskripsi: "",
        file_laporan: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prevData) => ({
            ...prevData,
            file_laporan: file,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const responseData =await axios.post("http://localhost:2008/siswa/laporan-kendala", {
                "tanggal": formData.tanggal,
                "kendala": formData.kendala,
                "deskripsi": formData.deskripsi
            }, {
                headers: {
                    "Content-Type": "Application/json",
                },
                withCredentials: true,
            });

            if (formData.file_laporan) {
                const formDataToSend = new FormData();
                formDataToSend.append("file_laporan", formData.file_laporan);

                await axios.put(`http://localhost:2008/siswa/laporan-kendala/file_laporan/${responseData.data.data.id}`, formDataToSend, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                    },
                    withCredentials: true,
                });
            }
            toast.success("Data submitted successfully!");
        } catch (error) {
            toast.error("Error submitting data. Please try again.");
            console.error("Error submitting data:", error);
        }
    };

        <div>
            <WhiteTemplate>
                <Toaster position="top-right" reverseOrder={false} />
                <Link href="/siswa/laporan">
                    <LeftArrow />
                </Link>
                <h1 className="flex justify-center text-center text-xl font-bold mb-10">Kendala PKL</h1>

                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-accentColor p-10 text-black rounded-xl">
                    <label className="font-semibold mb-2 text-lg text-white">Tanggal</label>
                    <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className="w-full md:w-80 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <label className="font-semibold mb-2 text-lg text-white">Kendala</label>
                    <input
                        type="text"
                        name="kendala"
                        value={formData.kendala}
                        onChange={handleChange}
                        className="w-full md:w-80 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan kendala"
                    />

                    <label className="font-semibold mb-2 text-lg text-white">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="w-full md:w-80 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan deskripsi kendala"
                        rows={4}
                    />

                    <label className="font-semibold mb-2 text-lg text-white">File Laporan</label>
                    <input
                        type="file"
                        name="file_laporan"
                        onChange={handleFileChange}
                        className="w-full md:w-80 mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <button type="submit" className="w-full md:w-80 bg-blue-500 p-2 rounded text-white font-semibold hover:bg-blue-600 transition duration-200">
                        Submit
                    </button>
                </form>
            </WhiteTemplate>
        </div>
    );
}
