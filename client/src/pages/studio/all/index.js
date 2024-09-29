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
import translate from "@/language/translate.json"

export default function AllStudios() {
    const getAllMovies = useStore(state => state.getAllMovies);
    const allMovies = useStore(state => state.allMovies);
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    const { locale } = useRouter()

    useEffect(() => {
        setLoading(true)
        if (pathname) getAllMovies().finally(() => setLoading(false))
    }, [pathname])

    useEffect(() => {
        document.querySelector("main").style.backgroundImage = `none`
    }, [allMovies, loading, pathname])

    if (loading) return <Loading />
    if (!allMovies || allMovies.length == 0) return <ErrorPage />
    return (
        <Root page="studio" title={translate[locale].movie.allmovies}>
            <Header movie={true} />
            <Animated>
                <MovieStudio movies={allMovies} />
            </Animated>
            <Footer />
        </Root>
    )
}
