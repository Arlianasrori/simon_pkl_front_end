"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const pagePilihanAbsen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getCoordinatesAndSend = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude }:any = position.coords;
            setCoordinates({ latitude, longitude });

            try {
              // Send coordinates to your endpoint
              await axios.post("http://localhost:2008/siswa/koordinat-absen/cek", {
                latitude,
                longitude,
              },{withCredentials:true}).then((res) => {console.log(res.data);
              });

            } catch (error) {
              console.error("Error sending coordinates:", error);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCoordinatesAndSend();
  }, []);

  return (
    <div className="w-[100%] -mt-4.5">
      <WhiteTemplate>
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
      </WhiteTemplate>
    </div>
  );
};

export default pagePilihanAbsen;
