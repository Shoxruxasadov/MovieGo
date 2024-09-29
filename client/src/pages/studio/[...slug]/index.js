import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Root from "@/layouts/root"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Loading from "@/components/others/loading"
import Animated from "@/components/others/animated"
import ErrorPage from "@/pages/404"
import { useStore } from "@/store/zustand"
import MovieStudio from "@/components/studio/studio"
import { useRouter } from "next/router"

export default function AppStudios() {
  const getStudio = useStore(state => state.getStudio);
  const studio = useStore(state => state.studio);
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const { locale } = useRouter()

  useEffect(() => {
    setLoading(true)
    if (pathname) getStudio(pathname.split('/')[2]).finally(() => setLoading(false))
  }, [pathname])

  useEffect(() => {
    document.querySelector("main").style.backgroundImage = `none`
  }, [studio, loading, pathname])

  if (loading) return <Loading />
  if (!studio || studio.length == 0) return <ErrorPage />
  return (
    <Root page="studio" title={studio[0].studio.name[locale]}>
      <Header movie={true} />
      <Animated>
        <MovieStudio movies={studio} />
      </Animated>
      <Footer />
    </Root>
  )
}
