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

    const [page, setPage] = useState(1);
    const lastItemRef = useRef(null);

    const { data: movies, isSuccess, isLoading, isFetching, refetch } = useQuery({
        queryKey: [name, page],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/${route}?page=${page}`, { headers: { 'type': type } }).then(({ data }) => {
            if (movies == undefined) return data
            return [...movies, ...data]
        }),
        onSuccess: () => {
            console.log("next page");
            setPage((prevPage) => prevPage + 1)
        }
    })

    useEffect(() => {
        setScreenSize([window.innerWidth, window.innerHeight])
        const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    refetch();
                    // setPage((prevPage) => prevPage + 1)
                }
            },
            {
                rootMargin: '100px',
            }
        );

        if (lastItemRef.current) {
            observer.observe(lastItemRef.current);
        }

        return () => {
            if (lastItemRef.current) {
                observer.unobserve(lastItemRef.current);
            }
        };
    }, [isFetching, refetch]);

    return (
        <section id="movies" data-aos="fade-up">
            <h2>{title}</h2>
            <div className='wrapper' ref={scrollDemoRef} >
                <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>

                <div className="movies">
                    {isSuccess ? <>
                        {movies.map(item => (
                            <Link
                                style={{ backgroundImage: `url(${item.image.poster})` }}
                                href={`/${item.type}/${item.name}`}
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
                        ))}
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
                        </div>
                        {(isLoading || isFetching) && <div className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div>}
                        <div ref={lastItemRef} />
                    </> : <>
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
                </div>

                <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
            </div>
        </section >
    )
}
