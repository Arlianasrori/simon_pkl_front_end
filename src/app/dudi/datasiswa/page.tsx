"use client";

import { SiswaDudi } from "@/components/siswacard";
import WhiteTemplate from "@/components/WhiteTemplate";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DataSiswa() {
    const [siswa, setSiswa] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:2008/pembimbingDudi/siswa",{withCredentials:true}).then((res)=>{
            setSiswa(res.data.data)
            console.log(res.data.data);
            
        })
    },[])
    return (
        <div>
            <WhiteTemplate>
                <h1 className="text-2xl mb-5 font-bold">Data Siswa</h1>
                {siswa.map((item: any) => (
                    <SiswaDudi key={item.id} name={item.nama} kelas={item.kelas.nama.toUpperCase()} url={`/dudi/datasiswa/${item.id}`} />
                ))}
            </WhiteTemplate>
        </div>
    );
}