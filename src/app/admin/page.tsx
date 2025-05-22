"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import { API_ENDPOINTS } from "@/utils/api";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminHome = () => {
    const [jumlahSiswa, setJumlahSiswa] = useState(0)
    const [jumlahGuruPembimbing, setJumlahGuruPembimbing] = useState(0)
    const [jumlahDudi, setJumlahDudi] = useState(0)
    useEffect(()=>{
      axios.get(API_ENDPOINTS.adminGetSiswa, { withCredentials: true }).then((res) => {setJumlahSiswa(res.data.data.count_data)}).catch((err) => {
        console.log(err);
      });
      axios.get(API_ENDPOINTS.adminGetGuruPembimbing, { withCredentials: true }).then((res) => {setJumlahGuruPembimbing(res.data.data.count_data)}).catch((err) => {
        console.log(err);
      });
      axios.get(API_ENDPOINTS.adminGetDudi, { withCredentials: true }).then((res) => {setJumlahDudi(res.data.data.count_data)}).catch((err) => {
        console.log(err);
      });
    })
    
    return (
      <div className="flex">
        {/* Main Content */}
        <WhiteTemplate>
          <div className="flex-1 flex flex-col">
            {/* Content */}
            <main className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg">Siswa</h3>
                  <p className="text-gray-600 text-sm mb-1">Kelola Siswa Terdaftar disini</p>
                  <p className="mb-1">Jumlah Siswa : {jumlahSiswa}</p>
                  <Link href={"/admin/masterdata/datasiswa"}>
                    <Button color="primary" variant="solid">Data Siswa</Button>
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg">Guru Pembimbing</h3>
                  <p className="text-gray-600 text-sm mb-1">Kelola Guru Pembimbing Terdaftar disini</p>
                  <p className="mb-1">Jumlah Guru : {jumlahGuruPembimbing}</p>
                  <Link href={"/admin/masterdata/datagurupembimbing"}>
                    <Button color="primary" variant="solid">Data Guru</Button>
                  </Link>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg">Dudi</h3>
                  <p className="text-gray-600 text-sm mb-1">Kelola Dudi Terdaftar disini</p>
                  <p className="mb-1">Jumlah Dudi : {jumlahDudi}</p>
                  <Link href={"/admin/masterdata/datadudi"}>
                    <Button color="primary" variant="solid">Data Dudi</Button>
                  </Link>
                </div>
                
              </div>
            </main>
          </div>
        </WhiteTemplate>
      </div>
    );
  };
  
  export default AdminHome;

