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
import { usePlayer, useStore } from "@/store/zustand"
import MovieModule from "@/components/movie/module"

export default function AppMovie() {
  const getModule = useStore(state => state.getModule);
  const getMovie = useStore(state => state.getMovie);
  const modules = useStore(state => state.module);
  const movie = useStore(state => state.movie);
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)
    setType(null)
    if (pathname && pathname.split('/').length == 4) getMovie(pathname.split('/')[3]).finally(() => { setLoading(false); setType('movie') })
    if (pathname && pathname.split('/').length == 3) getModule(pathname.split('/')[2]).finally(() => { setLoading(false); setType('module') })
  }, [pathname])

  useEffect(() => {
    if (type == 'movie' && movie) {
      document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`
    } else {
      document.querySelector("main").style.backgroundImage = `none`
    }

    if (type == "module") {
      document.querySelector("main").style.minHeight = `calc(100svh - 88.9px)`;
    }
  }, [movie, loading, modules, type])

  if (loading) return <Loading />
  if (!movie && (!modules || modules.length==0 )) return <ErrorPage />
  return (
    <Root page="movie" title={type == 'movie' ? movie.title.en : type == 'module' ?  modules[0].studio : 'Loading'}>
      <Header movie={true} />
      <Animated>
        {type == 'movie' && <>
          <MovieHome />
          <MoviePlayer />
          <div id="shadow" />
        </>}
        {type == 'module' && <MovieModule />}
      </Animated>
      <Footer />
    </Root>
  )
}
