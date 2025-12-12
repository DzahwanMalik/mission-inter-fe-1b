import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mission-inter-fe-1b.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
