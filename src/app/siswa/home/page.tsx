import SiswaHome from "@/components/siswa/Home";
import React from "react";
import WhiteTemplate from "@/components/WhiteTemplate";

const HomeSiswaPage = () => {
  return (
    <div className="w-[100%] -mt-4.5">
      <WhiteTemplate>
        <SiswaHome />
      </WhiteTemplate>
    </div>
  );
};

export default HomeSiswaPage;
