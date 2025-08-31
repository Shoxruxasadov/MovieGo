"use client"

import Footer from "@/components/home/footer"
import Header from "@/components/home/header"
import Root from "@/layouts/root"
import { usePathname } from "next/navigation"
import Animated from "@/components/others/animated"
import MovieCollection from "@/components/movie/modules/studio";

export default function AppStudios() {
  const pathname = usePathname()
  
  return (
    <Root page="studio">
      <Header />
      <Animated url="unset">
        <section className="studios">
            <div className="container">
            <h1>Studios</h1>
            <br />
            </div>
        </section>
        <MovieCollection path={pathname.split('/')[2]} module={"studios"} />
      </Animated>
      <Footer />
    </Root>
  )
}
