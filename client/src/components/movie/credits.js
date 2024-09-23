import { useEffect, useState } from "react";
import Image from "next/image";
import translate from "@/language/translate.json"
import { useStore } from "@/store/zustand";
import { useRouter } from "next/router";
import Time from "@/utils/time";
import Release from "@/utils/release";
import Timeline from "@/utils/timeline";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

export default function MovieCredits() {
    const [posterScreen, setPosterScreen] = useState(false)
    const movie = useStore(state => state.movie);
    const { locale } = useRouter()

    return (
        <section id="movie-credits">
            <Image
                id="poster"
                width={405}
                height={600}
                src={movie.image.poster}
                alt={movie.title[locale]}
                data-aos="fade-up"
            />
            <div id="credits" data-aos="fade-up">
                <div className="line release">
                    <p>{translate[locale].movie.release}:</p>
                    <p><Release time={movie.release} /></p>
                </div>
                <div className="line timeline">
                    <p>{translate[locale].movie.timeline}: </p>
                    <p><Timeline time={movie.timeline} /></p>
                </div>
                <div className="line studio">
                    <p>{translate[locale].movie.studio}: </p>
                    <a href={`/studio/${movie.studio.module}`}>{movie.studio.name[locale]}</a>
                </div>
                <div className="line grossing">
                    <p>{translate[locale].movie.grossing}: </p>
                    <p>{movie.grossing ? `$${movie.grossing}` : "—"}</p>
                </div>
                <div className="line budget">
                    <p>{translate[locale].movie.budget}: </p>
                    <p>{movie.budget ? `$${movie.budget}` : "—"}</p>
                </div>
                <div className="line country">
                    <p>{translate[locale].movie.country}: </p>
                    <p>{movie.made}</p>
                </div>
                <div className="line time">
                    <p>{translate[locale].movie.duration}: </p>
                    <p><Time time={movie.duration} /></p>
                </div>
                <div className="line rating">
                    <p>{translate[locale].movie.rating}: </p>
                    <p>
                        {movie.ratings.map((item, i) => (
                            <span key={i}>{item} </span>
                        ))}
                    </p>
                </div>
                <div className="line language">
                    <p>{translate[locale].movie.language}: </p>
                    <p>
                        {movie.languages.map((item, i) => (
                            <span key={i}>{item} </span>
                        ))}
                    </p>
                </div>
            </div>
            {movie.directors.length > 0 && movie.producers.length > 0 && movie.screenwriters.length > 0 && <div id="authors" data-aos="fade-up">
                {movie.directors.length > 0 && <div className="directors">
                    <h3>{translate[locale].movie.directors}</h3>
                    <div className="wrapper">
                        {movie.directors.map((item, i) => (
                            <div className="director" key={i}>
                                <img src={item.image} alt="avatar" />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>}
                {movie.producers.length > 0 && <div className="producers">
                    <h3>{translate[locale].movie.producers}</h3>
                    <div className="wrapper">
                        {movie.producers.map((item, i) => (
                            <div className="producer" key={i}>
                                <img src={item.image} alt="avatar" />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>}
                {movie.screenwriters.length > 0 && <div className="screenwriters">
                    <h3>{translate[locale].movie.screenwriters}</h3>
                    <div className="wrapper">
                        {movie.screenwriters.map((item, i) => (
                            <div className="screenwriter" key={i}>
                                <img src={item.image} alt="avatar" />
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>}
        </section>
    );
}
