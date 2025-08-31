import { useStore, useUser } from "@/store/zustand";
import MoviesPlayer from "@/library/MoviesPlayer"
import Soon from "./player/soon";
import Need from "./player/need";

import Description from "./player/description";
import Credits from "./player/credits";
import Cast from "./player/cast";
import Review from "./player/review";
import MovieDto from '@/types/movies/movies.dto';

export default function MoviePlayer() {
  const { movie } = useStore() as { movie: MovieDto | null };
  const { user } = useUser();

  if (movie) return (
    <section id="section-player">
      <div className="wrapper-container">
        <div className="main" data-aos="fade-up">
          <Description movie={movie} />
          <div className="watching">
            {user ?
              (movie.source ?
                <MoviesPlayer />
                : <Soon />)
              : <Need />}
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