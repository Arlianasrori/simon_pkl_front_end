"use client";

import Banner from "@/components/admin/Banner";
import { KendalaMerah } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function LaporanSiswa() {
    const [laporan, setLaporan] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:2008/admin/laporan-pkl-siswa?id_tahun=789631&page=${page}`, { withCredentials: true })
            .then((res) => {
                setLaporan(res.data.data.data)
                // console.log(res.data.data.data)
            })
            .catch((err) => { console.log(err) })
    }, [])
    console.log(laporan);


    return (
        <div>
            <Banner title="Laporan Siswa" />

            <WhiteTemplate>
                {laporan.map((item: any, index) => {
                    return (
                        <div key={index} className="flex justify-between items-center border-2 p-3 mb-2 cursor-pointer rounded-xl border-gray-700">
                            <KendalaMerah />
                            <div className="flex justify-center flex-col items-center">
                                <h1 className="font-bold">{item.siswa.nama}</h1>
                                <p>{item.topik_pekerjaan}</p>
                            </div>
                            <FaArrowRight size={20} />
                        </div>
                    );
                })}

            </WhiteTemplate>
        </div>

    );
}