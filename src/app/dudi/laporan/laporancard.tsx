import { DoneIcon, RightArrow } from "@/components/icons/icons";
import Link from "next/link";

export default function SiswaCard({name,kelas}:{name:string,kelas:string}) {
    return (
    <Link href={`/guru/laporansiswa/detail`} className="w-full">
        <div className="flex justify-between p-3 gap-2 bg-white rounded-lg shadow-md">
            <DoneIcon />
            <div className="">
                <h5 className="font-bold">{name}</h5>
                <p>{kelas}</p>
            </div>
            <RightArrow />
        </div>
    </Link>
    )
}