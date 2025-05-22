"use client";

import { DoneIcon, LaporanIcon, NotDone, WhatsappIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AjuanPKLPage({ params }: { params: { siswa: string } }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:2008/pembimbingDudi/pengajuan-pkl/${params.siswa}`, { withCredentials: true })
            .then((res) => {
                setData(res.data.data);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [params.siswa]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!data) {
        return <p>Data not found</p>;
    }

    const waktuPengajuan = new Date(data.waktu_pengajuan);

    const formattedDate = waktuPengajuan.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const terimaAjuan = () => {
        axios({ method: 'PUT', url: `http://localhost:2008/pembimbingDudi/pengajuan-pkl/${params.siswa}`, data: { status: "setuju" }, withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                window.location.href = "/dudi/"

            })

    };

    return (
        <div>
            <WhiteTemplate>
                <div className="bg-accentColor p-5 rounded-md flex text-white flex-col items-center justify-center">
                    <LaporanIcon />
                    <h4 className="font-semibold text-lg">Senin, 12 Januari 2023</h4>
                    <p>Oleh : {data.siswa?.nama?.toUpperCase() || "N/A"}</p>
                    <div className="bg-white flex flex-col mt-2 items-center gap-3 text-black w-[100%] p-5 rounded-md">
                        <p>Status Info : </p>
                        <h3 className="font-bold text-xl">{data.status?.toUpperCase() || "N/A"}</h3>
                        <p>Tanggal Pengajuan : </p>
                        <h3 className="font-bold text-xl">{formattedDate}</h3>
                        <p>Instansi Terkait : </p>
                        <h3 className="font-bold text-xl">{data.instansiTerkait || "CV. Global Vintage Numeration"}</h3>
                        <p>No Telepon Siswa : </p>
                        <h3 className="font-bold text-xl">{data.siswa.no_telepon}</h3>
                        {data.status == "diterima" ? (<Link className="bg-accentColor text-white w-[100%] text-center mt-5 p-3 rounded-md" href="/dudi/">Kembali Ke Beranda</Link>) : (<div className="flex mt-5 gap-2">
                            <Button color="primary" variant="bordered" startContent={<NotDone />}>Tolak Ajuan</Button>
                            <Button color="primary" onClick={() => terimaAjuan()} startContent={<DoneIcon />}> Terima Ajuan</Button>
                        </div>)}

                    </div>
                    {/* <Link className="bg-white text-accentColor w-[100%] text-center mt-5 p-3 rounded-md" href="/guru/laporansiswa">Kembali Ke Beranda</Link>
                    <Link className="bg-accentColor text-white w-[100%] text-center border-white border-2 mt-2  p-3 rounded-md" href="https://wa.me/6287865728448">
                        <div className="flex items-center justify-center">
                            <WhatsappIcon />
                            Hubungi Siswa Ini
                        </div>
                    </Link> */}

                </div>
            </WhiteTemplate>
        </div>
    );
}
