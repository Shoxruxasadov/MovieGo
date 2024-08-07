import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Section({ type, title, route, name }) {
    const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
        queryKey: [name],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/${route}`, { headers: { 'type': type } }).then(({ data }) => data)
    })

    const scrollDemoRef = useRef(null);


    return (
        <section id={name}>
            <h2>{title}</h2>
            <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= 600 }}><FaChevronLeft /></div>
            <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += 600 }}><FaChevronRight /></div>
            <div className='wrapper' ref={scrollDemoRef} style={{scrollBehavior: "smooth"}}>
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
