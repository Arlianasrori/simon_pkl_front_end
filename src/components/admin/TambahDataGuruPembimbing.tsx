"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useTahun } from "@/context/TahunContext";

// Tipe untuk data formulir
interface FormData {
  name: string;
  nip: string;
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  kelas: string;
  jurusan: string;
  noTelpon: string;
  jenipKelamin: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
}

interface Lokasi {
  id: string;
  nama: string;
}

interface Jurusan {
  id: string;
  nama: string;
}

interface Kelas {
  id: string;
  name: string;
  jurusanId: string;
}

// Skema validasi menggunakan yup
const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Nama wajib diisi"),
  nip: yup.string().required("nip wajib diisi"),
  tempatLahir: yup.string().required("Tempat lahir wajib diisi"),
  tanggalLahir: yup.string().required("Tanggal lahir wajib diisi"),
  agama: yup.string().required("Agama wajib diisi"),
  kelas: yup.string().required("Kelas wajib dipilih"),
  jurusan: yup.string().required("Jurusan wajib dipilih"),
  noTelpon: yup.string().required("No telepon wajib diisi"),
  jenipKelamin: yup.string().required("Jenip kelamin wajib dipilih"),
  provinsi: yup.string().required("Provinsi wajib dipilih"),
  kabupaten: yup.string().required("Kabupaten wajib dipilih"),
  kecamatan: yup.string().required("Kecamatan wajib dipilih"),
  desa: yup.string().required("Desa wajib dipilih"),
});

