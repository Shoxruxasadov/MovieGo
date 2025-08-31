import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Header from "@/components/technical/header";
import Animated from "@/components/others/animated";
import Root from "@/layouts/root";

export default function Technical() {
  const { t } = useTranslation();

  return (
    <Root page="home">
      <Header />
      <Animated url={"/hero/technical.webp"}>
        <section id="hero">
          <div className="container">
            <motion.div className="technical-title"
              initial={{ y: "-1rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "1rem", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="technical">{t("technicalprocess")}</p>
            </motion.div>
          </div>
        </section>
        <div id="shadow" />
      </Animated>
    </Root>
  );
}