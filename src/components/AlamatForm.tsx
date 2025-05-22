"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Tipe untuk data formulir
interface FormData {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
}

// Tipe untuk data lokasi
interface Lokasi {
  id: string;
  nama: string;
}

// Skema validasi menggunakan yup
const schema: yup.ObjectSchema<FormData> = yup.object({
  provinsi: yup.string().required("Provinsi wajib dipilih"),
  kabupaten: yup.string().required("Kabupaten wajib dipilih"),
  kecamatan: yup.string().required("Kecamatan wajib dipilih"),
  desa: yup.string().required("Desa wajib dipilih"),
});

const AlamatForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [provinsiList, setProvinsiList] = useState<Lokasi[]>([]);
  const [kabupatenList, setKabupatenList] = useState<Lokasi[]>([]);
  const [kecamatanList, setKecamatanList] = useState<Lokasi[]>([]);
  const [desaList, setDesaList] = useState<Lokasi[]>([]);

  const selectedProvinsi = watch("provinsi");
  const selectedKabupaten = watch("kabupaten");
  const selectedKecamatan = watch("kecamatan");

  // Fetch Provinsi
  useEffect(() => {
    axios
      .get<Lokasi[]>("https://ibnux.github.io/data-indonesia/provinsi.json")
      .then((res) => setProvinsiList(res.data))
      .catch((err) => console.error("Error fetching provinsi:", err));
  }, []);

  // Fetch Kabupaten berdasarkan provinsi
  useEffect(() => {
    if (selectedProvinsi) {
      axios
        .get<Lokasi[]>(
          `https://ibnux.github.io/data-indonesia/kabupaten/${selectedProvinsi}.json`
        )
        .then((res) => setKabupatenList(res.data))
        .catch((err) => console.error("Error fetching kabupaten:", err));
    } else {
      setKabupatenList([]);
      setValue("kabupaten", "");
    }
  }, [selectedProvinsi, setValue]);

  // Fetch Kecamatan berdasarkan kabupaten
  useEffect(() => {
    if (selectedKabupaten) {
      axios
        .get<Lokasi[]>(
          `https://ibnux.github.io/data-indonesia/kecamatan/${selectedKabupaten}.json`
        )
        .then((res) => setKecamatanList(res.data))
        .catch((err) => console.error("Error fetching kecamatan:", err));
    } else {
      setKecamatanList([]);
      setValue("kecamatan", "");
    }
  }, [selectedKabupaten, setValue]);

  // Fetch Desa berdasarkan kecamatan
  useEffect(() => {
    if (selectedKecamatan) {
      axios
        .get<Lokasi[]>(
          `https://ibnux.github.io/data-indonesia/kelurahan/${selectedKecamatan}.json`
        )
        .then((res) => setDesaList(res.data))
        .catch((err) => console.error("Error fetching desa:", err));
    } else {
      setDesaList([]);
      setValue("desa", "");
    }
  }, [selectedKecamatan, setValue]);

  // Fungsi submit
  const onSubmit = (data: FormData) => {
    console.log("Data submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      

      {/* Tombol Submit */}
      <div className="flex justify-end mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Simpan
        </button>
      </div>
    </form>
  );
};

export default AlamatForm;
