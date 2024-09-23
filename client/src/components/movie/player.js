import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import Link from "next/link";

import MoviesPlayer from "@/library/MoviesPlayer"
import Release from "@/utils/release";
import Timeline from "@/utils/timeline";
import Time from "@/utils/time";
import { useStore, useUser } from "@/store/zustand";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import translate from "@/language/translate.json"

export default function MoviePlayer() {
  const [module, setModule] = useState('Movie')
  const setLink = useStore(state => state.setLink);
  const movie = useStore(state => state.movie);
  const user = useUser(state => state.user);
  const scrollDemoRef = useRef(null);
  const pathname = usePathname()
  const { locale } = useRouter()

  return (
    <section id="movie-player">
      <div className="title">
        <p className="description" data-aos="fade-up">{movie.description[locale]}</p>
        {movie.cast.length > 0 && <div className="casts" data-aos="fade-up">
          <h2>{translate[locale].movie.cast}</h2>
          <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= 700 }}><FaChevronLeft /></div>
          <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += 700 }}><FaChevronRight /></div>
          <div className="scrolling" ref={scrollDemoRef} style={{ scrollBehavior: "smooth" }}>
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
        </div>}
      </div>

      <div className="watching" data-aos="fade-up">
        {user ? (movie.source ? <MoviesPlayer /> : <div id="need">
          <p>{translate[locale].movie.soon}</p>
        </div>) : <div id="need">
          <p>{translate[locale].movie.need}</p>
          <div className="sign" onClick={() => setLink(pathname)}>
            <Link href="/signup">{translate[locale].movie.signup}</Link>
            <Link href="/login">{translate[locale].movie.login}</Link>
          </div>
        </div>}
      </div>
    </section>
  );
}