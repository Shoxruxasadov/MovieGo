import { useEffect, useRef, useState } from "react";
import { isMobile, isIOS } from "react-device-detect";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { usePlayer, useStore } from "@/store/zustand";
import translate from "@/language/translate.json"

import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa6";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdSettings } from "react-icons/md";

const RangeTime = styled.div`
    width: ${props => props.percent}%!important;
`;
const RangeVolume = styled.div`
    width: ${props => props.percent}%!important;
`;
const BadgePosition = styled.span`
    left: ${props => props.move}px!important;
`;

export default function SeriesPlayer({ episode }) {
  const setLanguage = usePlayer(state => state.setLanguage);
  const setQuality = usePlayer(state => state.setQuality);
  const setSpeed = usePlayer(state => state.setSpeed);
  const setCurrentTime = usePlayer(state => state.setCurrentTime);
  const setDuration = usePlayer(state => state.setDuration);
  const setVolume = usePlayer(state => state.setVolume);

  const language = usePlayer(state => state.language);
  const quality = usePlayer(state => state.quality);
  const speed = usePlayer(state => state.speed);
  const currentTime = usePlayer(state => state.currentTime);
  const duration = usePlayer(state => state.duration);
  const volume = usePlayer(state => state.volume);
  const movie = useStore(state => state.movie);

  const [currentTimeChanged, setCurrentTimeChanged] = useState(0)
  const [currentTimeView, setCurrentTimeView] = useState('00:00')
  const [durationView, setDurationView] = useState('0:00:00')
  const [badgePosition, setBadgePosition] = useState(0)
  const [loadingMovie, setLoadingMovie] = useState(true)
  const [accessible, setAccessible] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [percentTime, setPercentTime] = useState(0)
  const [controls, setControls] = useState(true)
  const [rangeTime, setRangeTime] = useState(0)
  const [badgeTime, setBadgeTime] = useState(0)
  const [changes, setChanges] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [reload, setReload] = useState(false)
  const [list, setList] = useState('main')
  const progressRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const { locale } = useRouter()

  const [languageChanger, setLanguageChanger] = useState(true)
  const [qualityChanger, setQualityChanger] = useState(true)

  if (languageChanger) {
    if (movie.episodes[episode][`720p`] != null) {
      if (language == 'uz') {
        if ((movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].en != null)) setLanguage('en')
      }
      if (language == 'ru') {
        if ((movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].ru != null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].en != null)) setLanguage('en')
      }
      if (language == 'en') {
        if ((movie.episodes[episode][`720p`].en != null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`720p`].en != null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`720p`].en != null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`720p`].en != null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`720p`].en == null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru != null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].en == null && movie.episodes[episode][`720p`].uz != null && movie.episodes[episode][`720p`].ru == null)) setLanguage('uz')
        if ((movie.episodes[episode][`720p`].en == null && movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru != null)) setLanguage('ru')
      }
    } else if (movie.episodes[episode][`1080p`] != null) {
      if (language == 'uz') {
        if ((movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].en != null)) setLanguage('en')
      }
      if (language == 'ru') {
        if ((movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].ru != null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].en != null)) setLanguage('en')
      }
      if (language == 'en') {
        if ((movie.episodes[episode][`1080p`].en != null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`1080p`].en != null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`1080p`].en != null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`1080p`].en != null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`1080p`].en == null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru != null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].en == null && movie.episodes[episode][`1080p`].uz != null && movie.episodes[episode][`1080p`].ru == null)) setLanguage('uz')
        if ((movie.episodes[episode][`1080p`].en == null && movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru != null)) setLanguage('ru')
      }
    } else if (movie.episodes[episode][`2160p`] != null) {
      if (language == 'uz') {
        if ((movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].en != null)) setLanguage('en')
      }
      if (language == 'ru') {
        if ((movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].en != null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].ru != null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].en == null)) setLanguage('ru')
        if ((movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].en != null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].en == null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].en != null)) setLanguage('en')
      }
      if (language == 'en') {
        if ((movie.episodes[episode][`2160p`].en != null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`2160p`].en != null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`2160p`].en != null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru != null)) setLanguage('en')
        if ((movie.episodes[episode][`2160p`].en != null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru == null)) setLanguage('en')
        if ((movie.episodes[episode][`2160p`].en == null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru != null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].en == null && movie.episodes[episode][`2160p`].uz != null && movie.episodes[episode][`2160p`].ru == null)) setLanguage('uz')
        if ((movie.episodes[episode][`2160p`].en == null && movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru != null)) setLanguage('ru')
      }
    }
    setLanguageChanger(false)
  }

  if (qualityChanger) {
    if (quality == '2160p') {
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] == null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
    }
    if (quality == '1080p') {
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] == null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
    }
    if (quality == '720p') {
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
      if ((movie.episodes[episode][`2160p`] != null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] == null)) setQuality('2160p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] != null && movie.episodes[episode][`720p`] == null)) setQuality('1080p')
      if ((movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] != null)) setQuality('720p')
    }
    setQualityChanger(false)
  }

  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleVideo = () => {
    setPlaying(!playing);
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
  }

  const skip = move => {
    if (move == 'backward') {
      videoRef.current.currentTime -= 10
      setCurrentTime(currentTime - 10)
    }
    if (move == 'forward') {
      videoRef.current.currentTime += 10
      setCurrentTime(currentTime + 10)
    }
  }

  const timeUpdate = event => {
    setPercentTime((event.target.currentTime / event.target.duration) * 100)
    setCurrentTime(event.target.currentTime)
    makeCurrentTime()
  }

  const loadedMovie = event => {
    setDuration(event.target.duration)
    setLoadingMovie(false);
    setPlaying(true);
    videoRef.current.play();
  }

  const volumeChange = event => {
    videoRef.current.volume = event.target.value
    setVolume(event.target.value)
  }

  const rangeTimeChange = event => {
    videoRef.current.currentTime = event.target.value
    setPercentTime((event.target.value * 100) / videoRef.current.duration)
    setRangeTime(event.target.value)
    setCurrentTime(event.target.value)
    makeCurrentTime()
  }

  const makeCurrentTime = () => {
    const hour = Math.floor(currentTime / 3600)
    const minute = Math.floor(currentTime / 60) % 60
    const second = Math.floor(currentTime % 60)
    const makeHour = hour == 0 ? '' : `${hour}:`
    const makeMinute = minute < 10 ? `0${minute}` : minute
    const makeSecond = second < 10 ? `0${second}` : second
    setCurrentTimeView(`${makeHour}${makeMinute}:${makeSecond}`)
  }

  const makeDuration = () => {
    const hour = Math.floor(duration / 3600)
    const minute = Math.floor(duration / 60) % 60
    const second = Math.floor(duration % 60)
    const makeHour = hour == 0 ? '' : `${hour}:`
    const makeMinute = minute < 10 ? `0${minute}` : minute
    const makeSecond = second < 10 ? `0${second}` : second
    setDurationView(`${makeHour}${makeMinute}:${makeSecond}`)
  }

  const handleLanguage = language => {
    setLanguage(language);
    setList('main');
    setLoadingMovie(true);
    setCurrentTimeChanged(currentTime)
  }

  const handleQuality = quality => {
    setQuality(quality);
    setList('main');
    setLoadingMovie(true);
    setCurrentTimeChanged(currentTime)

    if (!movie.source[quality][language]) {
      if (language == 'uz') {
        if (movie.source[quality].ru) return setLanguage('ru');
        if (movie.source[quality].en) return setLanguage('en');
      }
      if (language == 'ru') {
        if (movie.source[quality].uz) return setLanguage('uz');
        if (movie.source[quality].en) return setLanguage('en');
      }
      if (language == 'en') {
        if (movie.source[quality].uz) return setLanguage('uz');
        if (movie.source[quality].ru) return setLanguage('ru');
      }
    }
  }

  const handleSpeed = speed => {
    setList('main')
    videoRef.current.playbackRate = speed
    if (speed == 1) { setSpeed('normal') } else { setSpeed(`${speed}x`) }
  }

  const makeVolume = () => {
    if (videoRef.current.volume == 0) {
      videoRef.current.volume = 1
      setVolume(1)
    } else {
      videoRef.current.volume = 0
      setVolume(0)
    }
  }

  const menuSize = menu => {
    if (menu == 'quality') {
      if ((movie.episodes[episode][`1080p`] == null && movie.episodes[episode][`720p`] == null) || (movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`720p`] == null) || (movie.episodes[episode][`2160p`] == null && movie.episodes[episode][`1080p`] == null)) return ' unity'
      if (movie.episodes[episode][`2160p`] == null || movie.episodes[episode][`1080p`] == null || movie.episodes[episode][`720p`] == null) return ' dual'
    }
    if (menu == 'language') {
      if (quality == '2160p') {
        if ((movie.episodes[episode][`2160p`].ru == null && movie.episodes[episode][`2160p`].en == null) || (movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].en == null) || (movie.episodes[episode][`2160p`].uz == null && movie.episodes[episode][`2160p`].ru == null)) return ' unity'
        if (movie.episodes[episode][`2160p`].uz == null || movie.episodes[episode][`2160p`].ru == null || movie.episodes[episode][`2160p`].en == null) return ' dual'
      } else if (quality == '1080p') {
        if ((movie.episodes[episode][`1080p`].ru == null && movie.episodes[episode][`1080p`].en == null) || (movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].en == null) || (movie.episodes[episode][`1080p`].uz == null && movie.episodes[episode][`1080p`].ru == null)) return ' unity'
        if (movie.episodes[episode][`1080p`].uz == null || movie.episodes[episode][`1080p`].ru == null || movie.episodes[episode][`1080p`].en == null) return ' dual'
      } else if (quality == '720p') {
        if ((movie.episodes[episode][`720p`].ru == null && movie.episodes[episode][`720p`].en == null) || (movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].en == null) || (movie.episodes[episode][`720p`].uz == null && movie.episodes[episode][`720p`].ru == null)) return ' unity'
        if (movie.episodes[episode][`720p`].uz == null || movie.episodes[episode][`720p`].ru == null || movie.episodes[episode][`720p`].en == null) return ' dual'
      }
    }
    return ''
  }

  const makeFullScreen = () => {
    if (window.document.fullscreenElement) {
      setFullscreen(false)
      return window.document.exitFullscreen()
    }
    setFullscreen(true)
    setControls(false)
    playerRef.current.requestFullscreen()
  }

  const formatTime = time => {
    const hour = Math.floor(time / 3600)
    const minute = Math.floor(time / 60) % 60
    const second = Math.floor(time % 60)
    const makeHour = () => hour == 0 ? '' : `${hour}:`
    const makeMinute = () => minute < 10 ? `0${minute}` : minute
    const makeSecond = () => second < 10 ? `0${second}` : second
    setBadgeTime(`${makeHour()}${makeMinute()}:${makeSecond()}`)
  }

  const hideControls = () => {
    if (isHovering && !window.document.fullscreen) return setControls(true)
    if (!playing) return
    setControls(false)
  }

  useEffect(() => {
    setCurrentTime(0)
    setTimeout(() => { setReload(true) }, 1000);

    let playingKeyCode = playing;
    let currentTimeKeyCode = currentTime;
    const handleSpacePress = ({ keyCode }) => {
      if (window.document.fullscreenElement) {
        if (keyCode === 39) { // Forward Arrow
          currentTimeKeyCode = videoRef.current.currentTime
          videoRef.current.currentTime += 10
          setCurrentTime(currentTimeKeyCode + 10)
        }
        if (keyCode === 37) { // Backward Arrow
          currentTimeKeyCode = videoRef.current.currentTime
          videoRef.current.currentTime -= 10
          setCurrentTime(currentTimeKeyCode - 10)
        }
        if (keyCode === 38) { // Up Arrow
          if (videoRef.current.volume > 0.89) {
            videoRef.current.volume = 1
            setVolume(1)
          } else {
            videoRef.current.volume += 0.1
            setVolume(videoRef.current.volume)
          }
        }
        if (keyCode === 40) { // Bottom Arrow
          if (videoRef.current.volume < 0.11) {
            videoRef.current.volume = 0
            setVolume(0)
          } else {
            videoRef.current.volume -= 0.1
            setVolume(videoRef.current.volume)
          }

        }
        if (keyCode === 32) { // Space Key
          setPlaying(!playingKeyCode);
          if (playingKeyCode) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          playingKeyCode = !playingKeyCode
        }
      }
    }

    document.addEventListener("keyup", handleSpacePress);
    return () => { document.removeEventListener("keyup", handleSpacePress) };
  }, [])

  useEffect(() => {
    if (changes) {
      videoRef.current.src = movie.episodes[episode][quality][language]
      videoRef.current.currentTime = currentTimeChanged
      videoRef.current.play();
      setPlaying(true)
    }; setChanges(true)
  }, [language, quality])

  useEffect(() => {
    setFullscreen(!window.document.fullscreen);
  }, [window.document.fullscreen])

  useEffect(() => {
    makeDuration()
  }, [duration])

  useEffect(() => {
    setControls(true)
  }, [isHovering])

  useEffect(() => {
    if (isMobile && !window.document.fullscreen) return
    let interval = setTimeout(hideControls, 2000)
    return (() => clearInterval(interval))
  }, [isHovering, playing, window.document.fullscreen, isMobile])

  return (
    <div
      id="player"
      ref={playerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${fullscreen ? "" : "screen "}${controls ? "" : "hide "}visible`}
      style={currentTime == 0 ? { backgroundImage: `url(${movie.episodes[episode].image})` } : {}}
    >
      {
        reload ? <video
          ref={videoRef}
          controls={false}
          onClick={handleVideo}
          onTimeUpdate={timeUpdate}
          onLoadedData={loadedMovie}
          onPlaying={() => setLoadingMovie(false)}
          onWaiting={() => setLoadingMovie(true)}
          src={movie.episodes[episode][quality][language]}
          style={currentTime == 0 ? { visibility: "hidden" } : {}}
        ></video> : <video
          ref={videoRef}
          controls={false}
          onClick={handleVideo}
          onTimeUpdate={timeUpdate}
          onLoadedData={loadedMovie}
          style={currentTime == 0 ? { visibility: "hidden" } : {}}
        ></video>
      }
      <button className={`play-pause-circle${!playing ? ' active' : ''}`} onClick={handleVideo}><BsPlayCircleFill /></button>
      <div className="wrapper">
        <ul className="video-controls">
          <li className="options left">
            <button className="skip-backward" onClick={() => skip('backward')}><FaBackward /></button>
            <button className={`play-pause${playing ? ' pause' : ''}`} onClick={handleVideo}>{playing ? <FaPause /> : <FaPlay />}</button>
            <button className="skip-forward" onClick={() => skip('forward')}><FaForward /></button>
          </li>
          <li className="options center">
            <div className={`video-timeline${loadingMovie ? ' loading' : ''}`}>
              <div className="progress-area" ref={progressRef}>
                <BadgePosition move={badgePosition}>{badgeTime}</BadgePosition>
                <input min={0}
                  type="range"
                  step='any'
                  value={rangeTime}
                  onChange={rangeTimeChange}
                  max={videoRef.current && videoRef.current.duration}
                  onMouseMove={(e) => {
                    setBadgePosition(e.nativeEvent.offsetX)
                    formatTime((e.nativeEvent.offsetX / progressRef.current.clientWidth) * videoRef.current.duration)
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
            {!isIOS && <>
              <button className="volume" onClick={makeVolume}>{volume == 0 ? <HiVolumeOff /> : <HiVolumeUp />}</button>
              {!isMobile && <div className="range-volume">
                <input type="range" min='0' max='1' step='any' onChange={volumeChange} value={volume} />
                <RangeVolume className="progress-volume" percent={volume * 100} />
              </div>}
            </>}
            <div className="setting-content">
              <button className={`settings${accessible ? ' active' : ''}`} onClick={() => setAccessible(!accessible)}><MdSettings /></button>
              <div className={`menu ${list}${menuSize(list)}${accessible ? ' active' : ''}`}>
                <ul className={`main-list${accessible && list == 'main' ? ' active' : ''}`}>
                  <li className="child language" onClick={() => setList('language')}>{translate[locale].movie.language} <span>{language}</span></li>
                  <li className="child quality" onClick={() => setList('quality')}>{translate[locale].movie.quality} <span>{quality}</span></li>
                  <li className="child speed" onClick={() => setList('speed')}>{translate[locale].movie.speed} <span>{speed == 'normal' ? translate[locale].movie.normal : speed}</span></li>
                </ul>
                <ul className={`language-list${accessible && list == 'language' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>{translate[locale].movie.language}</li>
                  {(movie.episodes[episode][quality] && (movie.episodes[episode][quality].uz != null)) && <li className={`item${language == 'uz' ? ' selected' : ''}`} onClick={() => handleLanguage('uz')}>Uzbek <span className="badge">UZ</span></li>}
                  {(movie.episodes[episode][quality] && (movie.episodes[episode][quality].ru != null)) && <li className={`item${language == 'ru' ? ' selected' : ''}`} onClick={() => handleLanguage('ru')}>Russian <span className="badge">RU</span></li>}
                  {(movie.episodes[episode][quality] && (movie.episodes[episode][quality].en != null)) && <li className={`item${language == 'en' ? ' selected' : ''}`} onClick={() => handleLanguage('en')}>English <span className="badge">EN</span></li>}
                </ul>
                <ul className={`quality-list${accessible && list == 'quality' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>{translate[locale].movie.quality}</li>
                  {movie.episodes[episode][`2160p`] != null && <li className={`item${quality == '2160p' ? ' selected' : ''}`} onClick={() => handleQuality('2160p')}>2160p <span className="badge">4K</span></li>}
                  {movie.episodes[episode][`1080p`] != null && <li className={`item${quality == '1080p' ? ' selected' : ''}`} onClick={() => handleQuality('1080p')}>1080p <span className="badge">FHD</span></li>}
                  {movie.episodes[episode][`720p`] != null && <li className={`item${quality == '720p' ? ' selected' : ''}`} onClick={() => handleQuality('720p')}>720p <span className="badge">HD</span></li>}
                </ul>
                <ul className={`speed-list${accessible && list == 'speed' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>{translate[locale].movie.speed}</li>
                  <li className={`item${speed == '0.25x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.25)}>0.25x</li>
                  <li className={`item${speed == '0.5x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.5)}>0.5x</li>
                  <li className={`item${speed == '0.75x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.75)} >0.75x</li>
                  <li className={`item${speed == 'normal' ? ' selected' : ''}`} onClick={() => handleSpeed(1)} >{translate[locale].movie.normal}</li>
                  <li className={`item${speed == '1.25x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.25)} >1.25x</li>
                  <li className={`item${speed == '1.5x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.5)} >1.5x</li>
                  <li className={`item${speed == '1.75x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.75)} >1.75x</li>
                  <li className={`item${speed == '2x' ? ' selected' : ''}`} onClick={() => handleSpeed(2)}>2x</li>
                </ul>
              </div>
            </div>
            {!isIOS && <button className="fullscreen" onClick={makeFullScreen}>{fullscreen ? <FaExpandAlt /> : <FaCompressAlt />}</button>}
          </li>
        </ul>
      </div>
    </div >
  )
}