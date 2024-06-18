import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Movies from "@/components/home/movies";
import Series from "@/components/home/series";

export default function Home() {
  useEffect(() => { Aos.init({ duration: 500 }) })

  return (
    <Root page="home">
      <Header />
      <main>
        <Hero />
        <div id="imageshadow"></div>
        <Movies />
        <Series />
      </main>
      <Footer />
    </Root>
  );
}
