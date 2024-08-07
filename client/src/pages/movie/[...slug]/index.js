import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Watch from "@/components/movie/watch"
import Player from "@/components/movie/player"
import Root from "@/layouts/root"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"

export default function AppMovie() {
  const pathname = usePathname()

  const { data: movie, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['movie'],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${pathname.split('/')[3]}`).then(({ data }) => data)
  })

  console.log(movie);

  useEffect(() => {
    if (!isFetching && isSuccess) document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`
    else document.querySelector("main").style.backgroundImage = `none`
  }, [isFetching])

  if (isFetching) return <Loading />
  if (isError || !movie) return <ErrorPage />
  if (isSuccess) return (
    <Root page="movie" title={movie.title.en}>
      <Header />
      <Animated>
        <Watch movie={movie} />
        <Player movie={movie} />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
