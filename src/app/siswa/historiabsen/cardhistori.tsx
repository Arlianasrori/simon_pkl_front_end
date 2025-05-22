import { AbsenIcon} from "@/components/icons/icons";

export default function CardHistori({tanggal,status_absen_pulang}:{tanggal:string,status_absen_pulang:string}) {
    return (
        <div className="flex justify-around p-2 gap-2 bg-white rounded-lg shadow-md">
            <div className=" rounded-lg">
                <AbsenIcon />
            </div>
            <div className="flex flex-col items-center">
                <h5 className="font-semibold">{tanggal}</h5>
                <p>{status_absen_pulang}</p>
            </div>
            <div></div>
        </div>
    );
}