import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api_uri = import.meta.env.VITE_API_URL;

export const api = axios.create({ baseURL: api_uri });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
