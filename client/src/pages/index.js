import { useRouter } from "next/router";
import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Animated from "@/components/others/animated";
import Section from "@/components/home/section";
import translate from "@/language/translate.json"

export default function Home() {
  const { locale } = useRouter()

  useEffect(() => {
    Aos.init({ duration: 500 })
    document.querySelector("main").style.backgroundImage = `url("/spider/banner.webp")`
  })

  return (
    <Root page="home">
      <Header />
      <Animated>
        <Hero />
        <Section type='movie' title={translate[locale].hero.marvel-movies} route='movies' name='marvel-movies' />
        <Section type='serie' title={translate[locale].hero.marvel-series} route='movies' name='marvel-series' />
        <Section type='studio' title={translate[locale].hero.studios} route='studios' name='studios' />
        <Section type='movie' title={translate[locale].hero.famous-movies} route='famous' name='famous-movies' />
        <Section type='serie' title={translate[locale].hero.famous-series} route='famous' name='famous-series' />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  );
}

"Hi"