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

export default function FamousStudios() {
    const getAllFamous = useStore(state => state.getAllFamous);
    const allFamous = useStore(state => state.allFamous);
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    const { locale } = useRouter()

    useEffect(() => {
        setLoading(true)
        if (pathname) getAllFamous().finally(() => setLoading(false))
    }, [pathname])

    useEffect(() => {
        document.querySelector("main").style.backgroundImage = `none`
    }, [allFamous, loading, pathname])

    if (loading) return <Loading />
    if (!allFamous || allFamous.length == 0) return <ErrorPage />
    return (
        <Root page="studio" title={translate[locale].movie.allFamous}>
            <Header movie={true} />
            <Animated>
                <MovieStudio movies={allFamous} />
            </Animated>
            <Footer />
        </Root>
    )
}
