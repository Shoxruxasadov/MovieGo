import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Animated from "@/components/others/animated";
import Section from "@/components/home/section";

export default function Home() {

  useEffect(() => {
    Aos.init({ duration: 500 })
    document.querySelector("main").style.backgroundImage = `url("/spider/back.webp")`
  })

  return (
    <Root page="home">
      <Header />
      <Animated>
        <Hero />
        <Section type='movie' title='Movies' route='movies' name='movies' />
        {/* <Section type='serie' title='Series' route='movies' name='series' /> */}
        <Section type='module' title='Modules' route='modules' name='modules' />
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  );
}
