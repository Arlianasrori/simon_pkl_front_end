"use client";

import { LeftArrow } from "@/components/icons/icons";
import SiswaCard from "@/components/siswacard";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AjuanPklPage() {
    const [siswa, setSiswa] = useState<Array<{
        nama: string; nis: string; idPKL: string; status: string
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [dudi, setDudi] = useState<any>({});

    useEffect(() => {
        axios.get("http://localhost:2008/pembimbingDudi/pengajuan-pkl", { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.data)) {
                    const siswaData = res.data.data.map((item: { siswa: any; id: string, status: string }) => ({
                        nama: item.siswa.nama,
                        nis: item.siswa.nis,
                        idPKL: item.id,
                        status: item.status
                    }));
                    setSiswa(siswaData);
                    console.log(siswaData);
                    
                }
            })
            .catch((error) => {
                console.error("Error fetching siswa data:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        axios.get("http://localhost:2008/pembimbingDudi/profile", { withCredentials: true })
            .then((res) => {
                setDudi(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching dudi data:", error);
            });
    }, []);

    // Filter siswa by status
    const siswaDiterima = siswa.filter((s) => s.status === "diterima");
    const siswaVerifikasi = siswa.filter((s) => s.status === "proses");

    return (
        <div className="w-[100%]">
            <WhiteTemplate>
                <Link href={"/dudi"} className="flex items-end gap-5">
                    <LeftArrow />
                    <h2 className="font-semibold text-2xl mt-2 text-gray-500">Ajuan PKL</h2>
                </Link>
                <div>

                    <div className="mt-8">
                        <h3 className="font-semibold text-lg text-gray-500">Siswa Diterima</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {siswaDiterima.length > 0 ? (
                                siswaDiterima.map((s, index) => (
                                    <SiswaCard
                                        key={index}
                                        url={`/dudi/ajuanpkl/${s.idPKL}`}
                                        variant={s.status}
                                        name={s.nama.toUpperCase()}
                                        kelas={s.nis}
                                    />
                                ))
                            ) : (
                                <p>Tidak ada siswa yang diterima.</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-semibold text-lg text-gray-500">Siswa dalam Verifikasi</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {siswaVerifikasi.length > 0 ? (
                                siswaVerifikasi.map((s, index) => (
                                    <SiswaCard
                                        key={index}
                                        url={`/dudi/ajuanpkl/${s.idPKL}`}
                                        variant={s.status}
                                        name={s.nama.toUpperCase()}
                                        kelas={s.nis}
                                    />
                                ))
                            ) : (
                                <p>Tidak ada siswa dalam proses verifikasi.</p>
                            )}
                        </div>
                    </div>
                </div>
            </WhiteTemplate>
        </div>
    );
}
