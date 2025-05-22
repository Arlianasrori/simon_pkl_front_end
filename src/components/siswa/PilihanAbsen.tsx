"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormRekrut, JadwalAbsen, KendalaIcon, Koordinat, ReportIcon } from "../icons/icons";

const PilihanAbsen = () => {
  return (
    <div>
      <div className="bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-14 rounded-xl flex flex-col items-center">
        <div className="text-white">
          <h1 className="w-full text-center text-2xl font-bold">
            CV. GLOBAL VINTAGE NUMERATION
          </h1>

          <div className="flex justify-between items-center w-full mt-2">
            <p className="text-white ">Jam Masuk : 08:10 AM</p>
            <div className="border-1.5 border-white h-4"></div>
            <p className="text-white">Jam Keluar : 16:50 PM</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <p className="text-[#DFDFDF] p-2">
          Disarankan untuk: <span className="font-bold text-[#AFAFAF]">Absen Masuk</span>
        </p>

        <div className="flex gap-6">
          <Link
            href="/siswa/absenmasuk"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <Image
              src="/images/in.svg"
              alt=""
              width={80}
              height={80}
              className="bg-accentColor p-5 rounded-lg"
            />
            <p className="font-bold text-center mx-auto mt-2">Absen Masuk</p>
          </Link>

          <Link
            href="/siswa/absenkeluar"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <Image
              src="/images/out.svg"
              alt=""
              width={80}
              height={80}
              className="bg-accentColor p-5 rounded-lg"
            />
            <p className="font-bold text-center mx-auto mt-2">Absen Keluar</p>
          </Link>

          <Link
            href="/siswa/absentelat"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <Image
              src="/images/Time.svg"
              alt=""
              width={80}
              height={80}
              className="bg-accentColor p-5 rounded-lg"
            />
            <p className="font-bold text-center mx-auto mt-2">Absen Telat</p>
          </Link>

          <Link
            href="/siswa/absenizin"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <Image
              src="/images/absenIzin.svg"
              alt=""
              width={80}
              height={80}
              className="bg-accentColor p-5 rounded-lg"
            />
            <p className="font-bold text-center mx-auto mt-2">Absen Izin</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PilihanAbsen;

export const MonitoringPKL = () => {
  const [sekolah, setSekolah] = useState();
  const [nama, setNama] = useState();

  useEffect(() => {
    axios.get("http://localhost:2008/guru-pembimbing/profile",{withCredentials: true}).then((res) => {
      setNama(res.data.data.nama)
      setSekolah(res.data.data.sekolah.nama)
    })
  })
  return (
    <div>
      <div className="bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-14 rounded-xl flex flex-col items-center">
        <div className="text-white">
          <h1 className="w-full text-center text-2xl font-bold">
            Monitoring PKL {sekolah?.toUpperCase()}
          </h1>

          <div className="flex justify-center items-center w-full mt-2">
            <p className="text-white ">Guru Pembimbing : {nama?.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="flex gap-6">
          <Link
            href="/guru/laporansiswa"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <ReportIcon />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Laporan Siswa</p>
          </Link>

          <Link
            href="/"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <ReportIcon />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Laporan DU/DI</p>
          </Link>

          <Link
            href="/"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <KendalaIcon />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Kendala Siswa</p>
          </Link>

          <Link
            href="/"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <KendalaIcon />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Kendala DU/DI</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export const SkemaPKL = () => {
  const [sekolah, setSekolah] = useState();
  const [nama, setNama] = useState();

  useEffect(() => {
    axios.get("http://localhost:2008/pembimbingDudi/profile",{withCredentials: true}).then((res) => {
      setNama(res.data.data.nama)
      setSekolah(res.data.data.dudi.nama_instansi_perusahaan)
    })
  })
  return (
    <div>
      <div className="bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-14 rounded-xl flex flex-col items-center">
        <div className="text-white">
          <h1 className="w-full text-center text-2xl font-bold">
            Monitoring PKL {sekolah?.toUpperCase()}
          </h1>

          <div className="flex justify-center items-center w-full mt-2">
            <p className="text-white ">Guru Pembimbing : {nama?.toUpperCase()}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="flex gap-6">
          <Link
            href="/dudi/jadwalabsen"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <JadwalAbsen />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Jadwal Absen</p>
          </Link>

          <Link
            href="/dudi/addkuota"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <FormRekrut />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Form Rekrut</p>
          </Link>

          <Link
            href="/dudi/tambahkoordinat"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <Koordinat />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Tambah Koordinat</p>
          </Link>

          <Link
            href="/dudi/laporanpkl"
            className="flex flex-col justify-center items-center bg-white p-7 shadow-buttonShadow rounded-xl"
          >
            <div className="bg-accentColor p-3 rounded-lg">
              <KendalaIcon />
            </div>
            <p className="font-bold text-center mx-auto mt-2">Lapor Kendala</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
