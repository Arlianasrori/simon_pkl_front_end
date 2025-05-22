import { DoneIcon, NotDone, ProfileBlue, RightArrow, TandaSeru } from "@/components/icons/icons";
import Link from "next/link";

export default function SiswaCard({ name, kelas, variant, url }: { name: string, kelas: string, variant: string, url: string }) {
    return (
        <Link href={url} className="w-full">
            <div className="flex justify-between p-2 gap-2 bg-white rounded-lg shadow-md">
                <div className="">
                    {variant == "done" ? <DoneIcon /> : variant == "profile" ? <ProfileBlue /> : variant == "proses" ? <TandaSeru /> : variant == "diterima" ? <DoneIcon /> : <NotDone />}
                </div>
                <div className="">
                    <h5 className="font-semibold">{name}</h5>
                    <p>{kelas}</p>
                </div>
                <RightArrow />
            </div>
        </Link>
    )
}

export function SiswaDudi({ name, kelas, url }: { name: string, kelas: string, url: string }) {
    return (
        <Link href={url} className="w-full">
            <div className="flex my-1 justify-between p-2 gap-2 bg-white rounded-lg shadow-md">
                <div className="border-3 border-accentColor p-1 rounded-full">
                    <ProfileBlue />
                </div>
                <div className="flex flex-col items-center">
                    <h5 className="font-semibold">{name}</h5>
                    <p>{kelas}</p>
                </div>
                <RightArrow />
            </div>
        </Link>
    )
}