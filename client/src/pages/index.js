import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Movies from "@/components/home/movies";
import Series from "@/components/home/series";
import Animated from "@/components/others/animated";

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
        <div id="imageshadow" />
        <Movies />
        {/* <Series /> */}
      </Animated>
      <Footer />
    </Root>
  );
}
