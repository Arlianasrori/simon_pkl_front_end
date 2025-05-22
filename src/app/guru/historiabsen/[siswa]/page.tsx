"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Optional untuk animasi
import { FaCheck } from 'react-icons/fa'; // Menggunakan react-icons untuk ikon centang
import WhiteTemplate from '@/components/WhiteTemplate';
import SiswaCard from '@/components/siswacard';
import axios from 'axios';

const amenities = [
    { name: 'Juli',id_bulan:7, description: 'High-speed wireless internet access.' },
    { name: 'Agustus',id_bulan:8, description: 'Flat-screen television with cable channels.' },
    { name: 'September', id_bulan:9, description: 'Fully equipped kitchen with modern appliances.' },
    { name: 'Oktober', id_bulan:10, description: 'Private parking space available.' },
    { name: 'November', id_bulan:11, description: 'Outdoor swimming pool with lounge chairs.' },
    { name: 'Desember', id_bulan:12, description: 'Fitness center with various equipment.' },
];
type HistoriAbsenSiswa = { params: { siswa: string } }

const RadioGroup= (props :HistoriAbsenSiswa) => {
    const { params } = props
    const [selectedAmenity, setSelectedAmenity] = useState<any>(null);
    const selectedDescription = amenities.find(amenity => amenity.name === selectedAmenity)?.description;
    const [siswa, setSiswa] = useState<any>([]);

    useEffect(() => {
        axios.get(`http://localhost:2008/guru-pembimbing/siswa/${params.siswa}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data.data);
                setSiswa(res.data.data);
            })
    }, []);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAmenity(event.target.value);
        console.log(selectedAmenity);
        
    };

    return (
        <div className="space-y-4">
            <WhiteTemplate>
                <h1 className='text-2xl text-center'>Absen <strong>{siswa.nama}</strong></h1>
                <div>
                    <label className="block text-sm mb-5 font-medium text-gray-300">Select Month</label>
                    <div className="flex space-x-2">
                        {amenities.map((amenity) => (
                            <motion.div
                                key={amenity.name}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRadioChange({ target: { value: amenity.id_bulan } } as any)}
                                className={`px-4 py-2 rounded-full border cursor-pointer flex items-center space-x-2 transition-colors duration-200 ${selectedAmenity === amenity.id_bulan
                                        ? 'bg-accentColor text-white border-blue-400'
                                        : 'bg-gray-100 text-gray-400 border-gray-600'
                                    }`}
                            >
                                {selectedAmenity === amenity.id_bulan && <FaCheck className="mr-2" />}
                                <span>{amenity.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {selectedAmenity && (
                    <div className="mt-4 p-4 rounded-lg ">
                        <h3 className="text-lg font-medium">Description</h3>
                        <div className='flex flex-col gap-3'>
                            <SiswaCard url='/guru/detailabsen' variant='done' name='Adit' kelas='XI RPL 3' />
                            <SiswaCard url='/guru/detailabsen' variant='' name='Adit' kelas='XI RPL 3' />
                            <SiswaCard url='/guru/detailabsen' variant='profile' name='Adit' kelas='XI RPL 3' />
                        </div>
                    </div>
                )}
            </WhiteTemplate>
        </div>
    );
};

export default RadioGroup;
