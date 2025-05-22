import Image from "next/image";
import React from "react";
import { FingerprintIcon } from "../icons/icons";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const DetilAbsen = () => {
  return (
    <div className="">
        <div className="flex flex-col mt-10 items-center justify-center text-white">
          <FingerprintIcon />
          <h1 className="text-2xl font-bold">Senin, 25 September 2024</h1>
          <p>Jenis Absen : Absen Masuk</p>
        </div>
        <div className="absolute top-[40%] w-[94%] text-center h-full left-[3%] p-10 rounded-2xl bg-white">
          <p className="text-gray-300 ">Status Absen</p>
          <p className="font-semibold text-lg">Di dalam Radius</p>
          <p className="text-gray-300 ">Waktu Absen</p>
          <p className="font-semibold text-lg">11:03 AM</p>
          <p className="text-gray-300 ">Keterangan Waktu</p>
          <p className="font-semibold text-lg">Tepat Waktu</p>
          <p className="text-gray-300 ">Instansi Terkait</p>
          <p className="font-semibold text-lg">CV. GLOBAL VINTAGE NUMERATION</p>
          <p className="text-gray-300 ">Jam Ditentukan</p>
          <p className="font-semibold text-lg">10:25 AM - 3:30 PM</p>
          <p className="text-gray-300 ">Bukti Dokumen</p>
          <Link href={"/siswa/home"}>
            <Button color="primary">Kembali ke Beranda</Button>
          </Link>
        </div>
    </div>
  );
};

export default DetilAbsen;
