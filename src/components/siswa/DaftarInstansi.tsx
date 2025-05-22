"use client";
import { Accordion, AccordionItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Alamat {
  detail_tempat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  negara: string;
}

interface KuotaJurusan {
  jurusan: string;
  kuota_pria: number;
  jumlah_siswa_pria: number;
  kuota_wanita: number;
  jumlah_siswa_wanita: number;
}

interface Instansi {
  id:number;
  id_dudi: number;
  nama_instansi_perusahaan: string;
  bidang_usaha: string;
  no_telepon: string;
  deskripsi: string;
  tersedia: boolean;
  id_sekolah: number;
  id_tahun: number;
  alamat: Alamat;
  jumlah_kuota_pria: number;
  jumlah_siswa_pria: number;
  jumlah_kuota_wanita: number;
  jumlah_siswa_wanita: number;
  kuota_jurusan: KuotaJurusan;
}

const ExpandableList: React.FC = () => {

  const siswaPKL = "5";
  const dudi = "CV. GLOBAL VINTAGE NUMERATION"
  const itemdaftar = {
    tahun: "2024",
    noTelp: "08124523623",
    bidang: "Project Management",
    alamat: "Dusun Tapen",
    deskripsi: "Coba Aja Dulu",
    kuota_jurusan: [
      {
        jurusan: "rpl",
        jumlah_siswa_laki: 2,
        jumlah_kuota_laki: 5,
        jumlah_siswa_perempuan: 2,
        jumlah_kuota_perempuan: 5,
      }
    ],
    jumlah_siswa_laki: 2,
    jumlah_kuota_laki: 5,
    jumlah_siswa_perempuan: 2,
    jumlah_kuota_perempuan: 5,
  }
  const [instansiList, setInstansiList] = useState<Instansi[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedInstansi, setSelectedInstansi] = useState()
  const [namaInstansi, setNamaInstansi] = useState<string>("")
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    fetch("http://localhost:2008/siswa/dudi?page=1",{ method: "GET",credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setInstansiList(data.data.data);
        console.log(data.data.data);
        
      })
      .catch((error) => {
        console.error("Error saat mengambil data:", error);
      }).finally(() => {
        setIsFetching(false); 
      })
  }, []);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const onAjukan = () => {
    console.log(typeof(selectedInstansi));
    console.log(selectedInstansi);
    
    setLoading(true);
    axios("http://localhost:2008/siswa/pengajuan_pkl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id_dudi: selectedInstansi,
      }),
      withCredentials: true,
    }).then((data) => {
        console.log("Pengajuan berhasil:", data);
        onOpenChange();
        toast.success("Pengajuan PKL Berhasil!");
        window.location.href = "/siswa/ajuanproses"
      })
      .catch((error) => {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleOpenModal = (instansi:any) => {
    setSelectedInstansi(instansi.id);
    setNamaInstansi(instansi.nama_instansi_perusahaan);
    
    onOpen();
  }

  return (
    <div className="w-[100%]">
      <div className="flex items-center">
        <h1 className="font-bold text-2xl mx-auto">Daftar Instansi</h1>
        <Toaster />
      </div>
      {isFetching ? (
        <p>Loading data...</p>
      ) : (
        <Accordion>
          {instansiList.map((instansi) => (
            <AccordionItem
              key={instansi.id}
              aria-label="Daftar Instansi"
              subtitle={`Siswa PKL : ${instansi.jumlah_kuota_pria + instansi.jumlah_kuota_wanita}`}
              title={instansi.nama_instansi_perusahaan}
            >
              <div className="px-5">
                <p><strong>No Telepon</strong> : {instansi.no_telepon}</p>
                <p><strong>Bidang</strong> : {instansi.bidang_usaha}</p>
                <p><strong>Alamat</strong> : {instansi.alamat.detail_tempat}</p>
                <p><strong>Deskripsi</strong> : {instansi.deskripsi}</p>
                <p><strong>Kuota</strong> :</p>
                <p className="ml-16 mb-5">
                  <strong>Laki Laki : {instansi.jumlah_siswa_pria} <span className="font-light">/</span> {instansi.jumlah_kuota_pria}</strong><br />
                  <strong>Perempuan : {instansi.jumlah_siswa_wanita} <span className="font-light">/</span> {instansi.jumlah_kuota_wanita}</strong>
                </p>
                <Button onPress={() => handleOpenModal(instansi)} className="w-[20vw]" isDisabled={!instansi.tersedia} color={`${instansi.tersedia ? "primary" : "default"}`} disableRipple>
                  Ajukan PKL
                </Button>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi</ModalHeader>
              <ModalBody>
                <p>
                  Apakah Anda Ingin Mengajukan PKL di <br /><strong>{namaInstansi}?</strong>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Batalkan
                </Button>
                <Button color="primary" onPress={() => onAjukan()}>
                  {loading ? "Mengajukan..." : "Konfirmasi"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ExpandableList;
