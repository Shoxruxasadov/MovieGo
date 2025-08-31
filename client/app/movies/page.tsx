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
import React from "react";
import Link from "next/link";
import { Quality } from "@/utils/quality";

interface MoviesResponse {
  data: MovieDto[];
  nextPage?: number;
}

export default function Movies() {
  const { ref, inView } = useInView()
  const { t, i18n } = useTranslation()

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
    queryKey: [module],
    queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/movies?page=${pageParam}`, { headers: { 'module': "movies" } }).then(({ data }) => data).catch(error => { throw error }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <Root page="movies-page">
      <Header />
      <Animated url="unset">
        <section className="filter">
          <h1>{t("header.movies")}</h1>

        </section>
        <section className="movies">
          <div className="container">
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
