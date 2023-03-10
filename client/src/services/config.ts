import axios from "axios";

const serverUrl = "http://localhost:3001";

export const axiosInstance = axios.create({
    baseURL: serverUrl,
});
