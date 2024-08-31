import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import SeriesPlayer from "@/library/SeriesPlayer"
import { useStore } from "@/store/zustand";
import translate from "@/language/translate.json"
import { Link as Scroll } from "react-scroll";

export default function Series({ module }) {
    const [screenSize, setScreenSize] = useState(1280);
    const [episode, setEpisode] = useState(null)
    const movie = useStore(state => state.movie);
    const pathname = usePathname()
    const { locale } = useRouter()
    const router = useRouter()

    useEffect(() => {
        setScreenSize(window.innerWidth)
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <div id="series-list" className={module == "Serie" ? '' : 'hide'}>
        <h2>1-{movie.episodes.length} {translate[locale].serie.episodes}</h2>

        <div className="serie-wrapper">
            <div className="child">
                {movie.episodes.map((item, i) => (
                    screenSize > 768 ? <Scroll
                        to="title-movie"
                        spy={true}
                        smooth={true}
                        offset={- 80}
                        duration={500}
                        className="card"
                        onClick={() => setEpisode(i)}
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="title">
                            <div className="info">
                                <p>{translate[locale].serie.episode} {i + 1}</p>
                                <p>{item.duration}{translate[locale].movie.m}</p>
                            </div>
                            <h4>{item.title[locale]}</h4>
                        </div>
                        <div className="shadow" />
                    </Scroll> : <div
                        className="card"
                        onClick={() => setEpisode(i)}
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="title">
                            <div className="info">
                                <p>{translate[locale].serie.episode} {i + 1}</p>
                                <p>{item.duration}{translate[locale].movie.m}</p>
                            </div>
                            <h4>{item.title[locale]}</h4>
                        </div>
                        <div className="shadow" />
                    </div>
                ))}
            </div>
        </div>

        {
            episode != null && (<>
                <h2 id="title-movie">{translate[locale].movie.movie}</h2>
                <SeriesPlayer episode={episode} />
            </>)
        }
    </div >
}