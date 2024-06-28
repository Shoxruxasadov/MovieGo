import Plyr from "plyr-react";

export default function Player({ movie }) {
    console.log(movie);
    return (
        <section id="player">
            <div className="container">
                <div className="title">
                    <p className="description">{movie.description.en}</p>
                    <div className="casts">
                        <h2>Top Cast</h2>
                        <div className="scrolling">
                            <div className="wrapper">
                                {movie.cast.map((item, i) => (
                                    <div className="cast">
                                        <img src="https://lorenzon.uz/_next/image?url=%2Flanding%2Fteam%2Ftom.webp&w=128&q=75" alt="avatar" />
                                        <div>
                                            <h3>{item}</h3>
                                            <p>Captain America</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="player">
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
                            sources: movie.source.map((item) => ({
                                src: item.film,
                                size: item.size
                            })),
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
