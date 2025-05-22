"use client"

import { ActionButtonIcon } from "@/components/icons/icons";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ActionButton({ tipe, id }: { tipe: string, id: number }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [siswa, setSiswa] = useState("");

    if (tipe === "siswa") {
        axios.get(`http://localhost:2008/admin/siswa/${id}`, { withCredentials: true }).then((res) => {
            console.log(res.data.data);
            setSiswa(res.data.data.nama);
        })
    }

    function handleDelete() {
        if (tipe === "siswa") {
            axios.delete(`http://localhost:2008/admin/siswa/${id}`,{ withCredentials: true })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (tipe === "pembimbing") {
            axios.delete(`/api/pembimbing/${id}`)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {

                })
        }
    }

    return (
        <div>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        isIconOnly
                        disableRipple
                    >
                        <ActionButtonIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Action Button" className="text-center p-0">
                    <DropdownItem key="edit" color="primary" href={`/admin/masterdata/datasiswa/edit/${id}`}>Edit</DropdownItem>
                    <DropdownItem key="detail" color="primary" href={`/admin/masterdata/datasiswa/${id}`}>Detail</DropdownItem>
                    <DropdownItem onClick={onOpen} key="delete" className="text-danger" color="danger">
                        Delete
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Hapus Data</ModalHeader>
                            <ModalBody>
                                <p>
                                    Anda Yakin ingin menghapus data {tipe} <b>{siswa}</b> ?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button  variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}