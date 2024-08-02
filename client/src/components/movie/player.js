import Plyr from "plyr-react";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Player({ movie }) {
    const scrollDemoRef = useRef(null);

    return (
        <section id="player">
            <div className="container">
                <div className="title">
                    <p className="description">{movie.description.en}</p>
                    <div className="casts">
                        <h2>Top Cast</h2>
                        <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= 700 }}><FaChevronLeft /></div>
                        <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += 700 }}><FaChevronRight /></div>
                        <div className="scrolling" ref={scrollDemoRef} style={{ scrollBehavior: "smooth" }}>
                            <div className="wrapper">
                                {movie.cast.map((item, i) => (
                                    <div className="cast" key={i}>
                                        <img src={item.image || "https://lorenzon.uz/_next/image?url=%2Flanding%2Fteam%2Ftom.webp&w=128&q=75"} alt="avatar" />
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
                        <div className="card time">
                            <p>Time </p>
                            <p>{`${Math.floor(movie.duration / 60)}h ${Math.floor(movie.duration % 60)}m`}</p>
                        </div>
                        <div className="card country">
                            <p>Country </p>
                            <p>{movie.made}</p>
                        </div>
                        <div className="card admitted">
                            <p>Admitted </p>
                            <p><span>{movie.admitted}+</span></p>
                        </div>
                        <div className="card language">
                            <p>Language </p>
                            <p>{movie.languages.map((item, i) => (
                                <span key={i}>{item}</span>
                            ))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
