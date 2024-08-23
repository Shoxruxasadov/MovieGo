import { Link as Scroll } from "react-scroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/zustand";
import Link from "next/link";

export default function MovieModule() {
    const module = useStore(state => state.module);
    const [columnCount, setColumnCount] = useState(6);

    console.log(module);

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
        <section id="movie-module">
            <div className="container" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`, }}>
                {module.map(item => (
                    <Link
                        href={`/movie/${item.module}/${item.name}`}
                        className="card"
                        key={item._id}
                    >
                        <div className="shadow" />
                        <img src={item.image.poster} alt="poster" />
                        <div className="title">
                            <span className="resolution">{item.resolution}</span>
                            <span className="format">{item.format}</span>
                            <p className="type">Bepul</p>
                            <h3>{item.title.en}</h3>
                            <p className="other">{item.studio} • <span>{item.mpa}+</span></p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
