import { useEffect, useState } from "react";
import Plyr from "plyr-react";

import { useStore } from "@/store/zustand";

export default function Player() {
  const movie = useStore(state => state.movie);

  return (
    <div id="player">
      <Plyr
        options={{
          enabled: true,
          title: movie.title.en,
          debug: false,
          autoplay: false,
          autopause: true,
          playsinline: true,
          seekTime: 10,
          volume: 1,
          muted: false,
          duration: null,
          displayDuration: true,
          invertTime: true,
          toggleInvert: true,
          ratio: null,
          clickToPlay: true,
          hideControls: true,
          resetOnEnd: false,

          quality: {
            default: 720,
            // The options to display in the UI, if available for the source media
            options: [2160, 1080, 720, 480],
            forced: false,
            onChange: null,
          },
          loop: {
            active: false,
            // start: null,
            // end: null,
          },
          speed: {
            selected: 1,
            // The options to display in the UI, if available for the source media (e.g. Vimeo and YouTube only support 0.5x-4x)
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4],
          },
          fullscreen: {
            enabled: true, // Allow fullscreen?
            fallback: true, // Fallback using full viewport/window
            iosNative: true, // Use the native fullscreen in iOS (disables custom controls)
            // Selector for the fullscreen container so contextual / non-player content can remain visible in fullscreen mode
            // Non-ancestors of the player element will be ignored
            // container: null, // defaults to the player element
          },
          controls: [
            "play-large",
            // 'restart',
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            // "captions",
            "settings",
            // "pip",
            // "airplay",
            // 'download',
            "fullscreen",
          ],
          settings: ["captions", "quality", "speed", "loop"],
          i18n: {
            restart: "Restart",
            rewind: "Rewind {seektime}s",
            play: "Play",
            pause: "Pause",
            fastForward: "Forward {seektime}s",
            seek: "Seek",
            seekLabel: "{currentTime} of {duration}",
            played: "Played",
            buffered: "Buffered",
            currentTime: "Current time",
            duration: "Duration",
            volume: "Volume",
            mute: "Mute",
            unmute: "Unmute",
            enableCaptions: "Enable captions",
            disableCaptions: "Disable captions",
            download: "Download",
            enterFullscreen: "Enter fullscreen",
            exitFullscreen: "Exit fullscreen",
            frameTitle: "Player for {title}",
            captions: "Captions",
            settings: "Settings",
            pip: "PIP",
            menuBack: "Go back to previous menu",
            speed: "Speed",
            normal: "Normal",
            quality: "Quality",
            loop: "Loop",
            start: "Start",
            end: "End",
            all: "All",
            reset: "Reset",
            disabled: "Disabled",
            enabled: "Enabled",
            advertisement: "Ad",
            qualityBadge: {
              2160: "4K",
              1080: "FHD",
              720: "HD",
              480: "SD",
            },
          },
        }}

        source={{
          type: "video",
          title: movie.title.en,
          poster: movie.image.preview,
          sources: movie.source.uz.map((item) => item),
        }}
      />
      {/* <button data-plyr="languages" type="button" className="plyr__control plyr__control--forward" role="menuitem" aria-haspopup="true" id="language">
        <span>Language<span className="plyr__menu__value lang">UZ</span></span>
      </button> */}
    </div>
  )
}
