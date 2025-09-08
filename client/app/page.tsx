"use client";

import Root from "@/layouts/root";
import Hero from "@/components/home/hero";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Animated from "@/components/others/animated";
import MoviesSection from "@/components/home/modules/movies";
import StudiosSection from "@/components/home/modules/studios";
import Technical from "@/components/technical/hero";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "@/store/zustand";
import api from "@/library/axios";

export default function Home() {
  const { user, setUser } = useUser();
  const { t, i18n } = useTranslation()
  const { data: session } = useSession();

  useEffect(() => {
    if (((user && user.login == 'google') && session != undefined) && ((session?.user?.name != user?.name) || (session?.user?.image != user?.image))) {
      api.put(`/users/${user._id}`, { name: session?.user?.name, image: session?.user?.image }).then(({ data }) => setUser(data))
    }
  }, [session])

  return (
    <Root page="home">
      <Header />
      <Animated>
        <Hero />
        <MoviesSection module='movies' title={t("hero.movies")} />
        <MoviesSection module='series' title={t("hero.series")} />
        <StudiosSection module='studios' title={t("hero.studios")} />
        {/* <MoviesSection module='anime' title={t("hero.anime")} /> */}
        {/* <MoviesSection module='cartoon' title={t("hero.cartoons")} /> */}
        <div id="shadow" />
      </Animated>
      <Footer />
    </Root>
  );
  // return <Technical />
}


// <Head>
//   <title>{movie.title[i18n.language as keyof typeof movie.title]} • MovieGo</title>
//   <title>Captain America • MovieGo</title>
//   <meta name="keywords" content={movieKeywords} />
//   <meta name="description" content={movieDescription} />
// </Head>