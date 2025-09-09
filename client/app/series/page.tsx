"use client";

import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Animated from "@/components/others/animated";
import Root from "@/layouts/root";
import { useInView } from 'react-intersection-observer'
import { useTranslation } from "react-i18next";
import MovieDto from "@/types/movies/movies.dto";
import api from "@/library/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Quality } from "@/utils/quality";

interface MoviesResponse {
  data: MovieDto[];
  nextPage?: number;
}

export default function Series() {
  const [columnCount, setColumnCount] = useState(6);
  const { ref, inView } = useInView()
  const { t, i18n } = useTranslation()

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
    queryKey: [module],
    queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/movies?page=${pageParam}`, { headers: { 'module': "series" } }).then(({ data }) => data).catch(error => { throw error }),
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
    { width: 1920, columns: 7 },
    { width: 2160, columns: 8 },
    { width: 2560, columns: 9 },
    { width: 3840, columns: 10 },
  ];

  const updateColumns = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let columns = breakpoints.find(bp => screenWidth <= bp.width)?.columns || 2;
    if (screenHeight < 640 && screenWidth < 1140) columns = 6;

    setColumnCount(columns);
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [updateColumns]);

  return (
    <Root page="movies-page">
      <Header />
      <Animated url="unset">
        <section className="filter">
          <h1>{t("header.series")}</h1>

        </section>
        <section className="movies">
          <div className="container"  style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
            {status === 'pending' ? Array.from({ length: 14 }).map((_, index) => (
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
                        <p className="other">{item.studio.title[i18n.language as keyof typeof item.studio.title]} • <span>{item.mpaa}+</span></p>
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
        </section >
      </Animated>
      <Footer />
    </Root>
  );
};
