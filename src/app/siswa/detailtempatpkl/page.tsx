"use client"

import { BidangIcon, DescriptionIcon, DetailIcon, KoperIcon, LocationIcon, TelephoneIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DetailTampatPKL() {
    const [dudi, setDudi]: any = useState([]);
    const [alasan, setAlasan] = useState<string>(""); // State untuk input alasan
    useEffect(() => {
        axios.get("http://localhost:2008/siswa/pengajuan_pkl/last/get", { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            setDudi(res.data.data.dudi);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const batalPKL = () => {
        if (!alasan.trim()) {
            toast.error("Alasan tidak boleh kosong");
            return;
        }

        axios.post(
            "http://localhost:2008/siswa/pengajuan_keluar_pkl",
            { alasan }, // Mengirimkan alasan ke API
            { withCredentials: true }
        ).then((res) => {
            console.log(res.data.data);
            toast.success("Pengajuan membatalkan PKL berhasil diajukan");
        }).catch((err) => {
            console.error(err);
            toast.error("Gagal mengajukan pembatalan PKL");
        });
    };

    return (
        <div>
            <WhiteTemplate>
                <h2 className="font-semibold text-xl">Detail Tempat PKL</h2>
                <div>
                    <div className="relative bg-accentColor bg-[url('/images/logoLowOpacity.png')] bg-no-repeat bg-center bg-cover p-20 mt-10 rounded-xl flex flex-col items-center">
                        <h2 className="absolute font-semibold text-white top-5 left-5 text-lg">Tempat PKL Saya</h2>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center items-center gap-2">
                                <KoperIcon />
                                <h1 className="w-full text-white text-xl">{dudi.nama_instansi_perusahaan}</h1>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <TelephoneIcon />
                                <h1 className="w-full text-white text-xl">{dudi.no_telepon}</h1>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <LocationIcon />
                                <h1 className="w-full text-white text-xl">Jl. Lorem Ipsum,No 19</h1>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <DescriptionIcon />
                                <h1 className="w-full text-white text-xl">{dudi.deskripsi}</h1>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <BidangIcon />
                                <h1 className="w-full text-white text-xl">{dudi.bidang_usaha}</h1>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <Link href={"/siswa/laporan"}>
                                <Button className="bg-transparent border-white border-3 text-white">Laporan</Button>
                            </Link>
                            <Link href={"/siswa/pilihanabsen"}>
                                <Button className="bg-white border-white text-accentColor">Absen</Button>
                                <Button variant="solid" onPress={onOpen} className="mt-2" color="danger">Cancel PKL</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Konfirmasi Batalkan PKL</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Apakah Anda yakin ingin membatalkan PKL di <strong>{dudi.nama_instansi_perusahaan}</strong>?
                                    </p>
                                    <Input
                                        label="Alasan Pembatalan"
                                        placeholder="Masukkan alasan pembatalan"
                                        value={alasan}
                                        onChange={(e) => setAlasan(e.target.value)} // Menyimpan input ke state
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" onPress={batalPKL}>
                                        Konfirmasi
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </WhiteTemplate>
        </div>
    );
}
