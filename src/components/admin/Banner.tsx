import Image from "next/image";

export default function Banner({ title }: { title: string }) {
  return (
    <div className=" fixed right-0 top-[10vh] w-[80.5vw] mb-5 h-[10vh] flex">
      <div className=" fixed right-0 top-[10vh] w-[82%] h-[10vh] flex">
        <div className="absolute top-0 py-3 px-10 w-full h-full left-0 bg-gradient-to-r from-white from-40% via-white-66 via-[54%] to-white-60 to-100% flex flex-col overlay">
          <h1 className=" text-2xl font-bold">{title}</h1>
          <p className="text-sm">Monitoring PKL Siswa SMKN 2 Mataram</p>
        </div>
        <Image
          src={"/images/bannerSMKN2.png"}
          alt="logo"
          width={100}
          height={100}
          sizes="100vw"
          className="w-[82vw] h-[10vh] block"
        />
      </div>
    </div>
  );
}
