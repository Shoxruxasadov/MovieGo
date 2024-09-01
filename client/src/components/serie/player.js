import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import { useStore, useUser } from "@/store/zustand";
import translate from "@/language/translate.json"
import Release from "@/utils/release";
import Timeline from "@/utils/timeline";
import Time from "@/utils/time";
import Series from "./series";

export default function SeriePlayer() {
  const setLink = useStore(state => state.setLink);
  const movie = useStore(state => state.movie);
  const user = useUser(state => state.user);
  const [module, setModule] = useState('Serie')
  const scrollDemoRef = useRef(null);
  const pathname = usePathname()
  const { locale } = useRouter()
  const router = useRouter()

  const modules = [
    {
      title: translate[locale].movie.serie,
      name: 'Serie',
    },
    {
      title: translate[locale].movie.credits,
      name: 'Credits',
    },
    {
      title: translate[locale].movie.authors,
      name: 'Authors',
    },
  ]

  return (
    <section id="serie-player">
      <div className="title">
        <p className="description">{movie.description[locale]}</p>
        {movie.cast.length > 0 && <div className="casts">
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

      <div className="lists">
        <ul className="list">
          {modules.map((item, i) => (
            <li className={`item${module == item.name ? ' selected' : ''}`} onClick={() => setModule(item.name)} key={i}>{item.title}</li>
          ))}
        </ul>
        <ul className="list">
          {movie.seasons.map((item, i) => (
            <li className={`item${movie.name == item ? ' selected' : ''}`} onClick={() => router.push(`/${movie.type}/${item}`)} key={i}>{translate[locale].movie.season} {i + 1}</li>
          ))}
        </ul>
      </div>

      <div className="watching">
        {user ? (movie.episodes != null ? <Series module={module} /> : <div className="container-movie"><div id="need" className={module == "Serie" ? 'visible' : ''}>
          <p>{translate[locale].movie.soon}</p>
        </div></div>) : <div className="container-movie"><div id="need" className={module == "Serie" ? 'visible' : ''}>
          <p>{translate[locale].movie.need}</p>
          <div className="sign" onClick={() => setLink(pathname)}>
            <Link href="/signup">{translate[locale].movie.signup}</Link>
            <Link href="/login">{translate[locale].movie.login}</Link>
          </div>
        </div></div>}

        <div className="container-movie">
          <div id="credits" className={module == "Credits" ? 'visible' : ''}>
            <div className="card release">
              <p>{translate[locale].movie.release} </p>
              <p><Release time={movie.release} /></p>
            </div>
            <div className="card timeline">
              <p>{translate[locale].movie.timeline} </p>
              <p><Timeline time={movie.timeline} /></p>
            </div>
            <div className="card manufacturer">
              <p>{translate[locale].movie.studio} </p>
              <p>{movie.studio[locale]}</p>
            </div>
            {movie.grossing != null && <div className="card grossing">
              <p>{translate[locale].movie.grossing} </p>
              <p>${movie.grossing}</p>
            </div>}
            {movie.budget != null && <div className="card budget">
              <p>{translate[locale].movie.budget} </p>
              <p>${movie.budget}</p>
            </div>}
            <div className="card time">
              <p>{translate[locale].movie.duration} </p>
              <p><Time time={movie.duration} /></p>
            </div>
            <div className="card admitted">
              <p>{translate[locale].movie.rating} </p>
              <p>
                {movie.ratings.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </p>
            </div>
            <div className="card language">
              <p>{translate[locale].movie.language} </p>
              <p>
                {movie.languages.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </p>
            </div>
            <div className="card country">
              <p>{translate[locale].movie.country} </p>
              <p>{movie.made}</p>
            </div>
          </div>
          <div id="authors" className={module == "Authors" ? 'visible' : ''}>
            <div className="directors">
              <h2>{translate[locale].movie.directors}</h2>
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
              <h2>{translate[locale].movie.producers}</h2>
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
              <h2>{translate[locale].movie.screenwriters}</h2>
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





      </div>
    </section>
  );
}