import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import translate from "@/language/translate.json"
import Link from "next/link";

export default function Hero() {
  const { locale } = useRouter()

  return (
    <section id="hero">
      <div className="container">
        <motion.div className="title"
          initial={{ y: "-1rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "1rem", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image src='/spider/logo.webp' width={640} height={256} alt="logo" />
          <div className="credits">
            <p className="release">2021</p>
            <p className="genre">{translate[locale].movie.action}</p>
            <span>•</span>
            <p className="genre">{translate[locale].movie.adventure}</p>
            <span>•</span>
            <p className="time">2{translate[locale].movie.h} 28{translate[locale].movie.m}</p>
          </div>
          <p className="description">{translate[locale].movie.descHero}</p>
          <div className="watching">
            {/* href="/movies/spider-man-no-way-home" */}
            <Link href="/movie/spider-man-3-no-way-home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9.99999 19.9902C11.366 19.9902 12.652 19.7289 13.8578 19.2062C15.0637 18.6836 16.1274 17.9618 17.049 17.0406C17.9706 16.1195 18.6928 15.0563 19.2156 13.851C19.7385 12.6458 20 11.3604 20 9.99506C20 8.62971 19.7385 7.34439 19.2156 6.13909C18.6928 4.93381 17.9706 3.8706 17.049 2.94948C16.1274 2.02836 15.0621 1.30649 13.8529 0.78387C12.6438 0.261249 11.3562 -6.10352e-05 9.99018 -6.10352e-05C8.62417 -6.10352e-05 7.33823 0.261249 6.13235 0.78387C4.92646 1.30649 3.86437 2.02836 2.94607 2.94948C2.02778 3.8706 1.30719 4.93381 0.784313 6.13909C0.261438 7.34439 0 8.62971 0 9.99506C0 11.3604 0.261438 12.6458 0.784313 13.851C1.30719 15.0563 2.02941 16.1195 2.95097 17.0406C3.87255 17.9618 4.93627 18.6836 6.14214 19.2062C7.34803 19.7289 8.63398 19.9902 9.99999 19.9902Z" fill="black" fillOpacity="0.85" />
                <path d="M8.13724 13.9441C7.90195 14.0878 7.67483 14.1123 7.45587 14.0176C7.23692 13.9228 7.12744 13.7546 7.12744 13.5129V6.48696C7.12744 6.24525 7.24182 6.08193 7.47058 5.997C7.69933 5.91208 7.92156 5.93168 8.13724 6.0558L13.902 9.46589C14.1046 9.59002 14.2075 9.76967 14.2108 10.0048C14.2141 10.2401 14.1111 10.423 13.902 10.5536L8.13724 13.9441Z" fill="white" />
              </svg>
              <span>{translate[locale].movie.watchBtn}</span>
            </Link>
            <Link href="/movie/spider-man-3-no-way-home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <g clipPath="url(#clip0_1_23)">
                  <path d="M9.99999 20.1619C11.366 20.1619 12.652 19.9006 13.8578 19.3779C15.0637 18.8553 16.1274 18.1335 17.049 17.2123C17.9706 16.2912 18.6928 15.228 19.2156 14.0227C19.7385 12.8174 20 11.5321 20 10.1668C20 8.80141 19.7385 7.51608 19.2156 6.31079C18.6928 5.1055 17.9706 4.04229 17.049 3.12117C16.1274 2.20005 15.0621 1.47818 13.8529 0.955562C12.6438 0.432941 11.3562 0.171631 9.99018 0.171631C8.62417 0.171631 7.33823 0.432941 6.13235 0.955562C4.92646 1.47818 3.86437 2.20005 2.94607 3.12117C2.02778 4.04229 1.30719 5.1055 0.784313 6.31079C0.261438 7.51608 0 8.80141 0 10.1668C0 11.5321 0.261438 12.8174 0.784313 14.0227C1.30719 15.228 2.02941 16.2912 2.95097 17.2123C3.87255 18.1335 4.93627 18.8553 6.14214 19.3779C7.34803 19.9006 8.63398 20.1619 9.99999 20.1619Z" fill="white" fillOpacity="0.85" />
                  <path d="M7.68624 15.1741C7.52938 15.0173 7.45095 14.8327 7.45095 14.6204C7.45095 14.4081 7.52611 14.2301 7.67643 14.0864L11.8333 10.1765L7.67643 6.27646C7.51958 6.13274 7.44442 5.9531 7.45095 5.73752C7.45749 5.52194 7.53919 5.33902 7.69605 5.18876C7.83984 5.04504 8.01468 4.97808 8.22056 4.98788C8.42644 4.99768 8.60781 5.0777 8.76467 5.22796L12.9705 9.17701C13.1666 9.3534 13.2957 9.56408 13.3578 9.80905C13.4199 10.054 13.4199 10.299 13.3578 10.544C13.2957 10.7889 13.1666 10.9996 12.9705 11.176L8.76467 15.1349C8.62088 15.2721 8.43787 15.344 8.21565 15.3505C7.99343 15.357 7.81696 15.2982 7.68624 15.1741Z" fill="#20201F" />
                </g>
                <defs>
                  <clipPath id="clip0_1_23">
                    <rect width="20" height="20" fill="white" transform="translate(0 0.171631)" />
                  </clipPath>
                </defs>
              </svg>
              <span>{translate[locale].movie.moreBtn}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}