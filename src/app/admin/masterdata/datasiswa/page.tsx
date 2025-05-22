"use client";

import { useEffect, useState } from "react";
import Banner from "@/components/admin/Banner";
import {  ActionButtonIcon, FalseIcon, Tambahicon, TrueIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import Link from "next/link";
import axios from "axios";
import ActionButton from "../actbutton";
import { useTahun } from "@/context/TahunContext";
import { Pagination } from "@nextui-org/react";

export default function DataSiswa() {
  const [siswa, setSiswa] = useState([]);

  const { tahun, setTahun } = useTahun();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (tahun) {
      // Fetch data siswa from API or other sources
      axios.get(`http://localhost:2008/admin/siswa?id_tahun=${tahun}&page=1`,{ withCredentials: true }).then((res) => {
        setSiswa(res.data.data.data);
        console.log(res.data.data);
        setTotalPages(res.data.count_page);
        
      });
    } else {
      console.log("Tahun belum dipilih");
    }
    console.log(tahun);
    
  }, [tahun]); // Menambahkan tahun ke dependency agar API dipanggil setiap kali tahun berubah

  return (
    <div>
      <Banner title="Data Siswa" />
      <Link
        href="/admin/masterdata/datasiswa/tambahdata"
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
                <th className="py-2 text-center font-medium">Nama Siswa</th>
                <th className="px-4 py-2 text-center font-medium">NIS</th>
                <th className="px-2 py-2 font-medium text-nowrap">Jenis Kelamin</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="py-2 px-2 font-medium">Alamat</th>
                <th className="py-2 px-2 font-medium">Guru Pembimbing</th>
                <th className="py-2 font-medium">Act</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {siswa.map((data:any, index) => (
                <tr key={data.id} className="divide-x-2 divide-black">
                  <td className="px-4 font-semibold">{index + 1}.</td>
                  <td className="px-2 py-1 text-nowrap">{data.nama}</td>
                  <td className="px-4 py-1">{data.nis}</td>
                  <td className="px-2 py-1 capitalize">
                    {data.jenis_kelamin === "laki" ? "Laki - laki" : "Perempuan"}
                  </td>
                  <td className="px-5 py-1">
                    {data.status === "sudah_pkl" ? <TrueIcon /> : <FalseIcon />}
                  </td>
                  <td className="px-2 py-1">
                    {`${data.alamat.desa.toUpperCase()}, ${data.alamat.kecamatan.toUpperCase()}, ${data.alamat.kabupaten.toUpperCase()}, ${data.alamat.provinsi.toUpperCase()}`}
                  </td>
                  <td className="px-4 py-1">{data.guru_pembimbing.nama}</td>
                  <td className="text-end">
                      <ActionButton tipe="siswa" id={data.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div> 
          <Pagination className="mt-10 flex items-center justify-center" showControls total={totalPages} initialPage={1}></Pagination>
      </WhiteTemplate>
    </div>
  );
}
