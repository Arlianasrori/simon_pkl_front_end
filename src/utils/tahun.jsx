import create from "zustand";

// Buat store Zustand
const useTahunStore = create((set) => ({
  tahun: 2024, // State awal

  // Getter untuk mengambil nilai tahun
  getTahun: () => set((state) => ({ tahun: state.tahun })),

  // Setter untuk mengubah nilai tahun
  setTahun: (value) => set(() => ({ tahun: value })),
}));

export default useTahunStore;