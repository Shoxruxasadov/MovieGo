import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store/zustand";
import Player from "@/utils/player"

export default function MoviePlayer() {
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
        <div className="see">
          <Player />

          {/* 
          <div id="need">
            <p>You need to sign up or log in to watch movies</p>
            <div className="sign">
              <Link href="/signup">Sign Up</Link>
              <Link href="/login">Log In</Link>
            </div>
          </div> */}

          <div id="credits">
            <div className="card release">
              <p>Release </p>
              <p>{new Date(movie.release).toDateString()}</p>
            </div>
            <div className="card timeline">
              <p>Timeline </p>
              <p>{new Date(movie.timeline).toDateString()}</p>
            </div>
            <div className="card grossing">
              <p>Grossing </p>
              <p>${movie.grossing}</p>
            </div>
            <div className="card budget">
              <p>Budget </p>
              <p>${movie.budget}</p>
            </div>
            <div className="card manufacturer">
              <p>Studio </p>
              <p>{movie.studio}</p>
            </div>
            <div className="card certificate">
              <p>Certificate </p>
              <p>{movie.certificate}</p>
            </div>
            <div className="card time">
              <p>Duration </p>
              <p>{`${Math.floor(movie.duration / 60)}h ${Math.floor(
                movie.duration % 60
              )}m`}</p>
            </div>
            <div className="card country">
              <p>Country </p>
              <p>{movie.made}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
