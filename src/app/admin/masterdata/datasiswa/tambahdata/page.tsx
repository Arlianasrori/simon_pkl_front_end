import TambahDataSiswa from "@/components/admin/TambahDataSiswa";
import Banner from "@/components/admin/Banner";
import WhiteTemplate from "@/components/WhiteTemplate";

export default function TambahData() {
  return (
    <div className="w-full">
      <Banner title="Tambah Data Siswa" />
      <WhiteTemplate>
        <TambahDataSiswa />
      </WhiteTemplate>
    </div>
  );
}
