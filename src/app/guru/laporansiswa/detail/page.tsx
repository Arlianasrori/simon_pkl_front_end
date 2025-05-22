import { LaporanIcon, WhatsappIcon } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import Link from "next/link";

export default function DetailLaporanSiswa() {
    return (
        <div>
            <WhiteTemplate>
                <div className="bg-accentColor p-5 rounded-md flex text-white flex-col items-center justify-center">
                    <LaporanIcon />
                    <h4 className="font-semibold text-lg">Senin, 12 Januari 2023</h4>
                    <p>Oleh : Habil Arlian Asrori</p>
                    <div className="bg-white flex flex-col items-center gap-3 text-black w-[100%] p-5 rounded-md">
                        <p>Topik Pekerjaan : </p>
                        <h3 className="font-bold">Belajar Instalasi PHP</h3>
                        <p>Rujukan Kompetensi Dasar : </p>
                        <h3 className="font-bold">Pemrograman Web</h3>
                        <p>Instansi Terkait : </p>
                        <h3 className="font-bold">CV. Global Vintage Numeration</h3>
                        <p>Bukti Dokumen (Opsional) : </p>

                    </div>
                    <Link className="bg-white text-accentColor w-[100%] text-center mt-5 p-3 rounded-md" href="/guru/laporansiswa">Kembali Ke Beranda</Link>
                    <Link className="bg-accentColor text-white w-[100%] text-center border-white border-2 mt-2  p-3 rounded-md" href="https://wa.me/6287865728448">
                        <div className="flex items-center justify-center">
                            <WhatsappIcon />
                            Hubungi Siswa Ini
                        </div>
                    </Link>
                </div>
            </WhiteTemplate>
        </div>
    )
}