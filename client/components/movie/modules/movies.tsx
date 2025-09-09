import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import MovieDto from "@/types/movies/movies.dto";
import api from "@/library/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Quality } from "@/utils/quality";

interface MoviesResponse {
    data: MovieDto[];
    nextPage?: number;
}

export default function MoviesCollection({ path }: { path: string }) {
    const [columnCount, setColumnCount] = useState(6);
    const { t, i18n } = useTranslation()

    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
        queryKey: [module],
        queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/movies/${path}?page=${pageParam}`).then(({ data }) => data).catch(error => { throw error }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    })

    const breakpoints = [
        { width: 320, columns: 1 },
        { width: 576, columns: 2 },
        { width: 768, columns: 3 },
        { width: 991, columns: 3 },
        { width: 1024, columns: 4 },
        { width: 1280, columns: 4 },
        { width: 1440, columns: 5 },
        { width: 1536, columns: 6 },
        { width: 1680, columns: 7 },
        { width: 1920, columns: 8 },
        { width: 2560, columns: 9 },
        { width: 3840, columns: 10 },
    ];

    const updateColumns = useCallback(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let columns = breakpoints.find(bp => screenWidth <= bp.width)?.columns || 2;
        if (screenHeight < 600 && screenWidth < 1024) columns = 5;

        setColumnCount(columns);
    }, []);

    useEffect(() => {
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, [updateColumns]);

    if (hasNextPage) return (
        <section id="movies">
            <div className="container" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
                {/* {movies.map(item => (
                    <Link
                        href={`/${item.type}/${item.name}`}
                        className="card"
                        key={item._id}
                    >
                        <div className="shadow" />
                        <img src={item.image.poster} alt={item.title[i18n.language]} />
                        <div className="title">
                            <div className="resolution"><span>{item.resolution}</span></div>
                            <p className="type">{t("movie.free")}</p>
                            <h3>{item.title[i18n.language]}</h3>
                            <p className="other">{item.studio.title[i18n.language]} • <span>{item.mpa}+</span></p>
                        </div>
                    </Link>
                ))} */}
                {data?.pages?.map((page, i) => (
                    <React.Fragment key={page.nextPage}>
                        {page.data?.map((item: MovieDto) => (
                            <Link
                                href={`/${item.module}/${item.path}`}
                                className="card"
                                key={item._id}
                            >
                                <div className="shadow" />
                                <img src={item.image.poster} alt={item.title[i18n.language as keyof typeof item.title]} />
                                <div className="title">
                                    <div className="resolution"><span>{Quality(item.resolution[0])}</span></div>
                                    <p className="purchase">{item.purchase ? t("movie.paid") : t("movie.free")}</p>
                                    <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
                                    <p className="other">{item.studio.title[i18n.language as keyof typeof item.studio.title]} • <span>{item.mpaa}+</span></p>
                                    {!((item.type=="movie" && item.source) || (item?.source && 'episode' in item.source && item.source.episode?.length)) && <div id="soon"><span>{t("movie.soon")}</span></div>}
                                </div>
                            </Link>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}