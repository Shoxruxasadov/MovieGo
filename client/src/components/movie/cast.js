import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router"
import { useRef } from "react";
import translate from "@/language/translate.json"

export default function Cast({ movie }) {
    const scrollDemoRef = useRef(null);
    const { locale } = useRouter()

    if (movie.cast.length === 0) return
    return (
        <div className="box cast">
            <div className="title-cast">
                <h3>{translate[locale].movie.cast}</h3>
                <div className="navigate">
                    <button onClick={() => { scrollDemoRef.current.scrollLeft -= 700 }}><FaChevronLeft /></button>
                    <button onClick={() => { scrollDemoRef.current.scrollLeft += 700 }}><FaChevronRight /></button>
                </div>
            </div>
            <div className="wrapper-cast" ref={scrollDemoRef} style={{ scrollBehavior: "smooth" }}>
                {movie.cast.map((item, i) => (
                    <div className="actor" key={i}>
                        <img src={item.image} alt="avatar" />
                        <div>
                            <h4>{item.name ? item.name : item.role}</h4>
                            {item.name && <p>{item.role || ""}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
