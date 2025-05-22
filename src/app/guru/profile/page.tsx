"use client";

import { EditProfile } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function ProfileGuru() {
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        axios.get("http://localhost:2008/guru-pembimbing/profile", { withCredentials: true }).then((res) => {
            setProfile(res.data.data)
        })
    }, [])


    return (
        <WhiteTemplate>
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
                                <Link href="/guru/editprofile" className="absolute  right-0 bottom-0">
                                    <EditProfile />
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold mt-3">{profile.nama}</h1>
                            <p className="mt-2">NISN : 21414125125</p>
                        </div>
                        <div className="">
                            <div className="block">
                                <p className="p-1 mt-5 font-bold">Instansi</p>
                                <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                                    {profile.sekolah?.nama.toUpperCase()}
                                </p>
                            </div>
                            <div className="block">
                                <p className="p-1 mt-5 font-bold">NPSN Instansi</p>
                                <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                                    {profile.sekolah?.npsn}
                                </p>
                            </div>
                            <div className="block">
                                <p className="p-1 mt-5 font-bold">No. Telepon</p>
                                <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                                    08123456789
                                </p>
                            </div>
                            <div className="block">
                                <p className="p-1 mt-5 font-bold">Alamat</p>
                                <p className="text-lightGrayForm border-2 border-lightWhite p-3 rounded-xl w-96">
                                    {profile.alamat?.detail_tempat}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </WhiteTemplate>
    )
}