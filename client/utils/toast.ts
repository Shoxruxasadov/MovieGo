import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultOptions: ToastOptions = {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

const showToast = (type: "success" | "error" | "warn" | "info", text: string, autoClose = 3000) => {
    toast[type](text, { ...defaultOptions, autoClose });
};

export const warn = (text: string) => showToast("warn", text);
export const wrong = (text: string) => showToast("error", text);
export const success = (text: string) => showToast("success", text, 500);
export const info = (text: string) => showToast("info", text, 1000);