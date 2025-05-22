import { RightArrow, TandaSeru } from "@/components/icons/icons";

export default function CardLaporan({name,kendala}:{name:string,kendala:string}) {
    return (
        <div className="flex justify-between p-2 gap-2 bg-white rounded-lg shadow-md">
            <div className="border-1 border-black rounded-lg">
                <TandaSeru />
            </div>
            <div className="flex flex-col items-center">
                <h5 className="font-semibold">{name}</h5>
                <p>{kendala}</p>
            </div>
            <RightArrow />
        </div>
    );
}