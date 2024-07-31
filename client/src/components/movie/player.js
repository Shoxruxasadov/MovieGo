import Plyr from "plyr-react";

export default function Player({ movie }) {
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
                                    <div className="cast" key={i}>
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
                <div className="player" id="plyr">
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

                    <div className="credits">
                        <div className="card release">
                            <p>Release </p>
                            <p>{movie.issue}</p>
                        </div>
                        <div className="card release">
                            <p>MCU Timeline </p>
                            <p>{movie.event}</p>
                        </div>
                        <div className="card release">
                            <p>Grossing </p>
                            <p>${movie.income}</p>
                        </div>
                        <div className="card release">
                            <p>Budget </p>
                            <p>${movie.expense}</p>
                        </div>
                        <div className="card release">
                            <p>Other </p>
                            <p><span className="made">{movie.made}</span> <span className="admitted">{movie.admitted}+</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
