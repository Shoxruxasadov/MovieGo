import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
//   headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getCookie("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
