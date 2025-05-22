"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTahun } from "../context/TahunContext"; // Import hook context
export default function TahunDropdown() {
  const [tahunOptions, setTahunOptions] = useState<any[]>([]); // Opsi tahun dari API
  const [loading, setLoading] = useState(false);
  
  const { tahun, setTahun } = useTahun(); // Mengambil data dan fungsi setTahun dari context

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:2008/admin/tahun-sekolah", { withCredentials: true }) // Ganti URL API sesuai kebutuhan
      .then((response) => {
        setTahunOptions(response.data.data); // Asumsikan respons berupa array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tahun:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTahun(parseInt(event.target.value)); // Update tahun di context
    console.log("Tahun yang dipilih:", event.target.value);
    window.location.reload();
  };

  return (
    <div className="mr-4">
      <select
        value={tahun || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 text-sm text-black focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Pilih Tahun
        </option>
        {loading ? (
          <option value="">Loading...</option>
        ) : (
          tahunOptions.map((year: any) => (
            <option key={year.id} value={year.id}>
              {year.tahun}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
