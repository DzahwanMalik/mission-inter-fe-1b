import axios from "axios";

const axiosTMDB = axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
});

export default axiosTMDB;
