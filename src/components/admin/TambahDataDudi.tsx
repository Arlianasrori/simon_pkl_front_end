"use client";

// src/components/TambahDataSiswa.tsx
import React, { useState } from "react";
import * as yup from "yup";

interface FormData {
  instasiPerusahaan: string;
  bidang: string;
  noTelpon: string;
  alamat: string;
}

const schema = yup.object().shape({
  instasiPerusahaan: yup.string().required("instasi/Perusahaan is required"),
  bidang: yup.string().required(),
  noTelpon: yup.string().required(),
  alamat: yup.string().required(),
});

const TambahDataDudi: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    instasiPerusahaan: "",
    bidang: "",
    noTelpon: "",
    alamat: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2008/addSiswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="font-bold text-gray-900 dark:text-black mx-10">
        Tambah Data
      </h1>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />
      <form className="mx-10 my-4" onSubmit={handleSubmit}>
        <div className="">
          <div className="flex items-center mb-2">
            <label
              htmlFor="bidang"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Bidang :
            </label>
            <input
              type="text"
              id="bidang"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5 dark:placeholder-gray-400"
              placeholder="Masukkan Bidang..."
              value={formData.bidang}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-2">
            <label
              htmlFor="name"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Instansi/Perusahaan :
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5 dark:placeholder-gray-400"
              placeholder="Masukkan nama..."
              value={formData.instasiPerusahaan}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center mb-2">
            <label
              htmlFor="alamat"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Alamat :
            </label>
            <input
              type="text"
              id="alamat"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5 dark:placeholder-gray-400"
              placeholder="Masukkan Alamat..."
              value={formData.noTelpon}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center mb-2">
            <label
              htmlFor="noTelpon"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              No Telpon :
            </label>
            <input
              type="text"
              id="noTelpon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5 dark:placeholder-gray-400"
              placeholder="Masukkan No Telpon..."
              value={formData.noTelpon}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end mt-20">
            <button
              type="button"
              className="p-3 mr-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="p-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahDataDudi;
