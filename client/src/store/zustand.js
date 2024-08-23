import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useStore = create((set) => ({
    movie: null,
    loading: true,
    getMovie: (movie) => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${movie}`).then(({ data }) => set(() => ({ movie: data }))).finally(() => set(() => ({ loading: false })))
}));

export const usePlayer = create(persist((set) => ({
    language: 'uz',
    setLanguage: (is) => set(() => ({ language: is })),
    quality: '720p',
    setQuality: (is) => set(() => ({ quality: is })),
    speed: 'normal',
    setSpeed: (is) => set(() => ({ speed: is })),
    currentTime: 0,
    setCurrentTime: (time) => set(() => ({ currentTime: time })),
    duration: 0,
    setDuration: (time) => set(() => ({ duration: time })),
    volume: 1,
    setVolume: (volau) => set(() => ({ volume: volau })),
}), { name: 'player', version: 1 }))