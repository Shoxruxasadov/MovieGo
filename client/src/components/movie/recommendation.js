import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router';
import axios from 'axios'
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import translate from "@/language/translate.json"

export default function MovieRecommendation() {
  const [screenSize, setScreenSize] = useState();
  const { locale } = useRouter()
  const scrollDemoRef = useRef(null);

  const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['rec'],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies/random`).then(({ data }) => data)
  })

  useEffect(() => {
    setScreenSize([window.innerWidth, window.innerHeight])
    const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="recommendation" >
      <h2>{translate[locale].movie.recommendation}</h2>
      <div className="left" onClick={() => { scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
      <div className="right" onClick={() => { scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
      <div className='wrapper' ref={scrollDemoRef}>
        <div className="recommendation">
          {isSuccess ? movies.map(item => (
            <Link
              style={{ backgroundImage: `url(${item.image.poster})` }}
              href={`/${item.type}/${item.name}`}
              className="card"
              key={item._id}
            >
              <div className="shadow" />
              <div className="title">
                <span className="resolution">{item.resolution}</span>
                <span className="format">{item.format}</span>
                <p className="type">{translate[locale].movie.free}</p>
                <h3>{item.title[locale]}</h3>
                <p className="other">{item.studio[locale]} • <span>{item.mpa}+</span></p>
              </div>
            </Link>
          )) : Array(10).fill(<div className="card skeleton">
            <div className="title">
              <div className="resolution" />
              <div className="format" />
              <div className="text" />
            </div>
          </div>).map(item => item)}
        </div>
      </div>
    </section>
  )
}
