export default interface PlayerStore {
  language: string;
  setLanguage: (lang: string) => void;
  quality: string;
  setQuality: (quality: string) => void;
  speed: string | number;
  setSpeed: (speed: string | number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
}