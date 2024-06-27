import Plyr from "plyr-react";

export default function Player({ movie }) {
    return (
        <section id="player">
            <div className="container">
                <Plyr
                    options={{
                        controls: [
                            "play-large",
                            "rewind",
                            "play",
                            "fast-forward",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "captions",
                            "settings",
                            "fullscreen",
                        ],
                    }}
                    source={{
                        type: "video",
                        poster: movie.image.preview,
                        sources: [
                            {
                                src: movie.source[0].film,
                                size: movie.source[0].size
                            }
                        ],
                    }}

                />
            </div>
        </section>
    )
}
