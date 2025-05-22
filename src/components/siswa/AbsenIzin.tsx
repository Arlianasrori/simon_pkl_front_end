'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";

const AbsenIzin = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [note, setNote] = useState<string>(""); // State untuk alasan izin

  // Dropzone untuk mengunggah gambar
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (selectedImage) return;

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, [selectedImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    disabled: !!selectedImage
  });

  const removeImage = () => {
    setSelectedImage(null);
    setIsFullScreen(false);
  };

  // Fungsi untuk mengirim data ke server
  const postGambar = () => {
    if (!selectedImage || !note) {
      console.error("Tidak ada gambar atau alasan izin belum diisi.");
      toast.error("Gambar atau alasan izin belum diisi.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const formData = new FormData();
          formData.append("latitude", latitude.toString());
          formData.append("longitude", longitude.toString());
          formData.append("note", note);
          formData.append("statusIzinTelat", "izin");

          const imageBlob = dataURItoBlob(selectedImage);
          if (imageBlob) {
            formData.append("foto", imageBlob, "image.jpg");
          } else {
            console.error("Gagal mengonversi gambar ke Blob.");
            return;
          }
          axios
            .post("http://localhost:2008/siswa/absen/absen-izin-telat", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            })
            .then((response) => {
              console.log("Upload berhasil:", response.data);
              toast.success("Sukses Absen izin");
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
      <div className="flex items-center">
        <Link href="/siswa/pilihanabsen">
          <Image src="/images/leftArrow2.svg" alt="" height={30} width={30} />
        </Link>
        <h1 className="font-bold text-2xl mx-auto">Absen izin</h1>
      </div>

      <div className="flex justify-center items-center mt-6 text-white">
        <div className="flex flex-col justify-center items-center bg-accentColor p-8 w-[80%] rounded-lg">
          <div className="flex flex-col justify-start w-full">
            <p className="font-bold ">Alasan Izin : </p>
            <input
              type="text"
              className="w-[100%] bg-accentColor border-2 text-black border-white rounded-lg p-2 focus:outline-none"
              value={note}
              onChange={(e) => setNote(e.target.value)} // Update state alasan izin
            />
          </div>

          <p className="font-bold">Bukti Dokumen : </p>

          <div
            {...getRootProps()}
            className="relative flex flex-col justify-center items-center mt-4 w-full p-8 border-2 border-dashed border-white rounded-md cursor-pointer"
          >
            <input {...getInputProps()} />
            {selectedImage ? (
              <div
                className="relative w-[200px] h-[200px]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullScreen(true);
                }}
              >
                <Image
                  src={selectedImage}
                  alt="Selected"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <button
                  className="absolute top-2 right-2 text-black p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <Image src="/images/camera.svg" alt="Camera icon" height={50} width={50} />
                <p>Tap atau drop gambar di sini</p>
              </>
            )}
          </div>

          <button onClick={postGambar} className="text-accentColor bg-white mt-4 p-2 w-[100%] rounded-full">
            Absen Izin
          </button>
        </div>
      </div>

      {isFullScreen && selectedImage && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setIsFullScreen(false)}
        >
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

export default AbsenIzin;
