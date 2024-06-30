import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Section({ type, title, route, name }) {
    const [isScrolled, setScrolled] = useState(false)
    

    const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
        queryKey: [name],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/${route}`, { headers: { 'type': type } }).then(({ data }) => data)
    })

    const handleScroll = () => {
        if (document.getElementsByClassName(`wrapper-${type}`)[0].pageOffset > 10) setScrolled(true);
        else setScrolled(false);
    };

    useEffect(() => {
        document.getElementsByClassName(`wrapper-${type}`)[0].addEventListener("scroll", handleScroll, { passive: true });
        return () => document.getElementsByClassName(`wrapper-${type}`)[0].removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id={name}>
            <h2>{title}</h2>
            <div className="left"><FaChevronLeft /></div>
            <div className="right"><FaChevronRight /></div>
            <div className={isScrolled ? `wrapper-${type} active` : `wrapper-${type}`}>
                <div className={name}>
                    {isSuccess ? movies.map(item => (
                        <Link
                            style={{ backgroundImage: `url(${name == 'modules' ? item.image : item.image.poster})` }}
                            href={name == 'modules' ? `/movie/${item.module}` : `/movie/${item.module}/${item.name}`}
                            className="card"
                            key={item._id}
                        >
                            <div className="shadow" />
                            <div className="title">
                                {name != "modules" && <>
                                    <span className="resolution">{item.resolution}</span>
                                    <span className="format">{item.format}</span>
                                </>}
                                <h3>{item.title.en}</h3>
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
                        </div>
                    </>}
                </div>
            </div>
        </section>
    )
}
