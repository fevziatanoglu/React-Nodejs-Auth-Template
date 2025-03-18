import axios from "axios";
import useStore from "../store";

const requestApi = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
});

requestApi.interceptors.request.use((config) => {
    const token = useStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});


export default requestApi;
