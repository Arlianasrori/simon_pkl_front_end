import Banner from "@/components/admin/Banner";
import { KendalaMerah } from "@/components/icons/icons";
import WhiteTemplate from "@/components/WhiteTemplate";
import {  FaArrowRight } from "react-icons/fa";

export default function LaporanDudi() {
    return (
        <div>
            <Banner title="Laporan DU/DI" />

            <WhiteTemplate>
                <div className="flex justify-between items-center border-2 p-3 rounded-xl border-gray-700">
                    <KendalaMerah />
                    <div className="flex justify-center flex-col items-center">
                        <h1 className="font-bold">Sulaiman</h1>
                        <p>Keterangan : Disuruh Bikin Kopi</p>
                    </div>
                    <FaArrowRight size={20}></FaArrowRight>
                </div>
            </WhiteTemplate>
        </div>

    );
}