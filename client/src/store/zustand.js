import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useStore = create((set) => ({
    movie: null,
    getMovie: movie => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${movie}`).then(({ data }) => set(() => ({ movie: data, title: data.title.en }))),
    module: null,
    getModule: module => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/modules/${module}`).then(({ data }) => set(() => ({ module: data, title: data[0].studio }))),
    title: null,
}));

export const useUser = create(persist((set) => ({
    user: null,
    setUser: user => set(() => ({ user: user })),
    getUser: token => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/id`, { headers: { 'id': token } }).then(({ data }) => set(() => ({ user: data }))),
}), { name: 'user', version: 1 }))

export const usePlayer = create(persist((set) => ({
    language: 'uz',
    setLanguage: is => set(() => ({ language: is })),
    quality: '720p',
    setQuality: is => set(() => ({ quality: is })),
    speed: 'normal',
    setSpeed: is => set(() => ({ speed: is })),
    currentTime: 0,
    setCurrentTime: time => set(() => ({ currentTime: time })),
    duration: 0,
    setDuration: time => set(() => ({ duration: time })),
    volume: 1,
    setVolume: volue => set(() => ({ volume: volue })),
}), { name: 'player', version: 1 }))