import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Watch from "@/components/movie/watch"
import Player from "@/components/movie/player"
import Root from "@/layouts/root"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"

export default function AppMovie() {
  const [getter, setGetter] = useState(false)
  const pathname = usePathname()

  const { data, isError, isSuccess, isFetching, refetch } = useQuery({
    queryKey: ['movie'],
    queryFn: () => {
      if (getter) return data
      return axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/${pathname.split('/')[3]}`).then(({ data }) => data).finally(() => setGetter(true))
    }
  })

  useEffect(() => {
    if (!isFetching && isSuccess && movie) document.querySelector("main").style.backgroundImage = `url(${data.image.banner})`
    else document.querySelector("main").style.backgroundImage = `none`
  }, [isFetching])

  if (isFetching) return <Loading />
  if (isError || !data) return <ErrorPage />
  return (
    <Root page="movie" title={data.title.en}>
      <Header />
      <Animated>
        <Watch movie={data} />
        <Player movie={data} />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  )
}
