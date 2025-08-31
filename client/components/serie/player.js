import { useRouter } from 'next/navigation'
import { useStore, useUser } from "@/store/zustand";
import Series from "./series";
import Soon from "../movie/soon";
import Need from "../movie/need";

import Description from "../movie/description";
import Credits from "../movie/credits";
import Cast from "../movie/cast";
import Review from "../movie/review";

export default function SeriePlayer() {
  const { movie } = useStore();
  const { user } = useUser();
  const { locale } = useRouter()

  return (
    <section id="section-player">
      <div className="wrapper-container">
        <div className="main" data-aos="fade-up">
          <Description text={movie.description[locale]} />
          <div className="watching">{user ? (movie.episodes ? <Series /> : <Soon />) : <Need />}</div>
          <Cast movie={movie} />
          <Review movie={movie} />
        </div>
        <Credits movie={movie} />
      </div>
    </section>
  );
}