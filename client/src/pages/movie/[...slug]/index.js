import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import MovieHome from "@/components/movie/home"
import MoviePlayer from "@/components/movie/player"
import Root from "@/layouts/root"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"
import { useStore } from "@/store/zustand"

export default function AppMovie() {
  const getMovie = useStore(state => state.getMovie);
  const loading = useStore(state => state.loading);
  const movie = useStore(state => state.movie);
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) getMovie(pathname.split('/')[3])
  }, [pathname])

  useEffect(() => {
    if (movie) document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`
    else document.querySelector("main").style.backgroundImage = `none`
  }, [movie, loading])

  if (loading) return <Loading />
  if (!movie) return <ErrorPage />
  return (
    <Root page="movie" title={movie.title.en}>
      <Header movie={true}/>
      <Animated>
        <MovieHome />
        <MoviePlayer />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
