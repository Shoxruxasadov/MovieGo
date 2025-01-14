import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile, isIOS } from "react-device-detect";
import { useRouter } from "next/router";
import styled from 'styled-components';
import classNames from 'classnames';

import { FaBackward, FaForward, FaPlay, FaPause } from "react-icons/fa6";
import { FaExpandAlt, FaCompressAlt } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlayCircleFill } from "react-icons/bs";
import { MdSettings } from "react-icons/md";

import { usePlayer, useStore } from "@/store/zustand";
import translate from "@/language/translate.json"

const RangeTime = styled.div`width: ${props => props.percent}%!important;`;
const RangeVolume = styled.div`width: ${props => props.percent}%!important;`;
const BadgePosition = styled.span`left: ${props => props.move}px!important;`;

export default function MoviesPlayer() {
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
  const playBtnRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const { locale } = useRouter()

  const [languageChanger, setLanguageChanger] = useState(true)
  const [qualityChanger, setQualityChanger] = useState(true)

  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const videoSrc = useMemo(() => reload ? movie.source[quality][language] : undefined, [reload, movie, quality, language]);
  const videoStyle = useMemo(() => currentTime === 0 ? { visibility: 'hidden' } : {}, [currentTime]);
  const playerStyle = useMemo(() => currentTime === 0 ? { backgroundImage: `url(${movie.image.preview})` } : {}, [currentTime, movie]);

  const options = [
    { label: translate[locale].movie.language, value: language, list: 'language' },
    { label: translate[locale].movie.quality, value: quality, list: 'quality' },
    { label: translate[locale].movie.speed, value: speed === 'normal' ? translate[locale].movie.normal : speed, list: 'speed' },
  ];
  const languages = [
    { label: 'Uzbek', value: 'uz', badge: 'UZ' },
    { label: 'Russian', value: 'ru', badge: 'RU' },
    { label: 'English', value: 'en', badge: 'EN' },
  ];
  const qualities = [
    { label: '2160p', value: '2160p', badge: '4K' },
    { label: '1080p', value: '1080p', badge: 'HD' },
    { label: '720p', value: '720p', badge: 'SD' },
  ];
  const speeds = [
    { label: '0.25x', value: 0.25 },
    { label: '0.5x', value: 0.5 },
    { label: '0.75x', value: 0.75 },
    { label: translate[locale].movie.normal, value: 1 },
    { label: '1.25x', value: 1.25 },
    { label: '1.5x', value: 1.5 },
    { label: '1.75x', value: 1.75 },
    { label: '2x', value: 2 },
  ];

  function selectLanguage(source, preferredLanguage) {
    const availableLanguages = ['uz', 'ru', 'en'];

    for (const lang of [preferredLanguage, ...availableLanguages]) {
      if (source[lang]) {
        return lang;
      }
    }
    return null;
  }
  function selectQuality(source) {
    const availableQualities = ['2160p', '1080p', '720p'];

    for (const quality of availableQualities) {
      if (source[quality]) {
        return quality;
      }
    }
    return null;
  }
  if (languageChanger) {
    const currentSource = movie.source[quality];
    if (currentSource) {
      const newLanguage = selectLanguage(currentSource, language);
      if (newLanguage) {
        setLanguage(newLanguage);
      }
    }
    setLanguageChanger(false);
  }
  if (qualityChanger) {
    const newQuality = selectQuality(movie.source);
    if (newQuality) {
      setQuality(newQuality);
    }
    setQualityChanger(false);
  }

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

    const fallbackLanguages = {
      uz: ['ru', 'en'],
      ru: ['uz', 'en'],
      en: ['uz', 'ru']
    };
    if (!movie.source[quality][language]) {
      for (const altLang of fallbackLanguages[language]) {
        if (movie.source[quality][altLang]) {
          return setLanguage(altLang);
        }
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
    const checkQuality = (qualities) => {
      const presentQualities = qualities.filter(q => movie.source[q] != null);
      if (presentQualities.length <= 1) return ' unity';
      if (presentQualities.length < qualities.length) return ' dual';
      return '';
    };
    const checkLanguages = (quality) => {
      const availableLanguages = ['uz', 'ru', 'en'].filter(lang => movie.source[quality]?.[lang] != null);
      if (availableLanguages.length <= 1) return ' unity';
      if (availableLanguages.length < 3) return ' dual';
      return '';
    };
    switch (menu) {
      case 'quality':
        return checkQuality(['2160p', '1080p', '720p']);
      case 'language':
        return checkLanguages(quality);
      default:
        return '';
    }
  };

  const makeFullScreen = () => {
    const fullscreen = document.getElementById("fullscreen");

    if (window.document.fullscreenElement) {
      setFullscreen(false)
      fullscreen.blur()
      return window.document.exitFullscreen()
    }

    setFullscreen(true)
    fullscreen.blur()
    playerRef.current.requestFullscreen()
    if (!playing) handleVideo()
  }

  const formatTime = time => {
    const hour = Math.floor(time / 3600)
    const minute = Math.floor(time / 60) % 60
    const second = Math.floor(time % 60)
    const makeHour = hour == 0 ? '' : `${hour}:`
    const makeMinute = minute < 10 ? `0${minute}` : minute
    const makeSecond = second < 10 ? `0${second}` : second
    setBadgeTime(`${makeHour}${makeMinute}:${makeSecond}`)
  }

  const hideControls = () => {
    if (!playing || (isHovering && !window.document.fullscreen)) return setControls(true)
    setControls(false)
    setAccessible(false)
    setList("main")
  }

  useEffect(() => {
    setCurrentTime(0)
    setTimeout(() => { setReload(true) }, 500);

    // === Key === \\
    const handleKeyPress = ({ keyCode }) => {
      if (window.document.fullscreenElement) {
        switch (keyCode) {
          case 39:
            videoRef.current.currentTime += 10;
            setCurrentTime(videoRef.current.currentTime);
            break;
          case 37:
            videoRef.current.currentTime -= 10;
            setCurrentTime(videoRef.current.currentTime);
            break;
          case 38:
            const volumeUp = Math.min(videoRef.current.volume + 0.1, 1);
            videoRef.current.volume = volumeUp;
            setVolume(volumeUp);
            break;
          case 40:
            const volumeDown = Math.max(videoRef.current.volume - 0.1, 0);
            videoRef.current.volume = volumeDown;
            setVolume(volumeDown);
            break;
          case 32:
            setPlaying((prev) => {
              const isPlaying = !prev;
              isPlaying ? videoRef.current.play() : videoRef.current.pause();
              return isPlaying;
            });
            break;
          default:
            break;
        }
      }
    }

    // == Mouse == \\
    let timeout;
    const handleMouseMove = () => {
      if (window.document.fullscreen) {
        setControls(true)
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setControls(false)
          setAccessible(false)
          setList("main")
        }, 2000);
      }
    };

    document.addEventListener("keyup", handleKeyPress);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener("keyup", handleKeyPress)
      document.removeEventListener('mousemove', handleMouseMove)
    };
  }, [])

  useEffect(() => {
    if (changes) {
      videoRef.current.src = movie.source[quality][language]
      videoRef.current.currentTime = currentTimeChanged
      videoRef.current.play();
      setPlaying(true)
    }; setChanges(true)
  }, [language, quality])

  useEffect(() => {
    setFullscreen(!window.document.fullscreen);
    playBtnRef.current.focus()
  }, [window.document.fullscreen])

  useEffect(() => {
    makeDuration()
  }, [duration])

  useEffect(() => {
    setControls(true)
  }, [isHovering])

  useEffect(() => {
    if ((isMobile && !window.document.fullscreen)) return
    let interval = setTimeout(hideControls, 2000)
    return (() => clearInterval(interval))
  }, [isHovering, playing, window.document.fullscreen, isMobile])

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
        controls={false}
        onClick={handleVideo}
        onTimeUpdate={timeUpdate}
        onLoadedData={loadedMovie}
        onPlaying={() => setLoadingMovie(false)}
        onWaiting={() => setLoadingMovie(true)}
        src={videoSrc}
        poster={movie.image.preview}
        style={videoStyle}
      ></video>
      <button ref={playBtnRef} className={classNames('play-pause-circle', { active: !playing })} onClick={handleVideo}><BsPlayCircleFill /></button>
      <div className="wrapper">
        <ul className="video-controls">
          <li className="options left">
            <button className="skip-backward" onClick={() => skip('backward')}><FaBackward /></button>
            <button className={classNames('play-pause', { pause: playing })} onClick={handleVideo}>{playing ? <FaPause /> : <FaPlay />}</button>
            <button className="skip-forward" onClick={() => skip('forward')}><FaForward /></button>
          </li>
          <li className="options center">
            <div className={classNames('video-timeline', { loading: loadingMovie })}>
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
            {!isMobile && <>
              <button className="volume" onClick={makeVolume}>{volume == 0 ? <HiVolumeOff /> : <HiVolumeUp />}</button>
              <div className="range-volume">
                <input type="range" min='0' max='1' step='any' onChange={volumeChange} value={volume} />
                <RangeVolume className="progress-volume" percent={volume * 100} />
              </div>
            </>}
            <div className="setting-content">
              <button className={classNames('settings', { active: accessible })} onClick={() => { setAccessible(!accessible); setList("main") }}><MdSettings /></button>
              <div className={classNames('menu', list, menuSize(list), { active: accessible })}>
                <ul className={classNames('main-list', { active: accessible && list === 'main' })}>
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
                <ul className={classNames('language-list', { active: accessible && list === 'language' })}>
                  <li className="back" onClick={() => setList('main')}>
                    {translate[locale].movie.language}
                  </li>
                  {languages.map(({ label, value, badge }) => (
                    movie.source[quality] && movie.source[quality][value] != null && (
                      <li
                        key={value}
                        className={classNames('item', { selected: language === value })}
                        onClick={() => handleLanguage(value)}
                      >
                        {label} <span className="badge">{badge}</span>
                      </li>
                    )
                  ))}
                </ul>
                <ul className={classNames('quality-list', { active: accessible && list === 'quality' })}>
                  <li className="back" onClick={() => setList('main')}>
                    {translate[locale].movie.quality}
                  </li>
                  {qualities.map(({ label, value, badge }) => (
                    movie.source[value] != null && (
                      <li
                        key={value}
                        className={classNames('item', { selected: quality === value })}
                        onClick={() => handleQuality(value)}
                      >
                        {label} <span className="badge">{badge}</span>
                      </li>
                    )
                  ))}
                </ul>
                <ul className={classNames('speed-list', { active: accessible && list === 'speed' })}>
                  <li className="back" onClick={() => setList('main')}>
                    {translate[locale].movie.speed}
                  </li>
                  {speeds.map(({ label, value }) => (
                    <li
                      key={value}
                      className={classNames('item', { selected: speed === value })}
                      onClick={() => handleSpeed(value)}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {!isIOS && <button className="fullscreen" id="fullscreen" onClick={makeFullScreen}>{fullscreen ? <FaExpandAlt /> : <FaCompressAlt />}</button>}
          </li>
        </ul>
      </div>
    </div >
  )
}