import AbsenIzin from '@/components/siswa/AbsenIzin'
import WhiteTemplate from '@/components/WhiteTemplate'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const pageAbsenKeluar = () => {
  return (
    <div className="w-[100%] -mt-4.5">
    <WhiteTemplate>
      <Toaster />
      <AbsenIzin />
    </WhiteTemplate>
  </div>
  )
}

export default pageAbsenKeluar