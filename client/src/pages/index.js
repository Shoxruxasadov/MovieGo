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
        <Section type='movie' title={translate[locale].header.movies} route='movies' name='movies' />
        <Section type='serie' title={translate[locale].header.serials} route='movies' name='series' />
        <Section type='studio' title={translate[locale].header.studios} route='studios' name='studios' />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  );
}
