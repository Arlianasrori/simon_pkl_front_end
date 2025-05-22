import AbsenMasuk from '@/components/siswa/AbsenMasuk'
import AbsenTelat from '@/components/siswa/AbsenTelat'
import WhiteTemplate from '@/components/WhiteTemplate'
import React from 'react'

const pageAbsenTelat = () => {
  return (
    <div className="w-[100%] -mt-4.5">
      <WhiteTemplate>
        <AbsenTelat />
      </WhiteTemplate>
    </div>
  )
}

export default pageAbsenTelat