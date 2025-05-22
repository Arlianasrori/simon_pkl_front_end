"use client";

import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TahunDropdown from "./TahunDropdown"; // Import komponen TahunDropdown

interface User {
  foto_profile: string;
  nama: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname(); // Mendapatkan pathname
  const [user, setUser] = useState<User | null>(null);
  const [count,setCount] = useState(0)

  const handleLogout = () => {
    destroyCookie(null, "access_token", { path: "/" });
    destroyCookie(null, "refresh_token", { path: "/" });
    axios.post("http://localhost:2008/auth/logout").then(() => {
      window.location.href = "/login";
    });
  };

  useEffect(() => {
    const isGuruPage = pathname.includes("/guru");
    const isDudiPage = pathname.includes("/dudi");
    const isAdminPage = pathname.includes("/admin");
    const apiUrl = isGuruPage
      ? "http://localhost:2008/guru-pembimbing/"
      : isDudiPage
      ? "http://localhost:2008/pembimbingDudi/profile" 
      : isAdminPage
      ? "http://localhost:2008/admin"
      : "http://localhost:2008/siswa/";
    const notifURL = isGuruPage
      ? "http://localhost:2008/guru-pembimbing/notification/unread/count"
      : isDudiPage
      ? "http://localhost:2008/pembimbingDudi/notification/unread/count" 
      : "http://localhost:2008/siswa/notification/unread/count";

    axios
      .get(apiUrl, { withCredentials: true })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios.get(notifURL,{withCredentials:true})
    .then((res)=>{
      setCount(res.data.data.count)
    }).catch((err) => console.log(err)
    )
  }, [pathname]);

  const isGuruPage = pathname.includes("/guru");
  const isDudiPage = pathname.includes("/dudi");
  const isAdminPage = pathname.includes("/admin");

  return (
    <nav className="bg-gradient-to-r fixed w-[100%] z-20 from-right-linear px-16 to-left-linear h-[10vh] flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/images/logoSimon.svg"
          alt="logo"
          priority
          width="70"
          height="100"
        />
        <div>
          <Link href={isGuruPage ? "/guru" : isDudiPage ? "/dudi" :  isAdminPage ? "/admin" : "/siswa"}>
            <p className="text-white text-3xl">
              Simon<strong>PKL</strong>
            </p>
          </Link>
          <p className="text-white text-[0.6rem]">Solusinya PKL!</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Dropdown Tahun */}
        {isAdminPage && <TahunDropdown />}
        {/* <TahunDropdown /> */}
        {isAdminPage ? null : (
          
          <Link href={isDudiPage ? "/dudi/notifications" : isGuruPage ? "/guru/notifications" : "/siswa/notifications"}>
            <Badge color="danger" content={count} isInvisible={count > 0 ? false : true} shape="circle" placement="top-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                />
              </svg>
            </Badge>
          </Link>
        )}
        {/* Notification */}

        {/* Profile Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <svg
              className="cursor-pointer"
              width="23"
              height="29"
              viewBox="0 0 23 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6001 27.3571C1.6001 21.8343 6.07726 17.3571 11.6001 17.3571C17.123 17.3571 21.6001 21.8343 21.6001 27.3571M17.3144 7.35714C17.3144 10.5131 14.756 13.0714 11.6001 13.0714C8.44418 13.0714 5.88581 10.5131 5.88581 7.35714C5.88581 4.20122 8.44418 1.64285 11.6001 1.64285C14.756 1.64285 17.3144 4.20122 17.3144 7.35714Z"
                stroke="#EAEAEA"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" className="p-3">
            {/* Profile Info */}
            <DropdownItem key="profile-info" className="p-4">
              <div className="flex flex-col items-center justify-center">
                <Avatar
                  src={user?.foto_profile || "/images/default-avatar.png"}
                  name={user?.nama || "User"}
                  size="lg"
                  showFallback
                  className={`${user?.foto_profile ? "" : "border-black border-2"}`}
                />
                <p className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {user?.nama || "User Name"}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownItem>

            {/* Dropdown Items */}
            <DropdownItem key="profile-link" color="primary">
              <Link
                href={
                  isDudiPage
                    ? "/dudi/profile"
                    : isGuruPage
                    ? "/guru/profile"
                    : isAdminPage
                    ? "/admin/profile"
                    : "/siswa/profile"
                }
                className="w-full block"
              >
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={handleLogout}
              className="text-red-500"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
