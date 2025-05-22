"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {BelumInstansi, SudahDiterima, SudahInstansi} from "./BelumInstansi";
import { DetailIcon } from "../icons/icons";


const MenungguProses = () => {
  const [profile, setProfile]: any = useState([]);
  const [instansi, setInstansi]: any = useState([]);
  const [sudahAjukan, setSudahAjukan] = useState(false);
  const [dudi, setDudi]: any = useState([]);
  const [diterima, setDiterima] = useState(false);

  useEffect(() => {
    document.title = "Siswa - Home";
    axios.get("http://localhost:2008/siswa/profile", { withCredentials: true }).then((res) => {
      setProfile(res.data.data)
      
    })
    axios.get("http://localhost:2008/siswa/pengajuan_pkl/last/get", { withCredentials: true }).then((res) => {
      if(res.data.data.status === "diterima"){
        setDiterima(true)
      }
      setSudahAjukan(true)
      setInstansi(res.data.data)
      setDudi(res.data.data.dudi)
    }).catch((err) => {
      setSudahAjukan(false)
      console.log(err);
    })
  },[])
  console.log(diterima);
  
  return (
    <div>
      <div className="">
        <h1 className="font-bold text-3xl">Selamat Datang, {profile.nama}</h1>
        <p>NISN : {profile.nis}</p>
      </div>
      { diterima ? (
        <SudahDiterima />
      ): sudahAjukan ? (
        <SudahInstansi/>
      ) : (
        <BelumInstansi/>
      )}
    </div>
  );
};

export default MenungguProses;
