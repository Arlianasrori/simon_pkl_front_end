'use client'

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; // Ambil file pertama yang di-drop
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string); // Set gambar untuk preview
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [] // Menerima semua jenis file gambar
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-2 p-10 text-center ${
        isDragActive ? 'border-blue-400' : 'border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag drop some image here, or click to select</p>
      )}
      {selectedImage && (
        <div className="mt-4">
          <Image
            src={selectedImage}
            alt="Preview"
            width={50}
            height={50}
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
