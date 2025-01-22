import { useRouter } from "next/router";
import { useStore, useUser } from "@/store/zustand";
import MoviesPlayer from "@/library/MoviesPlayer"
import Soon from "./soon";
import Need from "./need";

import Description from "./description";
import Credits from "./credits";
import Cast from "./cast";
import Review from "./review";

export default function MoviePlayer() {
  const movie = useStore(state => state.movie);
  const user = useUser(state => state.user);
  const { locale } = useRouter()

  return (
    <section id="section-player">
      <div className="wrapper-container">
        <div className="main" data-aos="fade-up">
          <Description text={movie.description[locale]} />
          <div className="watching">{user ? (movie.source ? <MoviesPlayer /> : <Soon />) : <Need />}</div>
          <Cast movie={movie} />
          <Review movie={movie} />
        </div>
        <Credits movie={movie} />
      </div>
    </section>
  );
}