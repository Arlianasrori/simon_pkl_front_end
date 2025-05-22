"use client";

import WhiteTemplate from "@/components/WhiteTemplate";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PengajuanKeluarDetail({ params }: { params: { ajuankeluar: string } }) {
    const [siswa, setSiswa] = useState<any>({});
    useEffect(() => {
        axios.get(`http://localhost:2008/pembimbingDudi/pengajuan-keluar-pkl/${params.ajuankeluar}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data.data)
                setSiswa(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const konfirmkeluar = () => {
        axios.put(`http://localhost:2008/pembimbingDudi/pengajuan-cancel-pkl/${params.ajuankeluar}`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toast.success("Siswa Telah Dikeluarkan Dari PKL");

            })
            .catch((err) => {
                console.log(err);
            });
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <div>
            <WhiteTemplate>
                <h2 className="text-2xl font-semibold">Pengajuan Keluar Detail</h2>

                <div className="flex justify-around mt-10">
                    <div>
                        <img src={siswa.siswa?.foto_profile} alt="foto_profile_siswa" />
                    </div>
                    <div className="h-full flex flex-col justify-center font-semibold">
                        <p>Nama : {siswa.siswa?.nama}</p>
                        <p>NIS : {siswa.siswa?.nis}</p>
                        <p>Email : {siswa.siswa?.email}</p>
                        <p>No Telepon : {siswa.siswa?.no_telepon}</p>
                        <p>Jenis kelamin : {siswa.siswa?.jenis_kelamin}</p>
                        <p>Status Pengajuan Keluar : {siswa.alasan}</p>
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <Button color="danger" variant="light">Tolak Keluar</Button>
                    <Button color="danger" onPress={onOpen}>Konfirmasi Keluar</Button>
                </div>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Konfirmasi Batalkan PKL</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Apakah Anda yakin ingin mengeluarkan siswa <strong>{siswa.siswa.nama}</strong>?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="danger" onPress={konfirmkeluar}>
                                        Konfirmasi
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </WhiteTemplate>
        </div>
    )
}