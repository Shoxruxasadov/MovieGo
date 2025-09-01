import React, { useEffect, useMemo, useRef, useState } from "react";
import { isMobile, isIOS } from "react-device-detect";
// import { useRouter } from 'next/navigation' // <- TSX: foydalanilmayapti, warning bermasligi uchun olib tashladim
import styled from "styled-components";
import classNames from "classnames";

import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa6";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { HiBackward, HiForward } from "react-icons/hi2";

import SceletLoading from "@/components/loading/loading";
import { usePlayer, useStore } from "@/store/zustand";
import { useTranslation } from "react-i18next";

/**
 * TS Types
 */
type Lang = "uz" | "ru" | "en";
type Qual = "2160p" | "1080p" | "720p";

type ImageLike =
  | { preview: string }
  | { url: string }
  | Record<string, unknown>;

type FlatSource = Partial<Record<Qual | Lang, string>>;
type SourceMatrix = { [Q in Qual]?: Partial<Record<Lang, string>> };

type SourceUnion = FlatSource | SourceMatrix | null;
type Movie = {
  source: SourceUnion;
  image?: ImageLike;
} | any;

interface PercentProps {
  percent: number;
}
interface MoveProps {
  move: number;
}

// styled-components’ga generic propslar berildi:
const RangeTime = styled.div<PercentProps>`width: ${(props) => props.percent}%!important;`; // <- TSX: props tipini berdim
const RangeVolume = styled.div<PercentProps>`width: ${(props) => props.percent}%!important;`; // <- TSX: props tipini berdim
const BadgePosition = styled.span<MoveProps>`left: ${(props) => props.move}px!important;`; // <- TSX: props tipini berdim

