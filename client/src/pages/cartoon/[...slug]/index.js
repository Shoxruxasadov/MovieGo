import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import MovieHome from "@/components/movie/home"
import MoviePlayer from "@/components/movie/player"
import Root from "@/layouts/root"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"
import { useStore } from "@/store/zustand"
import MovieRelated from "@/components/movie/related"
import MovieCredits from "@/components/movie/credits"

export default function AppCartoon() {
  const getMovie = useStore(state => state.getMovie);
  const movie = useStore(state => state.movie);
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const { locale } = useRouter()

  useEffect(() => {
    setLoading(true)
    if (pathname) getMovie(pathname.split('/')[2]).finally(() => setLoading(false))
  }, [pathname])

  useEffect(() => {
    if (movie) document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`
    else document.querySelector("main").style.backgroundImage = `none`
  }, [movie, loading])

  if (loading) return <Loading />
  if (!movie) return <ErrorPage />
  return (
    <Root page="movie" title={movie.title[locale]}>
      <Header movie={true} />
      <Animated>
        <MovieHome />
        <MoviePlayer />
        <MovieCredits />
        <MovieRelated />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
