import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import Link from "next/link";

import Player from "@/utils/player"
import release from "@/utils/release";
import timeline from "@/utils/timeline";
import { useStore } from "@/store/zustand";

export default function MoviePlayer() {
  const [module, setModule] = useState('Movie')
  const modules = ['Movie', 'Credits', "Authors"]
  const movie = useStore(state => state.movie);
  const scrollDemoRef = useRef(null);

  return (
    <section id="movie-player">
      <div className="container">
        <div className="title">
          <p className="description">{movie.description.en}</p>
          <div className="casts">
            <h2>Top Cast</h2>
            <div
              className="left"
              onClick={() => {
                scrollDemoRef.current.scrollLeft -= 700;
              }}
            >
              <FaChevronLeft />
            </div>
            <div
              className="right"
              onClick={() => {
                scrollDemoRef.current.scrollLeft += 700;
              }}
            >
              <FaChevronRight />
            </div>
            <div
              className="scrolling"
              ref={scrollDemoRef}
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="wrapper">
                {movie.cast.map((item, i) => (
                  <div className="cast" key={i}>
                    <img src={item.image} alt="avatar" />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.role || ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className="list-modules">
          {modules.map((item, i) => (
            <li className={`item${module == item ? ' selected' : ''}`} onClick={() => setModule(item)} key={i}>{item}</li>
          ))}
        </ul>

        {true ? <Player module={module == "Movie" ? 'visible' : ''} /> : <div id="need" className={module == "Movie" ? 'visible' : ''}>
          <p>You need to sign up or log in to watch movies</p>
          <div className="sign">
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Log In</Link>
          </div>
        </div>}

        <div id="credits" className={module == "Credits" ? 'visible' : ''}>
          <div className="card release">
            <p>Release </p>
            <p>{release(movie.release)}</p>
          </div>
          <div className="card timeline">
            <p>Timeline </p>
            <p>{timeline(movie.timeline)}</p>
          </div>
          <div className="card manufacturer">
            <p>Studio </p>
            <p>{movie.studio}</p>
          </div>
          <div className="card grossing">
            <p>Grossing </p>
            <p>${movie.grossing}</p>
          </div>
          <div className="card budget">
            <p>Budget </p>
            <p>${movie.budget}</p>
          </div>
          <div className="card time">
            <p>Duration </p>
            <p>{`${Math.floor(movie.duration / 60)}h ${Math.floor(
              movie.duration % 60
            )}m`}</p>
          </div>
          <div className="card admitted">
            <p>Rating </p>
            <p>
              {movie.ratings.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </p>
          </div>
          <div className="card language">
            <p>Language </p>
            <p>
              {movie.languages.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </p>
          </div>
          <div className="card country">
            <p>Country </p>
            <p>{movie.made}</p>
          </div>
        </div>

        <div id="authors" className={module == "Authors" ? 'visible' : ''}>
          <div className="directors">
            <h2>Directors</h2>
            <div className="wrapper">
              {movie.directors.map((item, i) => (
                <div className="director" key={i}>
                  <img src={item.image} alt="avatar" />
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="producers">
            <h2>Producers</h2>
            <div className="wrapper">
              {movie.producers.map((item, i) => (
                <div className="producer" key={i}>
                  <img src={item.image} alt="avatar" />
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="screenwriters">
            <h2>Screenwriters</h2>
            <div className="wrapper">
              {movie.screenwriters.map((item, i) => (
                <div className="screenwriter" key={i}>
                  <img src={item.image} alt="avatar" />
                  <div>
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}