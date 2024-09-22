import { Link as Scroll } from "react-scroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import translate from "@/language/translate.json"
import { useStore } from "@/store/zustand";
import { useRouter } from "next/router";
import Time from "@/utils/time";
import Link from "next/link";
import { TbSignRightFilled } from "react-icons/tb";
import { info } from "@/utils/toastify";

export default function MovieHome() {
  const [loadedImage, setLoadedImage] = useState(false);
  const [screenWidth, setScreenWidth] = useState();
  const movie = useStore(state => state.movie);
  const { locale } = useRouter()

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="movie-home">
      <div className="container">
        <motion.div
          className="title"
          initial={{ y: "-1rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "1rem", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={movie.image.logo}
            alt={movie.title[locale]}
            width={500}
            height={200}
            placeholder="blur"
            blurDataURL="/spider/logo.webp"
            className={`logo ${loadedImage ? "unblur" : ""}`}
            onLoad={() => setLoadedImage(true)}
          />
          <div className="credits">
            <p className="certificate">{movie.certificate}</p>
            <p className="genre">{translate[locale].movie[movie.genre[0]]}</p>
            <span>•</span>
            <p className="genre">{translate[locale].movie[movie.genre[1]]}</p>
            <span>•</span>
            <p className="time">{<Time time={movie.duration} />}</p>
          </div>
          <div className="watching">
            <div className="left">
              <Scroll
                activeClass="active"
                to="player"
                spy={true}
                smooth={true}
                offset={-180}
                duration={500}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.99999 19.9902C11.366 19.9902 12.652 19.7289 13.8578 19.2062C15.0637 18.6836 16.1274 17.9618 17.049 17.0406C17.9706 16.1195 18.6928 15.0563 19.2156 13.851C19.7385 12.6458 20 11.3604 20 9.99506C20 8.62971 19.7385 7.34439 19.2156 6.13909C18.6928 4.93381 17.9706 3.8706 17.049 2.94948C16.1274 2.02836 15.0621 1.30649 13.8529 0.78387C12.6438 0.261249 11.3562 -6.10352e-05 9.99018 -6.10352e-05C8.62417 -6.10352e-05 7.33823 0.261249 6.13235 0.78387C4.92646 1.30649 3.86437 2.02836 2.94607 2.94948C2.02778 3.8706 1.30719 4.93381 0.784313 6.13909C0.261438 7.34439 0 8.62971 0 9.99506C0 11.3604 0.261438 12.6458 0.784313 13.851C1.30719 15.0563 2.02941 16.1195 2.95097 17.0406C3.87255 17.9618 4.93627 18.6836 6.14214 19.2062C7.34803 19.7289 8.63398 19.9902 9.99999 19.9902Z"
                    fill="black"
                    fillOpacity="0.85"
                  />
                  <path
                    d="M8.13724 13.9441C7.90195 14.0878 7.67483 14.1123 7.45587 14.0176C7.23692 13.9228 7.12744 13.7546 7.12744 13.5129V6.48696C7.12744 6.24525 7.24182 6.08193 7.47058 5.997C7.69933 5.91208 7.92156 5.93168 8.13724 6.0558L13.902 9.46589C14.1046 9.59002 14.2075 9.76967 14.2108 10.0048C14.2141 10.2401 14.1111 10.423 13.902 10.5536L8.13724 13.9441Z"
                    fill="white"
                  />
                </svg>
                <span>{translate[locale].movie.watchBtn}</span>
              </Scroll>
              <button onClick={() => info(translate[locale].movie.soon)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="19"
                  viewBox="0 0 14 19"
                  fill="none"
                >
                  <path
                    d="M1 2.81611C1 1.83427 1.76751 1.03833 2.71429 1.03833H11.2857C12.2325 1.03833 13 1.83427 13 2.81611V17.0383L7 13.9272L1 17.0383V2.81611Z"
                    stroke="white"
                    strokeOpacity="0.85"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{translate[locale].movie.listBtn}</span>
              </button>
              {movie.seasons && <Link href={`/${movie.type}/${movie.seasons[0]}`} className="next">
                <TbSignRightFilled />
              </Link>}
            </div>
            {movie.seasons && <div className="right">
              <Link href={`/${movie.type}/${movie.seasons[0]}`}>
                <TbSignRightFilled />
              </Link>
            </div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
