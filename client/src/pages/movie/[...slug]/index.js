import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Watch from "@/components/movie/watch"
import Movie from "@/components/movie/movie"
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

  const { data: movie, isLoading, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['searchData'],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${pathname.split('/')[3]}`).then(({ data }) => data)
  })

  useEffect(() => {
    if (movie && !isFetching) document.querySelector("main").style.backgroundImage = `url(${movie.image.banner})`
    else document.querySelector("main").style.backgroundImage = `none`
  }, [movie, isFetching])

  console.log(!movie);

  if (isFetching) return <Loading />
  if (!movie) return <ErrorPage />
  if (isSuccess) return (
    <Root page="home" title={movie.title.en}>
      <Header />
      <Animated>
        <Watch movie={movie} />
        <div id="imageshadow" />
        <Movie movie={movie} />
      </Animated>
      <Footer />
    </Root>
  )
}
