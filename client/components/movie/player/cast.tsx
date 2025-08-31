import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import MovieDto from "@/types/movies/movies.dto";
import LangDto from "@/types/movies/lang.dto";

export default function Cast({ movie }: { movie: MovieDto }) {
    const scrollDemoRef = useRef<HTMLDivElement | null>(null);
    const { t, i18n } = useTranslation();

    if (!movie.cast || movie.cast.length === 0) return
    return (
        <div className="box cast">
            <div className="title-cast">
                <h3>{t("movie.cast")}</h3>
                <div className="navigate">
                    <button onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft -= 700 }}><FaChevronLeft /></button>
                    <button onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft += 700 }}><FaChevronRight /></button>
                </div>
            </div>
            <div className="wrapper-cast" ref={scrollDemoRef} style={{ scrollBehavior: "smooth" }}>
                {movie.cast.map((item, i) => (
                    <div className="actor" key={i}>
                        <img src={item.actor.image} alt="avatar" />
                        <div>
                            <h4>{item.actor.name ? item.actor.name : item.role[i18n.language as keyof LangDto]}</h4>
                            {item.actor.name && <p>{item.role[i18n.language as keyof LangDto]}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
