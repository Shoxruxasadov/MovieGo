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
        <section className="filter">
          <h1>{pathname.split('/')[2].replace(/[-_](.)/g, (_, c) => c.toUpperCase())}</h1>
        </section>
        <MovieCollection path={pathname.split('/')[2]} module={"studios"} />
      </Animated>
      <Footer />
    </Root>
  )
}
