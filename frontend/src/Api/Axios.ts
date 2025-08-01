import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://notely-1-s8es.onrender.com",
    withCredentials: true
})

export default axiosInstance;
// https://notely-1-s8es.onrender.com