import AbsenKeluar from '@/components/siswa/AbsenKeluar'
import WhiteTemplate from '@/components/WhiteTemplate'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const pageAbsenKeluar = () => {
  return (
    <div className="w-[100%] -mt-4.5">
    <WhiteTemplate>
      <Toaster />
      <AbsenKeluar />
    </WhiteTemplate>
  </div>
  )
}

export default pageAbsenKeluar