import WhiteTemplate from "@/components/WhiteTemplate";
import SiswaCard from "./laporancard";

export default function LaporanSiswa() {
    return (
        <div>
            <WhiteTemplate>
                <h1 className="text-2xl mb-5 font-bold">Laporan Saya</h1>
                <p className="text-accentColor font-medium">Selasa, 15 Desember 2022</p>
                <div className="grid grid-cols-3 mt-3 gap-5">
                    <SiswaCard name="Selasa,12 Oktober 2023" kelas="Belajar Instalasi PHP" />
                    <SiswaCard name="Selasa,12 Oktober 2023" kelas="Belajar Instalasi PHP" />
                    <SiswaCard name="Selasa,12 Oktober 2023" kelas="Belajar Instalasi PHP" />
                    <SiswaCard name="Selasa,12 Oktober 2023" kelas="Belajar Instalasi PHP" />
                </div>
            </WhiteTemplate>
        </div>
    );
}