"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import WhiteTemplate from "@/components/WhiteTemplate";
import toast, { Toaster } from "react-hot-toast";

interface ProfileData {
    nama: string;
    nis: string;
    kelas: { nama: string };
    no_telepon: string;
    alamat: { detail_tempat: string };
    status: string;
    guru_pembimbing: { nama: string };
    foto_profile?: string;
}

export default function EditProfile() {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:2008/guru-pembimbing/profile", { withCredentials: true })
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((error) => {
                console.error("Failed to fetch profile:", error);
                toast.error("Failed to load profile data");
            });
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handlePhotoUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a photo to upload");
            return;
        }

        const formData = new FormData();
        formData.append("foto_profile", selectedFile);

        try {
            setLoading(true);
            const response = await axios.put(
                "http://localhost:2008/guru-pembimbing/profile/foto",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setProfile((prevProfile: any) => ({
                ...prevProfile,
                foto_profile: response.data.data.foto_profile,
            }));

            toast.success("Profile photo updated successfully!");
        } catch (error) {
            console.error("Failed to upload photo:", error);
            toast.error("Failed to upload profile photo");
        } finally {
            setLoading(false);
        }
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <Toaster position="top-right" />
            <WhiteTemplate>
                <div className="flex flex-col items-center justify-center min-h-screen p-6">
                    <h1 className="text-4xl font-bold mb-8 text-center">Edit Profile</h1>

                    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                        <Image
                            src={profile.foto_profile ? profile.foto_profile : "/default-profile.jpg"}
                            alt="Profile Photo"
                            width={150}
                            height={150}
                            className="rounded-full mb-4 border-4 border-gray-300"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-3 mb-4 w-full p-2 border border-gray-300 rounded cursor-pointer"
                        />
                        <button
                            onClick={handlePhotoUpload}
                            disabled={loading}
                            className={`w-full p-2 rounded text-white font-semibold transition duration-200 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {loading ? "Uploading..." : "Upload New Photo"}
                        </button>
                    </div>
                </div>
            </WhiteTemplate>
        </div>
    );
}
