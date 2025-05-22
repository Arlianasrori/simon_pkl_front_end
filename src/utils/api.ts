const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2008";

const isBrowser = typeof window !== "undefined";
const tahun = isBrowser && localStorage.getItem("tahun") ? localStorage.getItem("tahun") : "789631";
const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;
const page = 1;

export const tambahPage = (page: number) => page + 1;
export const kurangPage = (page: number) => page - 1;

export const API_ENDPOINTS = {
  getUsers: `${API_BASE_URL}/users/`,
  getPosts: `${API_BASE_URL}/posts`,
  adminGetSiswa: `${ADMIN_BASE_URL}/siswa?page=${page}&id_tahun=${tahun}`,
  adminGetGuruPembimbing: `${ADMIN_BASE_URL}/guru-pembimbing?page=1&id_tahun=${tahun}`,
  adminGetDudi: `${ADMIN_BASE_URL}/dudi?page=${page}&id_tahun=${tahun}`,
  adminGetAbsen: `${ADMIN_BASE_URL}/absen?page=1&id_tahun=${tahun}`,
};

export default API_BASE_URL;