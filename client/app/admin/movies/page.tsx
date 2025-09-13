"use client"

import Admins from "@/layouts/admins";
import api from "@/library/axios";
import MoviesDto from "@/types/movies/movies.dto";
import MovieDto from "@/types/movies/movies.dto";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from "@tanstack/react-query";
import { Quality } from "@/utils/quality";


interface MoviesResponse {
  data: MovieDto[];
  nextPage?: number;
}

export default function AdminMovies() {
  const [columnCount, setColumnCount] = useState(6);
  const { ref, inView } = useInView()
  const { t, i18n } = useTranslation()

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery<MoviesResponse>({
    queryKey: ["allMovies"],
    queryFn: ({ pageParam = 0 }) => api.get<MoviesResponse>(`/admin/movies?page=${pageParam}`).then(({ data }) => data).catch(error => { throw error }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const breakpoints = [
    { width: 576, columns: 1 },
    { width: 768, columns: 2 },
    { width: 991, columns: 2 },
    { width: 1024, columns: 3 },
    { width: 1280, columns: 3 },
    { width: 1440, columns: 4 },
    { width: 1536, columns: 5 },
    { width: 1680, columns: 6 },
    { width: 1920, columns: 6 },
    { width: 2160, columns: 7 },
    { width: 2560, columns: 8 },
    { width: 3840, columns: 9 },
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

  return (
    <Admins page="admin-movies">
      <header><div id="wrapper">
        <h1>{t("admin.sidebar.movies")}</h1>
        <Link href='movies/add'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14.5 6.50049H17.5M17.5 6.50049H20.5M17.5 6.50049V9.50049M17.5 6.50049V3.50049" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.55078 15.5005C2.61472 14.8504 2.75923 14.4129 3.08582 14.0863C3.67161 13.5005 4.61442 13.5005 6.50004 13.5005C8.38565 13.5005 9.32846 13.5005 9.91425 14.0863C10.5 14.6721 10.5 15.6149 10.5 17.5005C10.5 19.3861 10.5 20.3289 9.91425 20.9147C9.32846 21.5005 8.38565 21.5005 6.50004 21.5005C4.61442 21.5005 3.67161 21.5005 3.08582 20.9147C2.77645 20.6053 2.63047 20.1964 2.56158 19.6015" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.5 6.50049C2.5 4.61487 2.5 3.67206 3.08579 3.08627C3.67157 2.50049 4.61438 2.50049 6.5 2.50049C8.38562 2.50049 9.32843 2.50049 9.91421 3.08627C10.5 3.67206 10.5 4.61487 10.5 6.50049C10.5 8.38611 10.5 9.32892 9.91421 9.9147C9.32843 10.5005 8.38562 10.5005 6.5 10.5005C4.61438 10.5005 3.67157 10.5005 3.08579 9.9147C2.5 9.32892 2.5 8.38611 2.5 6.50049Z" stroke="white" strokeWidth="1.5" />
            <path d="M13.5 17.5005C13.5 15.6149 13.5 14.6721 14.0858 14.0863C14.6716 13.5005 15.6144 13.5005 17.5 13.5005C19.3856 13.5005 20.3284 13.5005 20.9142 14.0863C21.5 14.6721 21.5 15.6149 21.5 17.5005C21.5 19.3861 21.5 20.3289 20.9142 20.9147C20.3284 21.5005 19.3856 21.5005 17.5 21.5005C15.6144 21.5005 14.6716 21.5005 14.0858 20.9147C13.5 20.3289 13.5 19.3861 13.5 17.5005Z" stroke="white" strokeWidth="1.5" />
          </svg>
          <span>Add Movies</span>
        </Link>
      </div></header>
      <div id="content">
        <div className="container" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
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
                    href={`/admin/${item.type}/${item.path}`}
                    className="card"
                    key={item._id}
                  >
                    <div className="shadow" />
                    <div className="title">
                      <div className="resolution"><span>{Quality(item.resolution[0])}</span></div>
                      <p className="purchase">{item.purchase ? t("movie.paid") : t("movie.free")}</p>
                      <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
                      <p className="other">{item.studio.title[i18n.language as keyof typeof item.studio.title]} • <span>{item.mpaa}+</span></p>
                      {!((item.type == "movie" && item.source) || (item?.source && 'episode' in item.source && item.source.episode?.length)) && <div id="soon"><span>{t("movie.soon")}</span></div>}
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
      </div>
    </Admins>
  )
}
