"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { EditProfile } from "../icons/icons";
import Link from "next/link";

const Profile = () => {

  const [profile, setProfile]: any = useState({});

  useEffect(() => {
    axios.get("http://localhost:2008/siswa/profile", { withCredentials: true })
      .then((res) => {
        console.log(res.data.data);
        setProfile(res.data.data);
      })
  },[])

  return (
    <div className="">
      <h1 className="text-4xl font-bold ml-10">Profile Saya</h1>
      <div className="flex justify-center mt-20 w-full">
        <div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="relative">
              <Image
                src={profile.foto_profile ? profile.foto_profile : ""}
                alt=""
                height="200"
                width="200"
                className="rounded-full border-5 border-primaryColor"
              />
              <Link  href="/siswa/editprofile" className="absolute  right-0 bottom-0">
                <EditProfile />
              </Link>
            </div>
            <h1 className="text-3xl font-bold mt-3">{profile.nama}</h1>
            <p className="mt-2">NISN : {profile.nis}</p>
          </div>
          <div className="">
            <div className="block">
              <p className="p-1 mt-5 font-bold">Kelas</p>
              <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                {profile.kelas?.nama.toUpperCase()}
              </p>
            </div>
            <div className="block">
              <p className="p-1 mt-5 font-bold">No. Telepon</p>
              <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                {profile.no_telepon}
              </p>
            </div>
            <div className="block">
              <p className="p-1 mt-5 font-bold">Alamat</p>
              <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                {profile.alamat?.detail_tempat}
              </p>
            </div>
            <div className="block">
              <p className="p-1 mt-5 font-bold">Status PKL</p>
              <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                {profile.status?.toUpperCase()}
              </p>
            </div>
            <div className="block">
              <p className="p-1 mt-5 font-bold">Guru Pemimbing</p>
              <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                {profile.guru_pembimbing?.nama.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
