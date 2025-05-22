"use client";


import axios from "axios";
import React, { useEffect, useState } from "react";
import SiswaCard from "../siswacard";
import { KendalaMerah } from "../icons/icons";
import Link from "next/link";

const Laporan = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:2008/siswa/laporan_pkl_siswa", { withCredentials: true }).then((res) => {
      console.log(res.data.data);
      setLaporan(res.data.data);
    })
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <span></span>
        <h1 className="flex justify-center text-center text-xl font-bold mb-10">Laporan Saya</h1>
        <Link href={"/siswa/kendalapkl"}>
          <KendalaMerah />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {laporan.map((item: any, index: any) => (
          <SiswaCard url="/" key={index} name={item.topik_pekerjaan} kelas={item.tanggal} variant="done" />
        ))}
      </div>
    </div>
  );
};

export default Laporan;
