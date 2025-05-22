import TambahDataGuruPembimbing from "@/components/admin/TambahDataGuruPembimbing";
import Banner from "@/components/admin/Banner";
import WhiteTemplate from "@/components/WhiteTemplate";

export default function TambahData() {
  return (
    <div className="w-full">
      <Banner title="Tambah Data Siswa" />
      <WhiteTemplate>
        <TambahDataGuruPembimbing />
      </WhiteTemplate>
    </div>
  );
}
