import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import styled from 'styled-components';
import { usePlayer, useStore } from "@/store/zustand";

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

export default function Player({module}) {
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
  const [accessible, setAccessible] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [percentTime, setPercentTime] = useState(0)
  const [rangeTime, setRangeTime] = useState(0)
  const [badgeTime, setBadgeTime] = useState(0)
  const [changes, setChanges] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [controls, setControls] = useState(true)
  const [list, setList] = useState('main')
  const progressRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleVideo = () => {
    setPlaying(!playing);
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
  };

  const skip = (move) => {
    if (move == 'backward') {
      videoRef.current.currentTime -= 10
      setCurrentTime(currentTime - 10)
    }
    if (move == 'forward') {
      videoRef.current.currentTime += 10
      setCurrentTime(currentTime + 10)
    }
  }

  const timeUpdate = (event) => {
    setPercentTime((event.target.currentTime / event.target.duration) * 100)
    setCurrentTime(event.target.currentTime)
    makeCurrentTime()
  }

  const volumeChange = (event) => {
    videoRef.current.volume = event.target.value
    setVolume(event.target.value)
  }

  const rangeTimeChange = (event) => {
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
    const makeHour = () => hour == 0 ? '' : `${hour}:`
    const makeMinute = () => minute < 10 ? `0${minute}` : minute
    const makeSecond = () => second < 10 ? `0${second}` : second
    setCurrentTimeView(`${makeHour()}${makeMinute()}:${makeSecond()}`)
  }

  const makeDuration = () => {
    const hour = Math.floor(duration / 3600)
    const minute = Math.floor(duration / 60) % 60
    const second = Math.floor(duration % 60)
    const makeHour = () => hour == 0 ? '' : `${hour}:`
    const makeMinute = () => minute < 10 ? `0${minute}` : minute
    const makeSecond = () => second < 10 ? `0${second}` : second
    setDurationView(`${makeHour()}${makeMinute()}:${makeSecond()}`)
  }

  const handleLanguage = language => {
    setLanguage(language);
    setList('main');
    setCurrentTimeChanged(currentTime)
  }

  const handleQuality = quality => {
    setQuality(quality);
    setList('main');
    setCurrentTimeChanged(currentTime)
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
    if (!playing || isHovering) return
    setControls(false)
  }

  useEffect(() => {
    setCurrentTime(0)
    hideControls(false)
    if (movie.source[`1080p`] == null && quality == '1080p') setQuality('720p')
    if (movie.source[`2160p`] == null && quality == '2160p') { if (movie.source[`1080p`] != null) { setQuality('1080p') } else { setQuality('720p') } }
  }, [])

  useEffect(() => {
    if (changes) {
      videoRef.current.src = movie.source[quality][language]
      videoRef.current.currentTime = currentTimeChanged
      videoRef.current.play();
      setPlaying(true)
    } setChanges(true)
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
    let interval = setInterval(hideControls, 3000)
    return (() => clearInterval(interval))
  }, [isHovering, playing])

  return (
    <div
      id="player"
      ref={playerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${fullscreen ? "" : "screen "}${controls ? "" : "hide "}${module}`}
      style={currentTime == 0 ? { backgroundImage: `url(${movie.image.preview})` } : {}}
    >
      <video
        ref={videoRef}
        controls={false}
        onClick={handleVideo}
        onTimeUpdate={timeUpdate}
        onLoadedData={(e) => setDuration(e.target.duration)}
        src={movie.source[quality][language]}
        style={currentTime == 0 ? { visibility: "hidden" } : {}}
      ></video>
      <button className={`play-pause-circle${!playing ? ' active' : ''}`} onClick={handleVideo}><BsPlayCircleFill /></button>
      <div className="wrapper">
        <ul className="video-controls">
          <li className="options left">
            <button className="skip-backward" onClick={() => skip('backward')}><FaBackward /></button>
            <button className={`play-pause${playing ? ' pause' : ''}`} onClick={handleVideo}>{playing ? <FaPause /> : <FaPlay />}</button>
            <button className="skip-forward" onClick={() => skip('forward')}><FaForward /></button>
          </li>
          <li className="options center">
            <div className="video-timeline" onMouseMove={(e) => {
              setBadgePosition(e.nativeEvent.offsetX)
              formatTime((e.nativeEvent.offsetX / progressRef.current.clientWidth) * videoRef.current.duration)
            }}>
              <div className="progress-area" ref={progressRef}>
                <BadgePosition move={badgePosition}>{badgeTime}</BadgePosition>
                <input type="range" min={0} max={videoRef.current && videoRef.current.duration} step='any' onChange={rangeTimeChange} value={rangeTime} />
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
            <button className="volume" onClick={makeVolume}>{volume == 0 ? <HiVolumeOff /> : <HiVolumeUp />}</button>
            {!isMobile && <div className="range-volume">
              <input type="range" min='0' max='1' step='any' onChange={volumeChange} value={volume} />
              <RangeVolume className="progress-volume" percent={volume * 100} />
            </div>}
            <div className="setting-content">
              <button className={`settings${accessible ? ' active' : ''}`} onClick={() => setAccessible(!accessible)}><MdSettings /></button>
              <div className={`menu ${list}${movie.source[`2160p`] == null && movie.source[`1080p`] == null ? ' unity' : movie.source[`2160p`] == null && movie.source[`1080p`] != null ? ' dual' : ''}${accessible ? ' active' : ''}`}>
                <ul className={`main-list${accessible && list == 'main' ? ' active' : ''}`}>
                  <li className="child language" onClick={() => setList('language')}>Language <span>{language}</span></li>
                  <li className="child quality" onClick={() => setList('quality')}>Quality <span>{quality}</span></li>
                  <li className="child speed" onClick={() => setList('speed')}>Speed <span>{speed}</span></li>
                </ul>
                <ul className={`language-list${accessible && list == 'language' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>Language</li>
                  {movie.source[`720p`].uz != null && <li className={`item${language == 'uz' ? ' selected' : ''}`} onClick={() => handleLanguage('uz')}>Uzbek <span className="badge">UZ</span></li>}
                  {movie.source[`720p`].ru != null && <li className={`item${language == 'ru' ? ' selected' : ''}`} onClick={() => handleLanguage('ru')}>Russian <span className="badge">RU</span></li>}
                  {movie.source[`720p`].en != null && <li className={`item${language == 'en' ? ' selected' : ''}`} onClick={() => handleLanguage('en')}>English <span className="badge">EN</span></li>}
                </ul>
                <ul className={`quality-list${accessible && list == 'quality' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>Quality</li>
                  {movie.source[`2160p`] != null && <li className={`item${quality == '2160p' ? ' selected' : ''}`} onClick={() => handleQuality('2160p')}>2160p <span className="badge">4K</span></li>}
                  {movie.source[`1080p`] != null && <li className={`item${quality == '1080p' ? ' selected' : ''}`} onClick={() => handleQuality('1080p')}>1080p <span className="badge">HD</span></li>}
                  {movie.source[`720p`] != null && <li className={`item${quality == '720p' ? ' selected' : ''}`} onClick={() => handleQuality('720p')}>720p <span className="badge">SD</span></li>}
                </ul>
                <ul className={`speed-list${accessible && list == 'speed' ? ' active' : ''}`}>
                  <li className="back" onClick={() => setList('main')}>Speed</li>
                  <li className={`item${speed == '0.25x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.25)}>0.25x</li>
                  <li className={`item${speed == '0.5x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.5)}>0.5x</li>
                  <li className={`item${speed == '0.75x' ? ' selected' : ''}`} onClick={() => handleSpeed(0.75)} >0.75x</li>
                  <li className={`item${speed == 'normal' ? ' selected' : ''}`} onClick={() => handleSpeed(1)} >Normal</li>
                  <li className={`item${speed == '1.25x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.25)} >1.25x</li>
                  <li className={`item${speed == '1.5x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.5)} >1.5x</li>
                  <li className={`item${speed == '1.75x' ? ' selected' : ''}`} onClick={() => handleSpeed(1.75)} >1.75x</li>
                  <li className={`item${speed == '2x' ? ' selected' : ''}`} onClick={() => handleSpeed(2)}>2x</li>
                </ul>
              </div>
            </div>
            <button className="fullscreen" onClick={makeFullScreen}>{fullscreen ? <FaCompressAlt /> : <FaExpandAlt />}</button>
          </li>
        </ul>
      </div>
    </div >
  )
}