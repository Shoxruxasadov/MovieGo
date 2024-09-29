import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useStore = create((set) => ({
    link: '/',
    title: null,
    movie: null,
    studio: null,
    related: null,
    allMovies: null,
    setLink: link => set(() => ({ link: link })),
    getMovie: movie => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${movie}`).then(({ data }) => set(() => ({ movie: data, title: data ? data.title : null }))),
    getStudio: module => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/studios/${module}`).then(({ data }) => set(() => ({ studio: data, title: data[0].studio.name }))),
    getRelated: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/random`).then(({ data }) => set(() => ({ related: data }))),
    getAllMovies: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies`, { headers: { 'type': 'all' } }).then(({ data }) => set(() => ({
        allMovies: data,
        title: {
            uz: "Barcha Filmlar",
            ru: "Все Фильмы",
            en: "All Movies"
        }
    }))),
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