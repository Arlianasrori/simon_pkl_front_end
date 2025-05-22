import TambahDataDudi from "@/components/admin/TambahDataDudi";
import Banner from "@/components/admin/Banner";
import WhiteTemplate from "@/components/WhiteTemplate";

export default function TambahData() {
  return (
    <div className="w-full">
      <Banner title="Tambah Data Dudi" />
      <WhiteTemplate>
        <TambahDataDudi />
      </WhiteTemplate>
    </div>
  );
}
