import { useStore, useUser } from "@/store/zustand";
import Series from "./series";
import Soon from "../movie/player/soon";
import Need from "../movie/player/need";

import Description from "../movie/player/description";
import Credits from "../movie/player/credits";
import Cast from "../movie/player/cast";
import Review from "../movie/player/review";

export default function SeriePlayer() {
  const { movie } = useStore();
  const { user } = useUser();

  if (movie) return (
    <section id="section-player">
      <div className="wrapper-container">
        <div className="main" data-aos="fade-up">
          <Description movie={movie} />
          <div className="watching">
            {user ? (movie?.source && "episode" in movie.source && movie.source.episode?.length ? <Series /> : <Soon />) : <Need />}
          </div>
          <Cast movie={movie} />
          <Credits movie={movie} position='left' />
          <Review movie={movie} />
        </div>
        <Credits movie={movie} position='right' />
      </div>
    </section>
  );
}