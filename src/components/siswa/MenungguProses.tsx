"use client";

import Image from "next/image";
import React from "react";

const MenungguProses = () => {
  return (
    <div className="">
      <div className="">
        <h1 className="font-bold text-3xl">Selamat Datang, Siswa</h1>
        <p>NISN : 21414125125</p>
      </div>
      <div className="bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-14 mt-10 rounded-xl">
        <div className="mb-9">
          <h1 className="text-white text-3xl font-bold">Ajuan Saya</h1>
        </div>
        <div className="text-white ml-10">
          <div className="flex items-center m-3">
            <Image
              src="/images/briefcase.svg"
              alt="briefcase"
              height={35}
              width={35}
            />
            <span className="ml-2">PT. Lorem Ipsum Dolor</span>
          </div>

          <div className="flex items-center m-3">
            <Image
              src="/images/call.svg"
              alt="call svg"
              height={35}
              width={35}
            />
            <span className="ml-2">+62 987654321</span>
          </div>

          <div className="flex items-center m-3">
            <Image
              src="/images/location.svg"
              alt="location svg"
              height={30}
              width={30}
              className=""
            />
            <span className="ml-2"> Jl. Lorem ipsum, Dolor sit 4</span>
          </div>
        </div>
        <button className="w-auto py-2 px-14 mt-4 mx-auto text-white border border-white bg-transparent hover:bg-white hover:text-accentColor transition duration-300 ease-in-out rounded-full">
          Batalkan
        </button>
        <button className="w-auto py-2 px-14 mt-4 ml-4 mx-auto text-white border border-white bg-transparent hover:bg-white hover:text-accentColor transition duration-300 ease-in-out rounded-full">
          Cek Status
        </button>
      </div>
    </div>
  );
};

export default MenungguProses;
