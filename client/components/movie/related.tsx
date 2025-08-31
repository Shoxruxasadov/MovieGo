"use client"

import { useEffect, useRef, useState } from 'react';
import Link from "next/link"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useStore } from '@/store/zustand';
import { useTranslation } from 'react-i18next';
import MovieDto from '@/types/movies/movies.dto';
import { Quality } from '@/utils/quality';

export default function Related() {
  const { related, getRelated } = useStore() as { related: MovieDto[] | null; getRelated: () => Promise<void> };
  const [screenSize, setScreenSize] = useState<number[]>([0, 0]);
  const { t, i18n } = useTranslation()
  const scrollDemoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getRelated()
    setScreenSize([window.innerWidth, window.innerHeight])
    const handleResize = () => setScreenSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="related" data-aos="fade-up">
      <h2>{t("movie.related")}</h2>
      <div className='wrapper' ref={scrollDemoRef}>
        <div className="left" onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft -= (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronLeft /></div>
        <div className="related">
          {related ? related.map(item => (
            <Link
              style={{ backgroundImage: `url(${item.image.poster})` }}
              href={`/${item.module}/${item.path}`}
              className="card"
              key={item._id}
            >
              <div className="shadow" />
              <div className="title">
                <div className="resolution"><span>{Quality(item.resolution[0])}</span></div>
                <p className="purchase">{item.purchase ? t("movie.paid") : t("movie.free")}</p>
                <h3 title={item.title[i18n.language as keyof typeof item.title]}>{item.title[i18n.language as keyof typeof item.title]}</h3>
                <p className="other">{item.studio.title[i18n.language as keyof typeof item.studio.title]} • <span>{item.mpaa}+</span></p>
              </div>
            </Link>
          )) : Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="card skeleton">
              <div className="title">
                <div className="resolution" />
                <div className="text" />
              </div>
            </div>
          ))}
        </div>
        <div className="right" onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft += (screenSize[0] > 1024 && screenSize[1] > 576) ? 1100 : 780 }}><FaChevronRight /></div>
      </div>
    </section>
  )
}