const TambahDataSiswa: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [provinsiList, setProvinsiList] = useState<Lokasi[]>([]);
  const [kabupatenList, setKabupatenList] = useState<Lokasi[]>([]);
  const [kecamatanList, setKecamatanList] = useState<Lokasi[]>([]);
  const [desaList, setDesaList] = useState<Lokasi[]>([]);
  const selectedJurusan = watch("jurusan");
  const { tahun } = useTahun();

  // Fetch data provinsi saat komponen di-mount
  useEffect(() => {
    axios.get("https://ibnux.github.io/data-indonesia/provinsi.json").then((res) => {
      setProvinsiList(res.data);
    });
  }, []);

  // Fetch data jurusan saat komponen di-mount
  useEffect(() => {
    axios
      .get(`http://localhost:2008/admin/jurusan?id_tahun=${tahun}`, { withCredentials: true })
      .then((res) => {
        setJurusanList(res.data.data);
        console.log(res.data.data);
        
      });
  }, [tahun]);

  // Fetch data kelas berdasarkan jurusan yang dipilih
  useEffect(() => {
    if (selectedJurusan) {
      axios
        .get(`http://localhost:2008/kelas?jurusanId=${selectedJurusan}`)
        .then((res) => setKelasList(res.data))
        .catch((error) => console.error("Error fetching kelas:", error));
    } else {
      setKelasList([]);
      setValue("kelas", ""); // Reset kelas jika jurusan berubah
    }
  }, [selectedJurusan, setValue]);

  // Fetch data kabupaten berdasarkan provinsi yang dipilih
  useEffect(() => {
    const selectedProvinsi = watch("provinsi");
    if (selectedProvinsi) {
      axios
        .get(`https://ibnux.github.io/data-indonesia/kabupaten/${selectedProvinsi}.json`)
        .then((res) => setKabupatenList(res.data))
        .catch((error) => console.error("Error fetching kabupaten:", error));
    } else {
      setKabupatenList([]);
      setValue("kabupaten", ""); // Reset kabupaten jika provinsi berubah
    }
  }, [watch("provinsi"), setValue]);

  // Fetch data kecamatan berdasarkan kabupaten yang dipilih
  useEffect(() => {
    const selectedKabupaten = watch("kabupaten");
    if (selectedKabupaten) {
      axios
        .get(`https://ibnux.github.io/data-indonesia/kecamatan/${selectedKabupaten}.json`)
        .then((res) => setKecamatanList(res.data))
        .catch((error) => console.error("Error fetching kecamatan:", error));
    } else {
      setKecamatanList([]);
      setValue("kecamatan", ""); // Reset kecamatan jika kabupaten berubah
    }
  }, [watch("kabupaten"), setValue]);

  // Fetch data desa berdasarkan kecamatan yang dipilih
  useEffect(() => {
    const selectedKecamatan = watch("kecamatan");
    if (selectedKecamatan) {
      axios
        .get(`https://ibnux.github.io/data-indonesia/kelurahan/${selectedKecamatan}.json`)
        .then((res) => setDesaList(res.data))
        .catch((error) => console.error("Error fetching desa:", error));
    } else {
      setDesaList([]);
      setValue("desa", ""); // Reset desa jika kecamatan berubah
    }
  }, [watch("kecamatan"), setValue]);

  // Fungsi untuk meng-handle submit form
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:2008/addSiswa", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("Data berhasil disimpan!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="font-bold text-gray-900 dark:text-black mx-10">Tambah Data</h1>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-400" />
      <form className="mx-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {[
            { label: "Nama", id: "name", type: "text", placeholder: "Masukkan nama..." },
            { label: "nip", id: "nip", type: "text", placeholder: "Masukkan nip..." },
            { label: "Tempat Lahir", id: "tempatLahir", type: "text", placeholder: "Masukkan tempat lahir..." },
            { label: "Tanggal Lahir", id: "tanggalLahir", type: "date", placeholder: "" },
            { label: "Agama", id: "agama", type: "text", placeholder: "Masukkan agama..." },
            { label: "No Telepon", id: "noTelpon", type: "text", placeholder: "Masukkan no telepon..." },
          ].map(({ label, id, type, placeholder }) => (
            <div key={id} className="flex items-center">
              <label
                htmlFor={id}
                className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
              >
                {label} :
              </label>
              <input
                id={id}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5"
                placeholder={placeholder}
                {...register(id as keyof FormData)}
              />
              {errors[id as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[id as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Dropdown untuk jurusan */}
          <div className="flex items-center">
            <label
              htmlFor="jurusan"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Jurusan :
            </label>
            <select
              id="jurusan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5"
              {...register("jurusan")}
            >
              <option value="">Pilih Jurusan</option>
              {jurusanList.map((jurusan) => (
                <option className="text-black" key={jurusan.id} value={jurusan.id}>
                  {jurusan.nama}
                </option>
              ))}
            </select>
            {errors.jurusan && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jurusan.message}
              </p>
            )}
          </div>

          {/* Dropdown untuk kelas */}
          <div className="flex items-center">
            <label
              htmlFor="kelas"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Kelas :
            </label>
            <select
              id="kelas"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1 p-2.5"
              {...register("kelas")}
              disabled={!kelasList.length}
            >
              <option value="">Pilih Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.name}
                </option>
              ))}
            </select>
            {errors.kelas && (
              <p className="text-red-500 text-sm mt-1">
                {errors.kelas.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <label
              htmlFor="jenipKelamin"
              className="font-bold text-gray-900 dark:text-black w-1/4 text-right mr-4"
            >
              Jenip Kelamin :
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Laki-Laki"
                  value="Laki-Laki"
                  {...register("jenipKelamin")}
                />
                <label htmlFor="Laki-Laki" className="ml-2">
                  Laki-Laki
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Perempuan"
                  value="Perempuan"
                  {...register("jenipKelamin")}
                />
                <label htmlFor="Perempuan" className="ml-2">
                  Perempuan
                </label>
              </div>
            </div>
            {errors.jenipKelamin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jenipKelamin.message}
              </p>
            )}
          </div>

          {/* Dropdown Provinsi */}
          <div className="flex items-center">
            <label htmlFor="provinsi" className="font-bold w-1/4 text-right mr-4">
              Provinsi :
            </label>
            <select
              id="provinsi"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 flex-1"
              {...register("provinsi")}
            >
              <option value="">Pilih Provinsi</option>
              {provinsiList.map((provinsi) => (
                <option key={provinsi.id} value={provinsi.id}>
                  {provinsi.nama}
                </option>
              ))}
            </select>
            {errors.provinsi && (
              <p className="text-red-500 text-sm">{errors.provinsi.message}</p>
            )}
          </div>

          {/* Dropdown Kabupaten */}
          <div className="flex items-center">
            <label htmlFor="kabupaten" className="font-bold w-1/4 text-right mr-4">
              Kabupaten :
            </label>
            <select
              id="kabupaten"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 flex-1"
              {...register("kabupaten")}
              disabled={!kabupatenList.length}
            >
              <option value="">Pilih Kabupaten</option>
              {kabupatenList.map((kabupaten) => (
                <option key={kabupaten.id} value={kabupaten.id}>
                  {kabupaten.nama}
                </option>
              ))}
            </select>
            {errors.kabupaten && (
              <p className="text-red-500 text-sm">{errors.kabupaten.message}</p>
            )}
          </div>

          {/* Dropdown Kecamatan */}
          <div className="flex items-center">
            <label htmlFor="kecamatan" className="font-bold w-1/4 text-right mr-4">
              Kecamatan :
            </label>
            <select
              id="kecamatan"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 flex-1"
              {...register("kecamatan")}
              disabled={!kecamatanList.length}
            >
              <option value="">Pilih Kecamatan</option>
              {kecamatanList.map((kecamatan) => (
                <option key={kecamatan.id} value={kecamatan.id}>
                  {kecamatan.nama}
                </option>
              ))}
            </select>
            {errors.kecamatan && (
              <p className="text-red-500 text-sm">{errors.kecamatan.message}</p>
            )}
          </div>

          {/* Dropdown Desa */}
          <div className="flex items-center">
            <label htmlFor="desa" className="font-bold w-1/4 text-right mr-4">
              Desa :
            </label>
            <select
              id="desa"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 flex-1"
              {...register("desa")}
              disabled={!desaList.length}
            >
              <option value="">Pilih Desa</option>
              {desaList.map((desa) => (
                <option key={desa.id} value={desa.id}>
                  {desa.nama}
                </option>
              ))}
            </select>
            {errors.desa && (
              <p className="text-red-500 text-sm">{errors.desa.message}</p>
            )}
          </div>


          {/* Tombol Simpan dan Batalkan */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/masterdata/datasiswa"
              className="p-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Batalkan
            </Link>
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

export default TambahDataSiswa;
