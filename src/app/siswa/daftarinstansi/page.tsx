import React from "react";
import WhiteTemplate from "@/components/WhiteTemplate";
import DaftarInstansi from "@/components/siswa/DaftarInstansi";

const pageDaftarInstansi = () => {
  return (
    <div className="h-screen w-full -mt-4.5">
      <WhiteTemplate>
        <DaftarInstansi />
      </WhiteTemplate>
    </div>
  );
};

export default pageDaftarInstansi;
