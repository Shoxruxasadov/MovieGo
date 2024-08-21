import { create } from "zustand";
import axios from "axios";

export const useStore = create((set) => ({
    language: 'uz',
    setLanguage: (is) => set(() => ({ isClicked: is })),
    movie: null,
    loading: true,
    getMovie: (movie) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${movie}`).then(({ data }) => set(() => ({ movie: data }))).finally(() => set(() => ({ loading: false })))
}));

export const usePlayer = create((set) => ({

}));