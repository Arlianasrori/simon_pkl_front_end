"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditSiswa({ params }: { params: { siswa: string } }) {
    const [siswa, setSiswa] = useState({
        nama: "",
        nis: "",
        jenis_kelamin: "",
        no_telepon: "",
        jurusan: { nama: "" },
        kelas: { nama: "" },
        status: "",
        guru_pembimbing: { nama: "" },
        alamat: {
            detail_tempat: "",
            desa: "",
            kecamatan: "",
            kabupaten: "",
            provinsi: "",
        },
    });

    useEffect(() => {
        axios
            .get(`http://localhost:2008/admin/siswa/${params.siswa}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data.data);
                setSiswa(res.data.data);
            });
    }, [params.siswa]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("alamat.")) {
            // Nested address fields
            setSiswa((prev) => ({
                ...prev,
                alamat: {
                    ...prev.alamat,
                    [name.split(".")[1]]: value,
                },
            }));
        } else {
            setSiswa((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div className="relative">
            <Toaster/>
            <WhiteTemplate>
                <div className="flex flex-col px-10 justify-center items-center mb-20">
                    <h1 className="text-2xl font-bold">Edit Data Siswa</h1>

                    <div className="mt-6 w-full">
                        <Input
                            label="Nama Siswa"
                            name="nama"
                            value={siswa.nama}
                            onChange={handleChange}
                        />
                        <Input
                            label="NIS"
                            name="nis"
                            value={siswa.nis}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Jenis Kelamin"
                            name="jenis_kelamin"
                            value={siswa.jenis_kelamin}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="No Telepon"
                            name="no_telepon"
                            value={siswa.no_telepon}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Jurusan"
                            name="jurusan.nama"
                            value={siswa.jurusan?.nama}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Kelas"
                            name="kelas.nama"
                            value={siswa.kelas?.nama}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Status PKL"
                            name="status"
                            value={siswa.status}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Guru Pembimbing"
                            name="guru_pembimbing.nama"
                            value={siswa.guru_pembimbing?.nama}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Textarea
                            label="Alamat"
                            name="alamat.detail_tempat"
                            value={siswa.alamat?.detail_tempat}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Desa"
                            name="alamat.desa"
                            value={siswa.alamat?.desa}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Kecamatan"
                            name="alamat.kecamatan"
                            value={siswa.alamat?.kecamatan}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Kabupaten"
                            name="alamat.kabupaten"
                            value={siswa.alamat?.kabupaten}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Input
                            label="Provinsi"
                            name="alamat.provinsi"
                            value={siswa.alamat?.provinsi}
                            onChange={handleChange}
                            className="mt-4"
                        />
                        <Button className="mt-4 w-1/3" color="primary" variant="solid" onClick={() => {
                            axios.put(`http://localhost:2008/admin/siswa/${params.siswa}`, siswa, { withCredentials: true }).then((res) => {
                                console.log(res.data.data);
                                toast.success("Data berhasil diupdate");
                                // window.location.reload();
                            }).catch((error) => {
                                console.log(error);
                                toast.error(error.response.data.msg);
                            })
                        }}>Simpan</Button>
                    </div>
                </div>

                <Link href="/admin/masterdata/datasiswa">
                    <Button className="bottom-10 absolute right-10" color="primary" variant="flat">
                        Kembali ke Data Siswa
                    </Button>
                </Link>
            </WhiteTemplate>
        </div>
    );
}
