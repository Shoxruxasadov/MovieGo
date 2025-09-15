import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
import SeriesPlayer from "@/library/SeriesPlayer"
import { useStore } from "@/store/zustand";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link as Scroll } from "react-scroll";
import { useTranslation } from "react-i18next"
import MoviesDto from "@/types/movies/movies.dto";

export default function Series() {
    const { movie } = useStore() as { movie: MoviesDto | null }; // ✅ MovieDto emas, MoviesDto
    const [screenSize, setScreenSize] = useState<[number, number]>([1280, 720]);
    const [episode, setEpisode] = useState<number | null>(null);
    const scrollDemoRef = useRef<HTMLDivElement>(null);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setScreenSize([window.innerWidth, window.innerHeight])
        const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <div id="series-list">
        <div className="select-series">
            <div className="title-cast">
                {movie?.source && "seasons" in movie.source && (
                    <h3>1-{movie?.source?.episode?.length} {t("serie.episodes")}</h3>
                )}
                <div className="navigate">
                    <button
                        onClick={() => {
                            if (scrollDemoRef.current)
                                scrollDemoRef.current.scrollLeft -= 700;
                        }}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={() => {
                            if (scrollDemoRef.current)
                                scrollDemoRef.current.scrollLeft += 700;
                        }}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            <div className="serie-wrapper" ref={scrollDemoRef}>
                <div className="child">
                    {movie?.source && "episode" in movie.source &&
                        movie.source.episode?.map((item, i) => (
                            screenSize[0] > 768 ? <Scroll
                                to="title-movie"
                                spy={true}
                                smooth={true}
                                offset={- 80}
                                duration={500}
                                className="card"
                                key={i}
                                onClick={() => setEpisode(i)}
                                style={{ backgroundImage: `url(${item.preview})` }}
                            >
                                <div className="title">
                                    <div className="info">
                                        <p>{t("serie.episode")} {i + 1}</p>
                                        <p>{item.duration}{t("movie.m")}</p>
                                    </div>
                                    <h4>{item.title[i18n.language as keyof typeof movie.title]}</h4>
                                </div>
                                <div className="shadow" />
                            </Scroll> : <div
                                key={i}
                                className="card"
                                onClick={() => setEpisode(i)}
                                style={{ backgroundImage: `url(${item.preview})` }}
                            >
                                <div className="title">
                                    <div className="info">
                                        <p>{t("serie.episode")} {i + 1}</p>
                                        <p>{item.duration}{t("movie.m")}</p>
                                    </div>
                                    <h4>{item.title[i18n.language as keyof typeof movie.title]}</h4>
                                </div>
                                <div className="shadow" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
        {episode != null && <SeriesPlayer episode={episode} />}
    </div >
}