import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import translate from "@/language/translate.json"

export default function Section({ type, title, route, name }) {
    const [screenSize, setScreenSize] = useState();
    const { locale } = useRouter()
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
        <section id={name} data-aos="fade-up">
            <h2>{title}</h2>
            <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
            <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
            <div className='wrapper' ref={scrollDemoRef} >
                <div className={type}>
                    {isSuccess && type == "studio" && <Link
                        style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/moviegouz.appspot.com/o/movies%2Fmovies.webp?alt=media&token=8f67adde-3360-4542-9d07-c24c9a03161d)` }}
                        href="/studio/comics"
                        className="card"
                    >
                        <div className="shadow" />
                        <div className="title">
                            <h3>{translate[locale].movie.marvelcomics}</h3>
                        </div>
                    </Link>}
                    {isSuccess ? movies.map(item => (
                        <Link
                            style={{ backgroundImage: `url(${type == 'studio' ? item.image : item.image.poster})` }}
                            href={route == "movies" ? `/marvel-${item.type}/${item.name}` : route == 'studios' ? `/studio/${item.module}` : route == 'famous' ? `/famous-${item.type}/${item.name}` : "/"}
                            className="card"
                            key={item._id}
                        >
                            <div className="shadow" />
                            <div className="title">
                                {type != "studio" && <>
                                    <div className="resolution"><span>{item.resolution}</span></div>
                                </>}
                                {type != "studio" && <p className="type">{translate[locale].movie.free}</p>}
                                {type == "studio" ? <h3>{item.name[locale]}</h3> : <h3 title={item.title[locale]}>{item.title[locale]}</h3>}
                                {type != "studio" && <p className="other">{item.studio.name[locale]} • <span>{item.mpa}+</span></p>}
                            </div>
                        </Link>
                    )) : <>
                        <div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div><div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div>
                    </>}
                    {isSuccess && type == "studio" && <Link
                        style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/moviegouz.appspot.com/o/movies%2Ffamous.webp?alt=media&token=2aecc90f-02f7-4bfc-9339-57f4ee5bbf2d)` }}
                        href="/studio/famous"
                        className="card"
                    >
                        <div className="shadow" />
                        <div className="title">
                            <h3>{translate[locale].movie.famousmovies}</h3>
                        </div>
                    </Link>}
                </div>
            </div>
        </section >
    )
}
