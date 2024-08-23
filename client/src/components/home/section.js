import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Section({ type, title, route, name }) {
    const [screenSize, setScreenSize] = useState();
    const scrollDemoRef = useRef(null);

    const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
        queryKey: [name],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/${route}`, { headers: { 'type': type } }).then(({ data }) => data)
    })

    useEffect(() => {
        setScreenSize([window.innerWidth, window.innerHeight])
        const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section id={name}>
            <h2>{title}</h2>
            <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
            <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
            <div className='wrapper' ref={scrollDemoRef}>
                <div className={type}>
                    {isSuccess ? movies.map(item => (
                        <Link
                            style={{ backgroundImage: `url(${type == 'module' ? item.image : item.image.poster})` }}
                            href={type == 'module' ? `/movie/${item.module}` : `/movie/${item.module}/${item.name}`}
                            className="card"
                            key={item._id}
                        >
                            <div className="shadow" />
                            <div className="title">
                                {type != "module" && <>
                                    <span className="resolution">{item.resolution}</span>
                                    <span className="format">{item.format}</span>
                                </>}
                                {type != "module" && <p className="type">Bepul</p>}
                                {type == "module" ? <h3>{item.name}</h3> : <h3>{item.title.en}</h3>}
                                {type != "module" && <p className="other">{item.studio} • <span>{item.mpa}+</span></p>}
                            </div>
                        </Link>
                    )) : <>
                        <div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton" >
                            <div className="title">
                                <div className="resolution" />
                                <div className="format" />
                                <div className="text" />
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </section>
    )
}
