import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";
import api from "@/library/axios";
import Link from "next/link"
import StudiosDto from "@/types/movies/studios.dto";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MoviesResponse {
    data: StudiosDto[];
    nextPage?: number;
}

export default function StudiosSection({ title }: { title: string }) {
    const [screenSize, setScreenSize] = useState<[number, number]>([0, 0]);
    const scrollDemoRef = useRef<HTMLDivElement | null>(null);
    const { ref, inView } = useInView()
    const { t, i18n } = useTranslation()

    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
        queryKey: [`studios`],
        queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/studios?page=${pageParam}`).then(({ data }) => data).catch(error => { throw error }),
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

    console.log(data);


    return (
        <section id="studios" data-aos="fade-up">
            <h2>{title}</h2>
            <div className='wrapper' ref={scrollDemoRef} >
                <div className="left" onClick={() => {
                    if (scrollDemoRef.current) {
                        scrollDemoRef.current.scrollLeft -=
                            screenSize[0] > 1024 && screenSize[1] > 576 ? 1100 : 780;
                    }
                }}><FaChevronLeft /></div>
                <div className="studios">
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
                                {page.data?.map((item: StudiosDto) => (
                                    <Link
                                        style={{ backgroundImage: `url(${item.image})` }}
                                        href={`/studio/${item.path}`}
                                        className="card"
                                        key={item._id}
                                    >
                                        <div className="shadow" />
                                        <div className="title">
                                            <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
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
