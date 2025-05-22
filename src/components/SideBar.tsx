"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import Image from "next/image";
import MasterData from "./icons/MasterData/page";
import Laporan from "./icons/Laporan/page";
import PelaksanaanPKL from "./icons/PelaksanaanPKL/page";
import Link from "next/link";
import Home from "./icons/Home/page";
import { SideArrow } from "./icons/SideArrow/page";
import ArrowDown from "./icons/ArrowDown/page";
import { KeluarIcon, LaporanIcon, LaporanSmallIcon } from "./icons/icons";

interface SideBarProps {
  className?: string;
}

export function SidebarAdmin() {
  return (
    <div className="w-[18%] h-[100%] fixed top-[10vh] min-h-max bg-[#1B1D2A] py-10 px-4">
      <div className="flex items-center text-white gap-3 mb-5">
        <Image
          src={"/images/profileAdmin.svg"}
          alt="logo"
          width={45}
          height={60}
        />
        <div>
          <h3 className="text-lg font-semibold">Admin</h3>
          <h6 className="text-sm">SMKN 2 MATARAM</h6>
        </div>
      </div>
      <hr className="mb-8" />
      <div className="w-full">
        <div className="flex gap-3 mx-2 mb-1 text-white">
          <Home />
          <Link href="/admin/"><p>Home</p></Link>
          </div>
        <Accordion isCompact>
          <AccordionItem
            startContent={<MasterData />}
            className="text-white"
            key="1"
            aria-label="MasterData"
            title={<p className="text-white">MasterData</p>}
            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <SideArrow />)}
          >
            <ul className="">
              <hr />
              <li>
                <Link href="/admin/masterdata/datasiswa">
                  <p className="">Data Siswa</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterdata/dataguru">
                  <p>Data Guru</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterdata/datadudi">
                  <p>Data DU/DI</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterdata/datajurusan">
                  <p>Data Jurusan</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterdata/datakelas">
                  <p>Data Kelas</p>
                </Link>
              </li>
              <hr />
            </ul>
          </AccordionItem>
          <AccordionItem
            startContent={<PelaksanaanPKL />}
            className="text-white"
            key="2"
            aria-label="Pelaksanaan PKL"
            title={<p className="text-white">Pelaksanaan PKL</p>}
            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <SideArrow />)}
          >
            <ul>
              <hr />
              <li>
                <Link href="/admin/pelaksanaanpkl/absensiswa">
                  <p>Absen Siswa</p>
                </Link>
              </li>
              <hr />
            </ul>
          </AccordionItem>
          <AccordionItem
            startContent={<Laporan />}
            className="text-white"
            key="3"
            aria-label="Laporan"
            title={<p className="text-white">Laporan</p>}
            indicator={({ isOpen }) => (isOpen ? <ArrowDown /> : <SideArrow />)}
          >
            <ul>
              <hr />
              <li>
                <Link href="/admin/masterlaporan/laporansiswa">
                  <p>Laporan Siswa</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterlaporan/laporandudi">
                  <p>Laporan DU/DI</p>
                </Link>
              </li>
              <hr />
              <li>
                <Link href="/admin/masterlaporan/laporanguru">
                  <p>Laporan Guru</p>
                </Link>
              </li>
              <hr />
            </ul>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export const SidebarSiswa: React.FC<SideBarProps> = ({ className }) => {
  return (
    <div
      className={`w-[18%] h-[90vh] fixed bottom-0 bg-[#1B1D2A] py-10 px-4 ${className}`}
    >
      <div className="flex items-center text-white gap-3 mb-5">
        <Image
          src="/images/profileAdmin.svg"
          alt="Admin Logo"
          width={45}
          height={60}
          className="w-12 h-12"
        />
        <div>
          <h3 className="text-lg font-semibold">Siswa</h3>
          <h6 className="text-sm">SMKN 2 MATARAM</h6>
        </div>
      </div>
      <hr className="mb-8" />
      <ul className="text-white space-y-6">
        <li>
          <Link href="/siswa/home" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <Home />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/siswa/laporan" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <Laporan />
              <span>Laporan</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/siswa/profile" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 18.364A9 9 0 0112 15c2.39 0 4.584.93 6.121 2.364M15 11a3 3 0 11-6 0 3 3 0 016 0zm-3 9a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/siswa/historiabsen" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <Image
                src="/images/History.svg"
                alt=""
                height={18}
                width={18}
              ></Image>
              <span>History Absen</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export const SidebarGuru: React.FC<SideBarProps> = ({ className }) => {
  return (
    <div
      className={`w-[18%] h-[90vh] fixed bottom-0 bg-[#1B1D2A] py-10 px-4 ${className}`}
    >
      <div className="flex items-center text-white gap-3 mb-5">
        <Image
          src="/images/profileAdmin.svg"
          alt="Admin Logo"
          width={45}
          height={60}
          className="w-12 h-12"
        />
        <div>
          <h3 className="text-lg font-semibold">Guru Pembimbing</h3>
          <h6 className="text-sm">SMKN 2 MATARAM</h6>
        </div>
      </div>
      <hr className="mb-8" />
      <ul className="text-white space-y-6">
        <li>
          <Link href="/guru/" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <Home />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/guru/absensiswa" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <LaporanSmallIcon />
              <span>Absen Siswa</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/guru/profile" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 18.364A9 9 0 0112 15c2.39 0 4.584.93 6.121 2.364M15 11a3 3 0 11-6 0 3 3 0 016 0zm-3 9a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
              <span>Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export const SidebarDudi: React.FC<SideBarProps> = ({ className }) => {
  return (
    <div
      className={`w-[18%] h-[90vh] fixed bottom-0 bg-[#1B1D2A] py-10 px-4 ${className}`}
    >
      <div className="flex items-center text-white gap-3 mb-5">
        <Image
          src="/images/profileAdmin.svg"
          alt="Admin Logo"
          width={45}
          height={60}
          className="w-12 h-12"
        />
        <div>
          <h3 className="text-lg font-semibold">Pembimbing Dudi</h3>
          <h6 className="text-sm">SMKN 2 MATARAM</h6>
        </div>
      </div>
      <hr className="mb-8" />
      <ul className="text-white space-y-6">
        <li>
          <Link href="/dudi/" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <Home />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/dudi/datasiswa" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <LaporanSmallIcon />
              <span>Data Siswa</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/dudi/pengajuankeluar" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <KeluarIcon />
              <span>Pengajuan Keluar</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/dudi/profile" className="hover:text-gray-400">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 18.364A9 9 0 0112 15c2.39 0 4.584.93 6.121 2.364M15 11a3 3 0 11-6 0 3 3 0 016 0zm-3 9a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
              <span>Profile</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
