import Image from "next/image";
import React from "react";
import Link from "next/link";

const DetilNotifikasi = () => {
  return (
    <div>
      <div className="flex items-center">
        <Link href="/">
          <Image src="/images/leftArrow2.svg" alt="" height={30} width={30} />
        </Link>
        <h1 className="font-bold text-2xl mx-auto">Detil Notifikasi</h1>
      </div>
      <div className="mt-8">
        <p className="text-sm text-LightGrayDate">18 April 2024 - 13.48</p>
        <p className="font-bold py-1">Kabar baik untukmu!</p>
        <p className="text-sm">Ajuan PKL-mu yang telah Anda ajukan telah diterima di PT. Telkom Indonesia, Selamat bergabung!</p>
      </div>
    </div>
  );
};

export default DetilNotifikasi;
