import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router';
import axios from 'axios'
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import translate from "@/language/translate.json"

export default function MovieRelated() {
  const getRelated = useStore(state => state.getRelated);
  const related = useStore(state => state.related);
  const [screenSize, setScreenSize] = useState();
  const { locale } = useRouter()
  const scrollDemoRef = useRef(null);

  useEffect(() => {
    getRelated()
    setScreenSize([window.innerWidth, window.innerHeight])
    const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="related" data-aos="fade-up">
      <h2>{translate[locale].movie.related}</h2>
      <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
      <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
      <div className='wrapper' ref={scrollDemoRef}>
        <div className="related">
          {related ? related.map(item => (
            <Link
              style={{ backgroundImage: `url(${item.image.poster})` }}
              href={`/${item.type}/${item.name}`}
              className="card"
              key={item._id}
            >
              <div className="shadow" />
              <div className="title">
                <div className="resolution"><span>{item.resolution}</span></div>
                <p className="type">{translate[locale].movie.free}</p>
                <h3>{item.title[locale]}</h3>
                <p className="other">{item.studio[0].name[locale]} • <span>{item.mpa}+</span></p>
              </div>
            </Link>
          )) : Array(10).fill(<div className="card skeleton">
            <div className="title">
              <div className="resolution" />
              <div className="text" />
            </div>
          </div>).map(item => item)}
        </div>
      </div>
    </section>
  )
}
