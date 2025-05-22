"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/admin/Banner";
import {  ActionButtonIcon, FalseIcon, Tambahicon, TrueIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import Link from "next/link";
import axios from "axios";
import ActionButton from "../actbutton";
import { useTahun } from "@/context/TahunContext";

export default function DataKelas() {
  const [kelas, setKelas] = useState([]);

  const { tahun, setTahun } = useTahun();

  useEffect(() => {
    if (tahun) {
      // Fetch data kelas from API or other sources
      axios.get(`http://localhost:2008/admin/kelas?id_tahun=${tahun}&page=1`,{ withCredentials: true }).then((res) => {
        setKelas(res.data.data);
        console.log(res.data.data);
        
      });
    } else {
      console.log("Tahun belum dipilih");
    }
    console.log(tahun);
    
  }, [tahun]); // Menambahkan tahun ke dependency agar API dipanggil setiap kali tahun berubah

  return (
    <div>
      <Banner title="Data kelas" />
      <Link
        href="/admin/masterdata/datakelas/tambahdata"
        className="absolute bottom-10 right-10 p-2 rounded-full bg-blue-500"
      >
        <Tambahicon />
      </Link>
      <WhiteTemplate>
        <div className="border-2 w-full border-black">
          <table className="min-w-full divide-y divide-black overflow-scroll">
            <thead>
              <tr className="divide-x-2 divide-black text-sm">
                <th className="px-4 py-2 text-start font-medium">No</th>
                <th className="py-2 text-center font-medium">Nama Kelas</th>
                <th className="py-2 font-medium">Act</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {kelas.map((data:any, index) => (
                <tr key={data.id} className="divide-x-2 divide-black">
                  <td className="px-4 font-semibold">{index + 1}.</td>
                  <td className="px-2 py-1 text-nowrap">{data.nama}</td>
                  <td className="text-end">
                      <ActionButton tipe="kelas" id={data.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WhiteTemplate>
    </div>
  );
}
