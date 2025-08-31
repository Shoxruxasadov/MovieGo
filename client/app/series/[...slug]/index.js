import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"

import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import SerieHome from "@/components/serie/home"
import SeriePlayer from "@/components/serie/player"
import Root from "@/layouts/root"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"
import { useStore } from "@/store/zustand"
import Related from "@/components/movie/related"

export default function AppSerie() {
  const getMovie = useStore(state => state.getMovie);
  const movie = useStore(state => state.movie);
  const [movieload, setMovieload] = useState(true)
  const [imageload, setImageload] = useState(true)
  const params  = useParams()
  const pathname = usePathname()
  const { locale } = useRouter()

  console.log(params);

  useEffect(() => {
    setMovieload(true)
    if (pathname) getMovie(pathname.split('/')[2]).finally(() => setMovieload(false))
  }, [pathname])

  useEffect(() => {
    setImageload(true)
    if (movie) {
      const img = new Image();
      img.src = movie.image.banner;
      img.onload = () => {
        document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`;
        setImageload(false);
      };
      img.onerror = () => setImageload(false);
    } else {
      document.querySelector("main").style.backgroundImage = `none`
      setImageload(false)
    }
  }, [movie, movieload])

  if (movieload && imageload) return <Loading />
  if (!movie) return <ErrorPage />
  return (
    <Root page="serie" title={movie.title[locale]}>
      <Header movie={true} />
      <Animated>
        <SerieHome />
        <SeriePlayer />
        <Related />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
