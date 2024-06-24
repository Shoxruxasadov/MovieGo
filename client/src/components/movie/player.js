import Plyr from "plyr-react";

export default function Player({ movie }) {
    console.log(movie);

    return (
        <section id="player">
            <div className="container">
                <Plyr
                    options={{
                        controls: [
                            "play-large",
                            "play",
                            "rewind",
                            "fast-forward",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "captions",
                            "settings",
                            // "pip",
                            "fullscreen"
                        ],
                        captions: { active: true, language: "auto", update: true },
                        previewThumbnails: { enabled: false, src: "" }
                    }}
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: movie.source,
                                type: "video/mp4",
                                size: movie.resolution
                            }
                        ],
                    }}
                />
            </div>
        </section>
    )
}
