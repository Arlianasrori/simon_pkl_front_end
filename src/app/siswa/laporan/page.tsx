import Laporan from "@/components/siswa/Laporan";
import React from "react";
import WhiteTemplate from "@/components/WhiteTemplate";

const pageLaporan = () => {
  return (
    <div className="w-[100vw]">
      <WhiteTemplate className="mt-[16vh]">
        <Laporan />
      </WhiteTemplate>
    </div>
  );
};

export default pageLaporan;
