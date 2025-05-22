import PilihanAbsen, { MonitoringPKL } from "@/components/siswa/PilihanAbsen";
import WhiteTemplate from "@/components/WhiteTemplate";
import React from "react";

const pagePilihanAbsen = () => {
  return (
    <div className="w-[100%] -mt-4.5">
      <WhiteTemplate>
        <MonitoringPKL />
      </WhiteTemplate>
    </div>
  );
};

export default pagePilihanAbsen;
