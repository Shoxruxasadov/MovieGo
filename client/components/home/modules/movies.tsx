import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";
import api from "@/library/axios";
import Link from "next/link"
import MovieDto from "@/types/movies/movies.dto";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Quality } from "@/utils/quality";

interface MoviesResponse {
    data: MovieDto[];
    nextPage?: number;
}

export default function MoviesSection({ module, title }: { module: string; title: string }) {
    const [screenSize, setScreenSize] = useState<[number, number]>([0, 0]);
    const scrollDemoRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView()
    const { t, i18n } = useTranslation()

    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
        queryKey: [module],
        queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/movies?page=${pageParam}`, { headers: { 'module': module } }).then(({ data }) => data).catch(error => { throw error }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        setScreenSize([window.innerWidth, window.innerHeight])
        const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // console.log(data);


    useEffect(() => {
        if (inView) fetchNextPage()
    }, [fetchNextPage, inView])

    return (
        <section id={module} data-aos="fade-up">
            <h2>{title}</h2>
            <div className='wrapper' ref={scrollDemoRef} >
                <div className="left" onClick={() => {
                    if (scrollDemoRef.current) {
                        scrollDemoRef.current.scrollLeft -=
                            screenSize[0] > 1024 && screenSize[1] > 576 ? 1100 : 780;
                    }
                }}><FaChevronLeft /></div>
                <div className={module}>
                    {status === 'pending' ? Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="card skeleton">
                            <div className="title">
                                <div className="resolution" />
                                <div className="text" />
                            </div>
                        </div>
                    )) : <>
                        {data?.pages.map((page, i) => (
                            <React.Fragment key={page.nextPage}>
                                {page.data?.map((item: MovieDto) => (
                                    <Link
                                        style={{ backgroundImage: `url(${item.image.poster})` }}
                                        href={`/${item.module}/${item.path}`}
                                        className="card"
                                        key={item._id}
                                    >
                                        <div className="shadow" />
                                        <div className="title">
                                            <div className="resolution"><span>{Quality(item.resolution[0])}</span></div>
                                            <p className="purchase">{item.purchase ? t("movie.paid") : t("movie.free")}</p>
                                            <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
                                            <p className="other">{item.studio.title[i18n.language  as keyof typeof item.studio.title]} • <span>{item.mpaa}+</span></p>
                                        </div>
                                    </Link>
                                ))}
                            </React.Fragment>
                        ))}
                    </>}
                    {isFetchingNextPage && <div className="card skeleton">
                        <div className="title">
                            <div className="resolution" />
                            <div className="text" />
                        </div>
                    </div>}
                    <div ref={ref} />
                </div>
                <div className="right" onClick={() => {
                    if (scrollDemoRef.current) {
                        scrollDemoRef.current.scrollLeft +=
                            screenSize[0] > 1024 && screenSize[1] > 576 ? 1100 : 780;
                    }
                }}><FaChevronRight /></div>
            </div>
        </section >
    )
}
