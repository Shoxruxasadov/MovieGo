import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/library/axios";
import MovieStore from "@/types/store/movies.store";
import MovieDto from "@/types/movies/movies.dto";
import UserStore from "@/types/store/user.store";
import UserDto from "@/types/users/user.dto";
import PlayerStore from "@/types/store/player.store";
import SidebarStore from "@/types/store/sidebar.store";

export const useStore = create<MovieStore>((set) => ({
  movie: null,
  related: null,
  getMovie: async (movieId) => {
    const { data } = await api.get<MovieDto>(`/movies/${movieId}`);
    set(() => ({ movie: data }));
  },
  getRelated: async () => {
    const { data } = await api.get<MovieDto[]>(`/movies/random`);
    set(() => ({ related: data }));
  },
}));

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  getUser: async (token) =>
    await api
      .get<UserDto>(`/users/id`, { headers: { id: token } })
      .then(({ data }) => set(() => ({ user: data }))),
}));

export const usePlayer = create<PlayerStore>()(
  persist(
    (set) => ({
      language: "uz",
      setLanguage: (lang) => set(() => ({ language: lang })),
      quality: "720p",
      setQuality: (quality) => set(() => ({ quality })),
      speed: "normal",
      setSpeed: (speed) => set(() => ({ speed })),
      currentTime: 0,
      setCurrentTime: (time) => set(() => ({ currentTime: time })),
      duration: 0,
      setDuration: (time) => set(() => ({ duration: time })),
      volume: 1,
      setVolume: (volume) => set(() => ({ volume })),
    }),
    { name: "player", version: 1 }
  )
);

export const useSidebar = create<SidebarStore>((set) => ({
  position: 0,
  setPosition: (position) => set({ position }),
  opacity: 1,
  setOpacity: (opacity) => set({ opacity }),
  positionLng: 4,
  setPositionLng: (positionLng) => set({ positionLng }),
}));
