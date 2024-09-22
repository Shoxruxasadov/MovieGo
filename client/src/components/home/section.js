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
                    {isSuccess ? movies.map(item => (
                        <Link
                            style={{ backgroundImage: `url(${type == 'studio' ? item.image : item.image.poster})` }}
                            href={type == 'studio' ? `/studio/${item.module}` : `/${item.type}/${item.name}`}
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
                                {type != "studio" && <p className="other">{item.studio[locale]} • <span>{item.mpa}+</span></p>}
                            </div>
                        </Link>
                    )) : Array(10).fill(<div className="card skeleton">
                        <div className="title">
                            <div className="resolution" />
                            <div className="text" />
                        </div>
                    </div>).map(item => item)}
                </div>
            </div>
        </section>
    )
}
