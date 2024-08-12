import Plyr from "plyr-react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Player({ movie }) {
  const scrollDemoRef = useRef(null);

  return (
    <section id="player">
      <div className="container">
        <div className="title">
          <p className="description">{movie.description.en}</p>
          <div className="casts">
            <h2>Top Cast</h2>
            <div
              className="left"
              onClick={() => {
                scrollDemoRef.current.scrollLeft -= 700;
              }}
            >
              <FaChevronLeft />
            </div>
            <div
              className="right"
              onClick={() => {
                scrollDemoRef.current.scrollLeft += 700;
              }}
            >
              <FaChevronRight />
            </div>
            <div
              className="scrolling"
              ref={scrollDemoRef}
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="wrapper">
                {movie.cast.map((item, i) => (
                  <div className="cast" key={i}>
                    <img
                      src={
                        item.image ||
                        "https://lorenzon.uz/_next/image?url=%2Flanding%2Fteam%2Ftom.webp&w=128&q=75"
                      }
                      alt="avatar"
                    />
                    <div>
                      <h3>{item.name || item}</h3>
                      <p>{item.role || "Loki"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="player" id="plyr">
          <Plyr
            options={{
              enabled: true,
              title: "Axaxa",
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
              disableContextMenu: true,

              loadSprite: true,
              iconPrefix: "plyr",
              iconUrl: "https://cdn.plyr.io/3.7.8/plyr.svg",
              blankVideo: "https://cdn.plyr.io/static/blank.mp4",

              quality: {
                default: 1080,
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

              keyboard: {
                focused: true,
                global: false,
              },

              tooltips: {
                controls: false,
                seek: true,
              },

              captions: {
                active: false,
                language: "auto",
                // Listen to new tracks added after Plyr is initialized.
                // This is needed for streaming captions, but may result in unselectable options
                update: false,
              },

              fullscreen: {
                enabled: true, // Allow fullscreen?
                fallback: true, // Fallback using full viewport/window
                iosNative: true, // Use the native fullscreen in iOS (disables custom controls)
                // Selector for the fullscreen container so contextual / non-player content can remain visible in fullscreen mode
                // Non-ancestors of the player element will be ignored
                // container: null, // defaults to the player element
              },

              storage: {
                enabled: true,
                key: "plyr",
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
                "captions",
                "settings",
                "pip",
                "airplay",
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
                  2160: "UHD",
                  1080: "FHD",
                  720: "HD",
                  480: "SD",
                },
              },

              attributes: {
                embed: {
                  provider: "data-plyr-provider",
                  id: "data-plyr-embed-id",
                  hash: "data-plyr-embed-hash",
                },
              },

              ads: {
                enabled: false,
                publisherId: "",
                tagUrl: "",
              },

              previewThumbnails: {
                enabled: false,
                src: "",
              },
            }}
            source={{
              type: "video",
              // title: movie.title.en,
              title: "Oxoxo",
              poster: movie.image.preview,
              sources: movie.source.map((item) => ({
                src: item.film,
                size: item.size,
              })),
              //   tracks: [
              //     {
              //       kind: "captions",
              //       label: "English",
              //       srclang: "en",
              //       src: "/path/to/captions.en.vtt",
              //       default: true,
              //     },
              //   ],
            }}
          />

          {/* <div className="need">
            <p>You need to sign up or log in to watch movies</p>
            <div className="sign">
              <Link href="/signup">Sign Up</Link>
              <Link href="/login">Log In</Link>
            </div>
          </div> */}

          <div className="credits">
            <div className="card release">
              <p>Release </p>
              <p>{movie.issue}</p>
            </div>
            <div className="card timeline">
              <p>Timeline </p>
              <p>{movie.event}</p>
            </div>
            <div className="card grossing">
              <p>Grossing </p>
              <p>${movie.income}</p>
            </div>
            <div className="card budget">
              <p>Budget </p>
              <p>${movie.expense}</p>
            </div>
            <div className="card manufacturer">
              <p>Facturer </p>
              <p>{movie.manufacturer}</p>
            </div>
            <div className="card certificate">
              <p>Certificate </p>
              <p>{movie.certificate}</p>
            </div>
            <div className="card time">
              <p>Time </p>
              <p>{`${Math.floor(movie.duration / 60)}h ${Math.floor(
                movie.duration % 60
              )}m`}</p>
            </div>
            <div className="card country">
              <p>Country </p>
              <p>{movie.made}</p>
            </div>
            <div className="card admitted">
              <p>Admitted </p>
              <p>
                <span>{movie.admitted}+</span>
              </p>
            </div>
            <div className="card language">
              <p>Language </p>
              <p>
                {movie.languages.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
