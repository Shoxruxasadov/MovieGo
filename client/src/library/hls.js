"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari va iOS HLS'ni to‘g‘ridan-to‘g‘ri o‘ynaydi
      video.src = videoUrl;
    } else if (Hls.isSupported()) {
      // Android va boshqa brauzerlar uchun HLS.js kutubxonasi ishlatiladi
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
    }
  }, [videoUrl]);
  
  return <video ref={videoRef} controls className="w-full h-auto" />;
};

export default HLSPlayer;