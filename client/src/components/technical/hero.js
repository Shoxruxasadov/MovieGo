import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Aos from "aos"

import Root from "@/layouts/root";
import Header from "@/components/technical/header";
import Animated from "@/components/others/animated";
import translate from "@/language/translate.json"

export default function Technical() {
  const { locale } = useRouter()

  useEffect(() => {
    Aos.init({ duration: 500 })
    document.querySelector("main").style.backgroundImage = `/hero/technical.webp`
  }, [])

  return (
    <Root page="technical">
      <Header />
      <Animated>
        <section id="hero">
          <div className="container">
            <motion.div className="title"
              initial={{ y: "-1rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "1rem", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p>{translate[locale].technicalprocess}</p>
            </motion.div>
          </div>
        </section>
        <div id="shadow" />
      </Animated>
    </Root>
  );
}