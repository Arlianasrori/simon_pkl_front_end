'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import toast, { Toaster } from "react-hot-toast";

const AbsenTelat = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Untuk menyimpan base64 dari gambar
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [note, setNote] = useState<string>(""); // Menyimpan catatan
  const [statusizinTelat, setStatusIzinTelat] = useState<string>("Telat"); // Menyimpan status, default "Telat"

  // Dropzone untuk mengunggah gambar
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (selectedImage) return; // Cegah upload jika gambar sudah ada

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string); // Simpan gambar dalam format base64
    };

    if (file) {
      reader.readAsDataURL(file); // Mengubah file ke base64
    }
  }, [selectedImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] // Hanya menerima file gambar
    },
    disabled: !!selectedImage // Nonaktifkan jika gambar sudah diunggah
  });

  const removeImage = () => {
    setSelectedImage(null); // Hapus gambar yang dipilih
    setIsFullScreen(false);
  };

  // Fungsi untuk mengirim data ke server
  const postGambar = () => {
    if (!selectedImage) {
      console.error("Tidak ada gambar yang diupload.");
      toast.error("Tidak ada gambar yang diupload.");
      return; // Cegah post jika tidak ada gambar
    }

    // Mendapatkan lokasi pengguna menggunakan Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Membuat FormData untuk mengirim gambar dan koordinat
          const formData = new FormData();
          formData.append("latitude", latitude.toString());
          formData.append("longitude", longitude.toString());
          formData.append("note", note); // Tambahkan catatan
          formData.append("statusizinTelat", statusizinTelat); // Tambahkan status

          // Konversi gambar (base64) ke Blob untuk dikirim
          const imageBlob = dataURItoBlob(selectedImage);
          if (imageBlob) {
            formData.append("foto", imageBlob, "image.jpg"); // Tambahkan gambar dengan nama 'foto'
          } else {
            console.error("Gagal mengonversi gambar ke Blob.");
            return;
          }

          // Log isi formData (untuk debugging)
          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }

          // Kirim data ke API menggunakan axios
          axios
            .post("http://localhost:2008/siswa/absen/absen-izin-telat", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true, // Jika autentikasi cookie diperlukan
            })
            .then((response) => {
              console.log("Upload berhasil:", response.data);
              toast.success("Sukses Absen Masuk");
              window.location.href = "/siswa/home";
            })
            .catch((error) => {
              console.error("Error saat upload:", error);
              toast.error(error.response.data.msg.toUpperCase());
            });
        },
        (error) => {
          console.error("Error mendapatkan lokasi:", error);
          toast.error(error.message);
        }
      );
    } else {
      console.error("Geolocation tidak didukung oleh browser ini.");
    }
  };

  // Fungsi untuk mengubah base64 (data URI) menjadi Blob
  const dataURItoBlob = (dataURI: string) => {
    try {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } catch (error) {
      console.error("Error mengonversi data URI ke Blob:", error);
      return null;
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <Toaster />
      <div className="flex items-center">
        <Link href="/siswa/pilihanabsen">
          <Image src="/images/leftArrow2.svg" alt="" height={30} width={30} />
        </Link>
        <h1 className="font-bold text-2xl mx-auto">Absen Telat</h1>
      </div>

      <div className="flex justify-center items-center mt-6 text-white">
        <div className="flex flex-col justify-center items-center bg-accentColor p-8 w-[80%] rounded-lg">
          <p className="font-bold">10 September 2024 - 8:11:46 AM</p>

          {/* Input Note */}
          <textarea
            className="w-full p-2 rounded-md border text-black border-gray-300 mt-4"
            placeholder="Masukkan catatan"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Pilihan Status */}
          <select
            className="w-full p-2 rounded-md border text-black border-gray-300 mt-4"
            value={statusizinTelat}
            onChange={(e) => setStatusIzinTelat(e.target.value)}
          >
            <option value="telat">Telat</option>
            <option value="izin">Izin</option>
          </select>

          {/* Dropzone area */}
          <div
            {...getRootProps()}
            className="relative flex flex-col justify-center items-center mt-4 w-full p-8 border-2 border-dashed border-white rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            {selectedImage ? (
              <>
                {/* Gambar yang diupload */}
                <div
                  className="relative w-[200px] h-[200px]"
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah event click upload saat gambar di klik
                    setIsFullScreen(true); // Set mode full-screen
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  {/* Tombol X untuk remove gambar */}
                  <button
                    className="absolute top-2 right-2 text-black p-1"
                    onClick={(e) => {
                      e.stopPropagation(); // Mencegah modal terbuka saat klik X
                      removeImage();
                    }}
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <Image src="/images/camera.svg" alt="Camera icon" height={50} width={50} />
                <p>Tap atau drop gambar di sini</p>
              </>
            )}
          </div>

          <button onClick={() => postGambar()} className="text-accentColor bg-white mt-4 p-2 w-[100%] rounded-full">
            Absen Telat
          </button>
        </div>
      </div>

      {/* Modal untuk menampilkan gambar secara full 50% */}
      {isFullScreen && selectedImage && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setIsFullScreen(false)} // Tutup modal saat area luar diklik
        >
          {/* Preview gambar 50% dari ukuran layar */}
          <div className="w-1/2 h-1/2">
            <Image
              src={selectedImage}
              alt="Full view"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsenTelat;
