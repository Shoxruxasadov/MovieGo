import { useRouter } from "next/router";
import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Animated from "@/components/others/animated";
import Section from "@/components/home/section";
import language from "@/language/translate.json"
import Technical from "@/components/technical/hero";

export default function Home() {

  return <Technical />

  const { locale } = useRouter()
  
  useEffect(() => {
    Aos.init({ duration: 500 })
    document.querySelector("main").style.backgroundImage = `url("/spider/banner.webp")`
  },[])
 
  return (
    <Root page="home">
      <Header />
      <Animated>
        <Hero />
        <Section type='movies' title={language[locale].hero.movies} route='movies' name='movies' />
        {/* <Section type='series' title={translate[locale].hero.series} route='movies' name='series' />
        <Section type='studios' title={translate[locale].hero.studios} route='studios' name='studios' />
        <Section type='anime' title={translate[locale].hero.anime} route='movies' name='anime' />
        <Section type='cartoon' title={translate[locale].hero.cartoons} route='movies' name='cartoon' /> */}
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  );
}