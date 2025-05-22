import PilihanAbsen, { MonitoringPKL, SkemaPKL } from "@/components/siswa/PilihanAbsen";
import WhiteTemplate from "@/components/WhiteTemplate";
import React from "react";


const SkemaPKLPage = () => {
  return (
    <div className="w-[100%] -mt-4.5">
      <WhiteTemplate>
        <SkemaPKL />
      </WhiteTemplate>
    </div>
  );
};

export default SkemaPKLPage;
