"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { useStore } from "@/store/zustand"
import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import MovieHome from "@/components/movie/home"
import MoviePlayer from "@/components/movie/player"
import Root from "@/layouts/root"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import Related from "@/components/movie/related"
import NotFoundPage from "@/app/not-found"
import Head from "next/head"
import MovieDto from "@/types/movies/movies.dto"
import { useTranslation } from "react-i18next"

export default function AppMovie() {
  const getMovie = useStore(state => state.getMovie);
  const movie = useStore(state => state.movie) as (MovieDto | null);
  const [movieload, setMovieload] = useState(true)
  const [imageload, setImageload] = useState(true)
  const pathname = usePathname()
  const params = useParams()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setMovieload(true)
    setImageload(true)
    if (pathname) getMovie(pathname.split('/')[2]).finally(() => setMovieload(false))
  }, [pathname])

  useEffect(() => {
    if (!movieload && movie?.image?.screen) {
      const img = new Image()
      img.src = movie.image.screen
      img.onload = () => { setImageload(false) }
      img.onerror = () => { setImageload(false) }
    } else if (!movie?.image?.screen) {
      setImageload(false)
    }
  }, [movie, movieload])

  if (movieload || imageload) return <Loading />
  if (movieload) return <Loading />
  if (!movie) return <NotFoundPage />
  return (
    <Root page="movies">
      <Head>
        <title>Captain America • MovieGo</title>
      </Head>

      <Header />
      <Animated url={movie.image.screen}>
        <MovieHome />
        <MoviePlayer />
        <Related />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