export default function MoviesPlayer(): JSX.Element {
  const setLanguage = usePlayer((state) => state.setLanguage) as (l: Lang) => void; // <- TSX: funksiya tiplari
  const setQuality = usePlayer((state) => state.setQuality) as (q: Qual) => void;  // <- TSX
  const setSpeed = usePlayer((state) => state.setSpeed) as (s: string) => void;    // <- TSX
  const setCurrentTime = usePlayer((state) => state.setCurrentTime) as (n: number) => void; // <- TSX
  const setDuration = usePlayer((state) => state.setDuration) as (n: number) => void;       // <- TSX
  const setVolume = usePlayer((state) => state.setVolume) as (n: number) => void;           // <- TSX

  const language = usePlayer((state) => state.language) as Lang;   // <- TSX
  const quality = usePlayer((state) => state.quality) as Qual;     // <- TSX
  const speed = usePlayer((state) => state.speed) as string;       // <- TSX
  const currentTime = usePlayer((state) => state.currentTime) as number; // <- TSX
  const duration = usePlayer((state) => state.duration) as number;       // <- TSX
  const volume = usePlayer((state) => state.volume) as number;           // <- TSX
  const movie = (useStore((state) => state.movie) as Movie) || {};       // <- TSX: null safety

  console.log(movie);

  const [currentTimeChanged, setCurrentTimeChanged] = useState<number>(0);
  const [currentTimeView, setCurrentTimeView] = useState<string>("00:00");
  const [durationView, setDurationView] = useState<string>("0:00:00");
  const [badgePosition, setBadgePosition] = useState<number>(0);
  const [loadingMovie, setLoadingMovie] = useState<boolean>(true);
  const [skipWrapper, setSkipWrapper] = useState<boolean>(false);
  const [accessible, setAccessible] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [percentTime, setPercentTime] = useState<number>(0);
  const [controls, setControls] = useState<boolean>(true);
  const [rangeTime, setRangeTime] = useState<number>(0);
  const [badgeTime, setBadgeTime] = useState<string | number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean | null>(null); // <- TSX: tip qo‘ydim
  const [reload, setReload] = useState<boolean>(false);
  const [list, setList] = useState<"main" | "language" | "quality" | "speed">("main"); // <- TSX: string union

  // === REFS ===

  const progressRef = useRef<HTMLDivElement | null>(null); // <- TSX: ref tiplari
  const playBtnRef = useRef<HTMLButtonElement | null>(null); // <- TSX
  const playerRef = useRef<HTMLDivElement | null>(null); // <- TSX
  const videoRef = useRef<HTMLVideoElement | null>(null); // <- TSX
  const pendingSeekRef = useRef<number | null>(null);  // qaerga qaytish kerak

  const audioRef = useRef<HTMLAudioElement | null>(null);        // <- audio element
  const driftTimerRef = useRef<number | null>(null);             // <- drift interval
  const [audioSwitching, setAudioSwitching] = useState(false);         // <- YANGI
  const wasPlayingRef = useRef(false);                                 // <- til almashishdan oldingi holat
  const DRIFT_TOLERANCE = isIOS ? 0.75 : 0.30;
  const DRIFT_CHECK_MS = isIOS ? 1000 : 250;

  const readyEnough = (m: HTMLMediaElement) => m.readyState >= 2;

  const { t } = useTranslation();

  const [languageChanger, setLanguageChanger] = useState<boolean>(true);
  const [qualityChanger, setQualityChanger] = useState<boolean>(true);

  const [isHovering, setIsHovered] = useState<boolean>(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  // VIDEO URL resolver: flat / matrix / string hammasini qo‘llaydi
  const resolveVideoSrc = (source: SourceUnion, q: Qual, l: Lang): string | undefined => {
    if (!source) return undefined;
    if (typeof source === "string") return source;

    // FLAT: source["1080p"] = "video-only.mp4"
    const maybeFlatQ = (source as FlatSource)[q];
    if (typeof maybeFlatQ === "string" && maybeFlatQ) return maybeFlatQ;

    // MATRIX: source["1080p"] = { uz: "...", ru: "..." }
    const asMatrix = source as SourceMatrix;
    const byQ = asMatrix[q];
    if (byQ && typeof byQ === "object") {
      return byQ[l] || byQ.uz || byQ.ru || byQ.en;
    }
    return undefined;
  };

  // AUDIO URL resolver: FLAT ichidan til bo‘yicha olamiz
  const resolveAudioSrc = (source: SourceUnion, l: Lang): string | undefined => {
    if (!source || typeof source === "string") return undefined; // string bo‘lsa bu video-only
    const s = source as FlatSource;                               // FLAT: { uz, ru, en, 2160p, ... }
    return s[l] || s.uz || s.ru || s.en;
  };

  // VIDEO
  const videoSrc = useMemo(
    () => (reload ? resolveVideoSrc(movie.source, quality, language) : undefined),
    [reload, movie.source, quality, language]
  );

  // AUDIO
  const audioSrc = useMemo(
    () => resolveAudioSrc(movie.source, language),
    [movie.source, language]
  );

  const hasVideo = !!videoSrc;
  const hasAudio = !!audioSrc;

  const videoStyle = useMemo(
    () => (currentTime === 0 ? ({ visibility: "hidden" } as const) : {}),
    [currentTime]
  ); // <- TSX: as const bilan type inference

  const playerStyle = useMemo<React.CSSProperties>(() => {
    const img =
      movie?.image && "preview" in (movie.image as any)
        ? (movie.image as any).preview
        : undefined;
    if (currentTime === 0 && img) {
      return { backgroundImage: `url(${img})` };
    }
    return {};
  }, [currentTime, movie]);

  const syncAudioToVideo = (hard = false) => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;

    a.playbackRate = v.playbackRate;
    a.volume = v.volume;
    a.muted = v.muted || v.volume === 0;

    if (!readyEnough(v) || !readyEnough(a)) return;

    const drift = Math.abs((a.currentTime || 0) - (v.currentTime || 0));
    if (hard || drift > DRIFT_TOLERANCE) a.currentTime = v.currentTime;
  };

  const startDriftLoop = () => {
    if (driftTimerRef.current) window.clearInterval(driftTimerRef.current);
    driftTimerRef.current = window.setInterval(() => syncAudioToVideo(false), DRIFT_CHECK_MS);
  };
  const stopDriftLoop = () => {
    if (driftTimerRef.current) {
      window.clearInterval(driftTimerRef.current);
      driftTimerRef.current = null;
    }
  };
  useEffect(() => () => stopDriftLoop(), []); // <- cleanup

  const options = [
    { label: t("movie.language"), value: language, list: "language" as const },
    { label: t("movie.quality"), value: quality, list: "quality" as const },
    { label: t("movie.speed"), value: speed === "normal" ? t("movie.normal") : speed, list: "speed" as const },
  ];
  const languages: Array<{ value: Lang }> = [{ value: "uz" }, { value: "ru" }, { value: "en" }];
  const qualities: Array<{ value: Qual; badge: string }> = [
    { value: "2160p", badge: "4K" },
    { value: "1080p", badge: "FHD" },
    { value: "720p", badge: "HD" },
  ];
  const speeds = [
    { label: "0.25x", value: 0.25 },
    { label: "0.5x", value: 0.5 },
    { label: "0.75x", value: 0.75 },
    { label: t("movie.normal"), value: 1 },
    { label: "1.25x", value: 1.25 },
    { label: "1.5x", value: 1.5 },
    { label: "1.75x", value: 1.75 },
    { label: "2x", value: 2 },
  ];

  function selectLanguage(source: Partial<Record<Lang, string>>, preferredLanguage: Lang): Lang | null {
    const availableLanguages: Lang[] = ["uz", "ru", "en"];
    for (const lang of [preferredLanguage, ...availableLanguages]) {
      if (source[lang]) return lang;
    }
    return null;
  }
  function selectQuality(source: SourceMatrix): Qual | null {
    const order: Qual[] = isIOS ? ["1080p", "720p", "2160p"] : ["2160p", "1080p", "720p"];
    for (const q of order) if (source[q]) return q;
    return null;
  }

  /**
   * JSX’da render ichida setState bor edi (languageChanger/qualityChanger),
   * bu React anti-pattern. Uni `useEffect`ga ko‘chirdim. // <-
   */
  useEffect(() => {
    if (!movie?.source || typeof movie.source === "string") return;
    if (qualityChanger) {
      const newQuality = selectQuality(movie.source as SourceMatrix);
      if (newQuality) setQuality(newQuality);
      setQualityChanger(false);
    }
  }, [movie, qualityChanger, setQuality]);

  useEffect(() => {
    if (!movie?.source) return;
    if (languageChanger) {
      const currentSource = (movie.source as SourceMatrix)[quality];
      if (currentSource) {
        const newLanguage = selectLanguage(currentSource as any, language);
        if (newLanguage) setLanguage(newLanguage);
      }
      setLanguageChanger(false);
    }
  }, [movie, quality, language, languageChanger, setLanguage]);

  const handleVideo = async (e?: React.MouseEvent<HTMLElement>) => {
    if (!hasVideo) return; // <- Coming soon holatida hech narsa qilmaymiz

    const v = videoRef.current;
    const a = audioRef.current;
    setPlaying(prev => !prev);
    if (!v) return;

    if (playing) {
      setPlaying(false);
      v.pause();
      a?.pause();
      stopDriftLoop();
    } else {
      try {
        syncAudioToVideo(true);
        const tasks: Promise<any>[] = [v.play()];
        if (hasAudio && a) tasks.push(a.play());
        await Promise.allSettled(tasks);
        setPlaying(true);
        startDriftLoop();
      } catch {
        v.pause(); a?.pause();
        setPlaying(false);
      }
    }
    if (e && (e as any).detail === 2) makeFullScreen();
  };

  const skippedTimeoutRef = useRef<number | null>(null); // <- TSX: clearTimeout’ni to‘g‘ri ishlatish uchun ref

  const skip = (move: "backward" | "forward") => {
    if (!videoRef.current) return;
    if (move === "backward") {
      setSkipped(false);
      videoRef.current.currentTime -= 10;
      setCurrentTime(videoRef.current.currentTime);
    }
    if (move === "forward") {
      setSkipped(true);
      videoRef.current.currentTime += 10;
      setCurrentTime(videoRef.current.currentTime);
    }
    if (skippedTimeoutRef.current) window.clearTimeout(skippedTimeoutRef.current); // <- TSX: tozalash
    skippedTimeoutRef.current = window.setTimeout(() => setSkipped(null), 1000); // <- TSX
  };

  const timeUpdate = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const el = event.currentTarget;
    if (!el.duration) return;
    setPercentTime((el.currentTime / el.duration) * 100);
    setCurrentTime(el.currentTime);
    makeCurrentTime(el.currentTime); // <- TSX: argument qabul qilishga mos qildim
  };

  const loadedMovie = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const el = event.currentTarget;
    setDuration(el.duration || 0);
    setLoadingMovie(false);
  };

  const volumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;

    const val = Math.max(0, Math.min(1, Number(event.target.value)));

    v.volume = val;
    v.muted = val === 0;
    setVolume(val);

    if (a) {
      a.volume = val;
      a.muted = v.muted;
    }
  };

  const rangeTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(event.target.value);
    if (!videoRef.current || !videoRef.current.duration) return;
    videoRef.current.currentTime = val;
    setPercentTime((val * 100) / videoRef.current.duration);
    setRangeTime(val);
    setCurrentTime(val);
    makeCurrentTime(val); // <- TSX
  };

  const makeCurrentTime = (time: number) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor(time / 60) % 60;
    const second = Math.floor(time % 60);
    const makeHour = hour === 0 ? "" : `${hour}:`;
    const makeMinute = minute < 10 ? `0${minute}` : String(minute);
    const makeSecond = second < 10 ? `0${second}` : String(second);
    setCurrentTimeView(`${makeHour}${makeMinute}:${makeSecond}`);
  };

  const makeDuration = (total: number) => {
    const hour = Math.floor(total / 3600);
    const minute = Math.floor(total / 60) % 60;
    const second = Math.floor(total % 60);
    const makeHour = hour === 0 ? "" : `${hour}:`;
    const makeMinute = minute < 10 ? `0${minute}` : String(minute);
    const makeSecond = second < 10 ? `0${second}` : String(second);
    setDurationView(`${makeHour}${makeMinute}:${makeSecond}`);
  };

  const handleLanguage = (lng: Lang) => {
    setList("main");
    if (lng === language) return;

    const v = videoRef.current;
    wasPlayingRef.current = !!v && !v.paused;
    pendingSeekRef.current = v?.currentTime ?? currentTime;

    setLoadingMovie(true);
    v?.pause();
    setPlaying(false);
    setAudioSwitching(true);

    setLanguage(lng);
  };

  const handleQuality = (q: Qual) => {
    setList("main");
    if (q === quality) return;

    // hozirgi holatni saqlab qo'yamiz
    const v = videoRef.current;
    wasPlayingRef.current = !!v && !v.paused;
    pendingSeekRef.current = v?.currentTime ?? currentTime;

    setLoadingMovie(true);
    v?.pause();
    audioRef.current?.pause();
    setPlaying(false);
    setAudioSwitching(true); // audio sync jarayoni

    setQuality(q);
  };

  const handleSpeed = (spd: number) => {
    setList("main");
    if (videoRef.current) videoRef.current.playbackRate = spd;
    if (spd === 1) setSpeed("normal");
    else setSpeed(`${spd}x`);
  };

  const makeVolume = () => {
    if (!videoRef.current) return;
    if (videoRef.current.volume === 0) {
      videoRef.current.volume = 1;
      setVolume(1);
    } else {
      videoRef.current.volume = 0;
      setVolume(0);
    }
  };

  const menuSize = (menu: "quality" | "language" | "speed" | "main") => {
    const s = movie?.source as Partial<Record<Qual | Lang, string>> | undefined; // <- flat source

    switch (menu) {
      case "language": {
        const count = (["uz", "ru", "en"] as Lang[]).filter((l) => !!s?.[l]).length; // <- flat: source.uz/ru/en
        if (count <= 1) return " unity";
        if (count < 3) return " dual";
        return "";
      }
      case "quality": {
        const count = (["2160p", "1080p", "720p"] as Qual[]).filter((q) => !!s?.[q]).length; // <- flat: source["1080p"]
        if (count <= 1) return " unity";
        if (count < 3) return " dual";
        return "";
      }
      default:
        return "";
    }
  };

  const makeFullScreen = () => {
    const fullscreenBtn = document.getElementById("fullscreen") as HTMLButtonElement | null;
    if (document.fullscreenElement) {
      setFullscreen(false);
      fullscreenBtn?.blur();
      void document.exitFullscreen();
      return;
    }
    setFullscreen(true);
    fullscreenBtn?.blur();
    playerRef.current?.requestFullscreen(); // <- TSX: optional chaining
    if (!playing) handleVideo();
  };

  const formatTime = (time: number) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor(time / 60) % 60;
    const second = Math.floor(time % 60);
    const makeHour = hour <= 0 ? "" : `${hour}:`;
    const makeMinute = minute < 10 ? `0${minute < 0 ? 0 : minute}` : String(minute);
    const makeSecond = second < 10 ? `0${second < 0 ? 0 : second}` : String(second);
    setBadgeTime(`${makeHour}${makeMinute}:${makeSecond}`);
  };

  const hideControls = () => {
    // document.fullscreenElement o‘zgarmasdan window.document.fullscreen ishlatilgan edi
    // TS/DOM spec bo‘yicha `fullscreenElement` to‘g‘ri. // <-
    if (!playing || (isHovering && !document.fullscreenElement)) return setControls(true);
    setControls(false);
    setAccessible(false);
    setList("main");
  };

  useEffect(() => {
    setCurrentTime(0);
    const t = window.setTimeout(() => setReload(true), 500);
    return () => window.clearTimeout(t);
  }, [setCurrentTime]);

  useEffect(() => {
    const onFsChange = () => {
      setFullscreen(!!document.fullscreenElement);
      if (document.fullscreenElement) playBtnRef.current?.focus();
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current, a = audioRef.current;
    if (!v) return;
    const onErr = () => console.log('VIDEO ERROR', v.error);
    const onAE = () => console.log('AUDIO ERROR', a?.error);
    v.addEventListener('error', onErr);
    a?.addEventListener('error', onAE);
    return () => { v.removeEventListener('error', onErr); a?.removeEventListener('error', onAE); };
  }, []);

  useEffect(() => {
    // === Key === \\
    const handleKeyPress = ({ keyCode }: KeyboardEvent) => {
      if (!document.fullscreenElement || !videoRef.current) return;
      switch (keyCode) {
        case 39: {
          videoRef.current.currentTime += 10;
          setCurrentTime(videoRef.current.currentTime);
          setSkipped(true);
          if (skippedTimeoutRef.current) clearTimeout(skippedTimeoutRef.current);
          skippedTimeoutRef.current = window.setTimeout(() => setSkipped(null), 1000);
          break;
        }
        case 37: {
          videoRef.current.currentTime -= 10;
          setCurrentTime(videoRef.current.currentTime);
          setSkipped(false);
          if (skippedTimeoutRef.current) clearTimeout(skippedTimeoutRef.current);
          skippedTimeoutRef.current = window.setTimeout(() => setSkipped(null), 1000);
          break;
        }
        case 38: {
          const volumeUp = Math.min((videoRef.current.volume ?? 0) + 0.1, 1);
          videoRef.current.volume = volumeUp;
          setVolume(volumeUp);
          break;
        }
        case 40: {
          const volumeDown = Math.max((videoRef.current.volume ?? 0) - 0.1, 0);
          videoRef.current.volume = volumeDown;
          setVolume(volumeDown);
          break;
        }
        case 32: {
          setPlaying((prev) => {
            const isPlaying = !prev;
            isPlaying ? videoRef.current?.play() : videoRef.current?.pause();
            return isPlaying;
          });
          break;
        }
        default:
          break;
      }
    };

    // == Mouse == \\
    let timeoutId: number | null = null;
    const handleMouseMove = () => {
      if (document.fullscreenElement) {
        setControls(true);
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          setControls(false);
          setAccessible(false);
          setList("main");
        }, 2000);
      }
    };

    document.addEventListener("keyup", handleKeyPress);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("keyup", handleKeyPress);
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [setVolume]);

  useEffect(() => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v) return;

    const onPlay = async () => {
      if (hasAudio && a && a.paused) a.play().catch(() => { });
      startDriftLoop();
    };
    const onPause = () => { a?.pause(); stopDriftLoop(); };
    const onSeeking = () => { if (a) a.currentTime = v.currentTime; };
    const onRateChange = () => { if (a) a.playbackRate = v.playbackRate; };
    const onVolumeChange = () => {
      if (!a) return;
      a.volume = v.volume;
      a.muted = v.muted || v.volume === 0;
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("ratechange", onRateChange);
    v.addEventListener("volumechange", onVolumeChange);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("ratechange", onRateChange);
      v.removeEventListener("volumechange", onVolumeChange);
    };
  }, [hasAudio]);

  // useEffect(() => {
  //   const v = videoRef.current;
  //   if (v && videoSrc) v.load();
  // }, [videoSrc]);

  useEffect(() => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;

    if (!audioSrc) {
      setAudioSwitching(false);
      setLoadingMovie(false);
      return;
    }

    // yangi audio src’ni tayyorlaymiz
    a.src = audioSrc;
    a.currentTime = v.currentTime;
    a.playbackRate = v.playbackRate;
    a.volume = v.volume;
    a.muted = v.muted || v.volume === 0;

    const onWaiting = () => setLoadingMovie(true);
    const onStalled = () => setLoadingMovie(true);
    const onError = () => {
      setAudioSwitching(false);
      setLoadingMovie(false);
    };

    const onCanPlay = async () => {
      try {
        if (wasPlayingRef.current) {
          await a.play();
          await v.play();
          setPlaying(true);
        }
      } finally {
        setAudioSwitching(false);
        setLoadingMovie(false);
      }
    };

    a.addEventListener("waiting", onWaiting);
    a.addEventListener("stalled", onStalled);
    a.addEventListener("error", onError);
    a.addEventListener("canplay", onCanPlay);

    a.load();

    return () => {
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("stalled", onStalled);
      a.removeEventListener("error", onError);
      a.removeEventListener("canplay", onCanPlay);
    };
  }, [audioSrc]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadedMeta = async () => {
      // seek
      const seekTo = pendingSeekRef.current ?? currentTimeChanged ?? 0;
      if (!Number.isNaN(seekTo) && seekTo > 0) {
        try {
          v.currentTime = Math.min(seekTo, v.duration || seekTo);
        } catch { /* ignore */ }
      }

      // audio bilan sinxron
      if (hasAudio && audioRef.current) {
        const a = audioRef.current;
        a.currentTime = v.currentTime;
        a.playbackRate = v.playbackRate;
        a.volume = v.volume;
        a.muted = v.muted || v.volume === 0;
      }

      // avval play bo'lgan bo'lsa, qayta davom ettiramiz
      if (wasPlayingRef.current) {
        try {
          await v.play();
          if (hasAudio && audioRef.current) {
            await audioRef.current.play();
          }
          setPlaying(true);
        } catch { /* autoplay blocking */ }
      }

      setAudioSwitching(false);
      setLoadingMovie(false);
    };

    v.addEventListener("loadedmetadata", onLoadedMeta);
    return () => v.removeEventListener("loadedmetadata", onLoadedMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc, hasAudio]);

  useEffect(() => {
    makeDuration(duration);
  }, [duration]); // <- TSX: duration argument bilan

  useEffect(() => {
    setControls(true);
  }, [isHovering]);

  useEffect(() => {
    if (skipped === true || skipped === false) {
      setSkipWrapper(true);
    }
    if (skipped === null) {
      const id = window.setTimeout(() => setSkipWrapper(false), 2000);
      return () => window.clearTimeout(id);
    }
  }, [skipped]);

  useEffect(() => {
    // window.document.fullscreen o‘rniga document.fullscreenElement // <-
    if ((isMobile && !document.fullscreenElement)) return;
    const id = window.setTimeout(hideControls, 2000);
    return () => window.clearTimeout(id);
  }, [isHovering, playing, isMobile, fullscreen]); // <- TSX: dependency’da fullscreen state

  const poster =
    movie?.image && (movie.image as any).preview
      ? (movie.image as any).preview
      : undefined; // <- TSX: posterga safe access

  return (
    <div
      id="player"
      ref={playerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames({ screen: !fullscreen, hide: !controls })}
      style={playerStyle}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        controls={false}
        onClick={handleVideo}
        onTimeUpdate={timeUpdate}
        onLoadedData={loadedMovie}
        onPlaying={() => {
          setLoadingMovie(false);
        }}
        onWaiting={() => setLoadingMovie(true)}
        poster={poster}
        style={videoStyle}
        playsInline
      // webkit-playsinline="true"
      />
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        style={{ display: "none" }}
        
      />
      {!loadingMovie && <button
        ref={playBtnRef}
        className={classNames("play-pause-circle", { active: !playing })}
        onClick={handleVideo}
      >
        <BsPlayCircleFill />
      </button>}
      <div className="wrapper">
        <ul className="video-controls">
          <li className="options left">
            <button className="skip-backward" onClick={() => skip("backward")}>
              <FaBackward />
            </button>
            <button
              className={classNames("play-pause", { pause: playing })}
              onClick={handleVideo}
            >
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button className="skip-forward" onClick={() => skip("forward")}>
              <FaForward />
            </button>
          </li>
          <li className="options center">
            <div className={classNames("video-timeline", { loading: loadingMovie })}>
              <div className="progress-area" ref={progressRef}>
                <BadgePosition move={badgePosition < 0 ? 0 : badgePosition}>{badgeTime}</BadgePosition>
                <input
                  min={0}
                  type="range"
                  step="any"
                  value={rangeTime}
                  onChange={rangeTimeChange}
                  max={videoRef.current?.duration ?? 0} // <- TSX: number bo‘lishi uchun default 0
                  onMouseMove={(e) => {
                    const px = (e.nativeEvent as MouseEvent).offsetX || 0; // <- TSX: event typing
                    setBadgePosition(px);
                    const width = progressRef.current?.clientWidth ?? 1;
                    const dur = videoRef.current?.duration ?? 0;
                    formatTime((px / width) * dur);
                  }}
                />
                <RangeTime className="progress-bar" percent={percentTime} />
              </div>
            </div>
            <div className="video-timer">
              <p className="current-time">{currentTimeView}</p>
              <p className="separator"> / </p>
              <p className="video-duration">{durationView}</p>
            </div>
          </li>
          <li className="options right">
            {!isMobile && (
              <>
                <button className="volume" onClick={makeVolume}>
                  {volume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
                </button>
                <div className="range-volume">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="any"
                    onChange={volumeChange}
                    value={volume}
                  />
                  <RangeVolume className="progress-volume" percent={volume * 100} />
                </div>
              </>
            )}
            <div className="setting-content">
              <button
                className={classNames("settings", { active: accessible })}
                onClick={() => {
                  setAccessible(!accessible);
                  setList("main");
                }}
              >
                <MdSettings />
              </button>
              <div className={classNames("menu", list, menuSize(list), { active: accessible })}>
                <ul className={classNames("main-list", { active: accessible && list === "main" })}>
                  {options.map(({ label, value, list: optionList }) => (
                    <li
                      key={optionList}
                      className={`child ${optionList}`}
                      onClick={() => setList(optionList)}
                    >
                      {label} <span>{value}</span>
                    </li>
                  ))}
                </ul>
                <ul
                  className={classNames("language-list", {
                    active: accessible && list === "language",
                  })}
                >
                  <li className="back" onClick={() => setList("main")}>
                    {t("movie.language")}
                  </li>
                  {languages.map(({ value }) => (movie.source)[value] != null ? (
                    <li
                      key={value}
                      className={classNames("item", { selected: language === value })}
                      onClick={() => handleLanguage(value)}
                    >
                      {t(`languages.${value}`)} <span className="badge">{value}</span>
                    </li>
                  ) : null
                  )}
                </ul>
                <ul
                  className={classNames("quality-list", {
                    active: accessible && list === "quality",
                  })}
                >
                  <li className="back" onClick={() => setList("main")}>
                    {t("movie.quality")}
                  </li>
                  {qualities.map(({ value, badge }) =>
                    typeof movie?.source !== "string" &&
                      (movie.source as SourceMatrix)[value] != null ? (
                      <li
                        key={value}
                        className={classNames("item", { selected: quality === value })}
                        onClick={() => handleQuality(value)}
                      >
                        {value} <span className="badge">{badge}</span>
                      </li>
                    ) : null
                  )}
                </ul>
                <ul
                  className={classNames("speed-list", { active: accessible && list === "speed" })}
                >
                  <li className="back" onClick={() => setList("main")}>
                    {t("movie.speed")}
                  </li>
                  {speeds.map(({ label, value }) => (
                    <li
                      key={value}
                      className={classNames("item", {
                        selected: (speed === "normal" && value === 1) || speed === `${value}x`,
                      })}
                      onClick={() => handleSpeed(value)}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="fullscreen" id="fullscreen" onClick={makeFullScreen}>
              {fullscreen ? <FaCompressAlt /> : <FaExpandAlt />}
            </button>
          </li>
        </ul>
      </div>
      {loadingMovie && !playing && <SceletLoading />}
      <div className={classNames("skipped", { active: skipWrapper })}>
        <div className={classNames("prev", { active: skipped === false })}>
          <HiBackward />
          <span>-10sec</span>
        </div>
        <div className={classNames("next", { active: skipped === true })}>
          <HiForward />
          <span>+10sec</span>
        </div>
      </div>
    </div>
  );
}
