import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import SeriesPlayer from "@/library/SeriesPlayer"
import { useStore } from "@/store/zustand";
import translate from "@/language/translate.json"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link as Scroll } from "react-scroll";

export default function Series() {
    const movie = useStore(state => state.movie);
    const [screenSize, setScreenSize] = useState([1280, 720]);
    const [episode, setEpisode] = useState(null)
    const scrollDemoRef = useRef(null);
    const { locale } = useRouter()

    useEffect(() => {
        setScreenSize([window.innerWidth, window.innerHeight])
        const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <div id="series-list">
        <div className="select-series">
            <h2>1-{movie.episodes.length} {translate[locale].serie.episodes}</h2>
            <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
            <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
            <div className="serie-wrapper" ref={scrollDemoRef}>
                <div className="child">
                    {movie.episodes.map((item, i) => (
                        screenSize[0] > 768 ? <Scroll
                            to="title-movie"
                            spy={true}
                            smooth={true}
                            offset={- 80}
                            duration={500}
                            className="card"
                            key={i}
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
                            key={i}
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
        </div>
        {episode != null && (<div className="watching-movie">
            <h2 id="title-movie">{movie.episodes[episode].title[locale]} <span>{episode + 1}</span></h2>
            <SeriesPlayer episode={episode} />
        </div>)}
    </div >
}