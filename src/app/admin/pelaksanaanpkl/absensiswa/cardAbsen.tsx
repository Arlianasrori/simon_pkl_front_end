import { ProfileBlue } from "@/components/icons/icons";

export default function CardAbsen({nama,tanggal,status}:{nama:string,tanggal:string,status:string}) {
    return (
        <div className="bg-white rounded-lg  pl-18 relative shadow-md">
            <div className="absolute left-1 top-1 border p-1 border-accentColor rounded-full">
                <ProfileBlue />
            </div>
            <h4>{nama}</h4>
            <p>{tanggal}</p>
            <p className="font-bold">{status}</p>
        </div>
    )
}