import { SidebarSiswa } from "@/components/SideBar";
import Profile from "@/components/siswa/Profile";
import WhiteTemplate from "@/components/WhiteTemplate";
import React from "react";

const pageProfile = () => {
  return (
      <div className="-mt-4.5 w-[100%]">
        <WhiteTemplate>
          <Profile />
        </WhiteTemplate>
    </div>
  );
};

export default pageProfile;
