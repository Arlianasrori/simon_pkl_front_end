"use client";

import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { LocationIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";

interface Location {
    latitude: number | null;
    longitude: number | null;
}

export default function TambahKoordinat() {
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
    const [placeName, setPlaceName] = useState<string>("");
    const [radius, setRadius] = useState<number | "">("");  // Radius dalam meter

    const handleAddLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    toast.success("Location successfully retrieved!");
                },
                (error: GeolocationPositionError) => {
                    console.error("Error getting location:", error);
                    toast.error("Could not get location. Please allow location access.");
                }
            );
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async () => {
        if (!placeName || location.latitude === null || location.longitude === null || radius === "") {
            toast.error("Please fill in all fields and add location.");
            return;
        }

        const payload = {
            nama_tempat: placeName,
            latitude: location.latitude,
            longitude: location.longitude,
            radius_absen_meter: radius  // Format sesuai spesifikasi
        };

        try {
            const response = await axios.post("http://localhost:2008/pembimbingDudi/koordinat-absen", payload, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Location added successfully!");
                setPlaceName("");
                setLocation({ latitude: null, longitude: null });
                setRadius("");
            } else {
                toast.error("Failed to add location.");
            }
        } catch (error) {
            console.error("Error submitting location:", error);
            toast.error("Error submitting location.");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <WhiteTemplate>
                <div className="bg-accentColor p-10 rounded-lg text-white flex gap-10 flex-col items-center">
                    <h1 className="text-3xl font-bold">Tambah Koordinat</h1>
                    <input
                        type="text"
                        placeholder="Masukkan Nama Tempat"
                        className="placeholder:text-gray-500 w-2/4 border-2 text-black border-white p-2 rounded-lg"
                        value={placeName}
                        onChange={(e) => setPlaceName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Masukkan Radius Absen (meter)"
                        className="placeholder:text-gray-500 w-2/4 border-2 text-black border-white p-2 rounded-lg"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                    <div
                        className="flex flex-col items-center gap-2 border-2 border-white p-2 rounded-lg cursor-pointer"
                        onClick={handleAddLocation}
                    >
                        <LocationIcon />
                        <p>Tambah Lokasi Saat ini</p>
                        {location.latitude !== null && location.longitude !== null && (
                            <p>{`Lat: ${location.latitude}, Lng: ${location.longitude}`}</p>
                        )}
                    </div>
                    <button
                        className="bg-white text-accentColor w-2/4 text-center border-white border-2 p-3 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Kirim
                    </button>
                </div>
            </WhiteTemplate>
        </div>
    );
}
