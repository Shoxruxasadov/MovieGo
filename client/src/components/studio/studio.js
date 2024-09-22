import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import translate from "@/language/translate.json"
import { useStore } from "@/store/zustand";

export default function MovieStudio() {
    const studio = useStore(state => state.studio);
    const [columnCount, setColumnCount] = useState(6);
    const { locale } = useRouter()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2340) setColumnCount(10);
            if (window.innerWidth >= 2140 && window.innerWidth < 2340) setColumnCount(9);
            if (window.innerWidth >= 1940 && window.innerWidth < 2140) setColumnCount(8);
            if (window.innerWidth >= 1740 && window.innerWidth < 1940) setColumnCount(7);
            if (window.innerWidth >= 1440 && window.innerWidth < 1740) setColumnCount(6);
            if (window.innerWidth >= 1280 && window.innerWidth < 1440) setColumnCount(5);
            if (window.innerWidth >= 1024 && window.innerWidth < 1280) setColumnCount(4);
            if (window.innerWidth >= 440 && window.innerWidth < 1024) setColumnCount(3);
            if (window.innerHeight < 600 && window.innerWidth < 1024) setColumnCount(5);
            if (window.innerWidth < 440) setColumnCount(2);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section>
            <div className="container" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                {studio.map(item => (
                    <Link
                        href={`/${item.type}/${item.name}`}
                        className="card"
                        key={item._id}
                    >
                        <div className="shadow" />
                        <img src={item.image.poster} alt={item.title[locale]} />
                        <div className="title">
                            <div className="resolution"><span>{item.resolution}</span></div>
                            <p className="type">{translate[locale].movie.free}</p>
                            <h3>{item.title[locale]}</h3>
                            <p className="other">{item.studio[locale]} • <span>{item.mpa}+</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
