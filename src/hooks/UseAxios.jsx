import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://assignment-12-server-nine-topaz.vercel.app/`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;