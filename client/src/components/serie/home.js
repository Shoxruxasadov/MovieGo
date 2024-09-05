import { Link as Scroll } from "react-scroll";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import translate from "@/language/translate.json"
import { useStore } from "@/store/zustand";
import { useRouter } from "next/router";
import Time from "@/utils/time";

export default function SerieHome() {
  const [loadedImage, setLoadedImage] = useState(false);
  const movie = useStore(state => state.movie);
  const { locale } = useRouter()

  return (
    <section id="serie-home">
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
            alt="logo"
            width={1280}
            height={512}
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
            <p className="time"><Time time={movie.duration} /></p>
          </div>
          <div className="watching">
            <div className="left">
              <Scroll
                activeClass="active"
                to="series-list"
                spy={true}
                smooth={true}
                offset={-80}
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
              <button>
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
            </div>
            <div className="right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="169.6"
                height="44"
                viewBox="0 0 212 55"
                fill="none"
              >
                <circle
                  cx="106"
                  cy="28"
                  r="27"
                  fill="white"
                  fillOpacity="0.1"
                />
                <circle
                  cx="106"
                  cy="28"
                  r="26.5"
                  stroke="white"
                  strokeOpacity="0.2"
                />
                <path
                  d="M116.675 35.2727V31.6364C116.675 31.3953 116.579 31.164 116.41 30.9935C116.241 30.8231 116.011 30.7273 115.772 30.7273C115.532 30.7273 115.302 30.8231 115.133 30.9935C114.964 31.164 114.868 31.3953 114.868 31.6364V35.2727C114.868 35.5138 114.773 35.7451 114.604 35.9156C114.435 36.086 114.205 36.1818 113.965 36.1818H97.7093C97.4698 36.1818 97.2401 36.086 97.0707 35.9156C96.9014 35.7451 96.8062 35.5138 96.8062 35.2727V31.6364C96.8062 31.3953 96.7111 31.164 96.5417 30.9935C96.3723 30.8231 96.1426 30.7273 95.9031 30.7273C95.6636 30.7273 95.4339 30.8231 95.2645 30.9935C95.0951 31.164 95 31.3953 95 31.6364V35.2727C95 35.996 95.2854 36.6897 95.7935 37.2012C96.3016 37.7127 96.9908 38 97.7093 38H113.965C114.684 38 115.373 37.7127 115.881 37.2012C116.389 36.6897 116.675 35.996 116.675 35.2727ZM110.913 30.5273L106.397 34.1636C106.238 34.2905 106.041 34.3595 105.837 34.3595C105.634 34.3595 105.437 34.2905 105.277 34.1636L100.762 30.5273C100.597 30.3709 100.497 30.1581 100.481 29.931C100.465 29.7038 100.534 29.4788 100.675 29.3005C100.816 29.1222 101.018 29.0036 101.241 28.9682C101.465 28.9327 101.693 28.983 101.882 29.1091L104.934 31.5636V18.9091C104.934 18.668 105.029 18.4368 105.199 18.2663C105.368 18.0958 105.598 18 105.837 18C106.077 18 106.307 18.0958 106.476 18.2663C106.645 18.4368 106.74 18.668 106.74 18.9091V31.5636L109.793 29.1091C109.884 29.0227 109.992 28.9562 110.109 28.9139C110.227 28.8716 110.352 28.8544 110.477 28.8634C110.602 28.8724 110.723 28.9073 110.834 28.966C110.945 29.0248 111.042 29.106 111.12 29.2045C111.198 29.3031 111.254 29.4168 111.286 29.5385C111.318 29.6603 111.324 29.7873 111.305 29.9117C111.286 30.036 111.241 30.1549 111.173 30.2609C111.106 30.3669 111.017 30.4576 110.913 30.5273Z"
                  fill="white"
                  fillOpacity="0.8"
                />
                <circle
                  cx="185"
                  cy="28"
                  r="27"
                  fill="white"
                  fillOpacity="0.1"
                />
                <circle
                  cx="185"
                  cy="28"
                  r="26.5"
                  stroke="white"
                  strokeOpacity="0.2"
                />
                <path
                  d="M186.182 23.4533C179.43 23.8047 174 29.4053 174 36.2383V41L175.705 37.0338C177.721 33.0047 181.722 30.4285 186.182 30.1916V35.6414L197 26.8047L186.182 18V23.4533Z"
                  fill="white"
                  fillOpacity="0.8"
                />
                <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.1" />
                <circle
                  cx="27"
                  cy="27"
                  r="26.5"
                  stroke="white"
                  strokeOpacity="0.2"
                />
                <path
                  d="M27 38C26.6868 38 26.3848 37.8783 26.1495 37.6571C25.2608 36.8233 24.4039 36.0398 23.6479 35.3486L23.6441 35.345C21.4277 33.3185 19.5137 31.5685 18.182 29.8445C16.6934 27.9173 16 26.0899 16 24.0937C16 22.1542 16.6199 20.3649 17.7453 19.0551C18.8841 17.7299 20.4468 17 22.1459 17C23.4158 17 24.5788 17.4308 25.6025 18.2802C26.1191 18.709 26.5874 19.2338 27 19.8459C27.4127 19.2338 27.8809 18.709 28.3977 18.2802C29.4214 17.4308 30.5844 17 31.8543 17C33.5532 17 35.1161 17.7299 36.2549 19.0551C37.3803 20.3649 38 22.1542 38 24.0937C38 26.0899 37.3068 27.9173 35.8182 29.8443C34.4865 31.5685 32.5727 33.3183 30.3566 35.3447C29.5993 36.0369 28.7411 36.8217 27.8503 37.6575C27.6152 37.8783 27.313 38 27 38ZM22.1459 18.3827C20.811 18.3827 19.5847 18.9543 18.6926 19.9923C17.7872 21.046 17.2886 22.5025 17.2886 24.0937C17.2886 25.7726 17.8701 27.2742 19.1741 28.9623C20.4345 30.594 22.3092 32.3081 24.4798 34.2928L24.4838 34.2964C25.2426 34.9902 26.1029 35.7769 26.9982 36.6168C27.8988 35.7752 28.7604 34.9874 29.5207 34.2924C31.6911 32.3077 33.5657 30.594 34.826 28.9623C36.1299 27.2742 36.7114 25.7726 36.7114 24.0937C36.7114 22.5025 36.2128 21.046 35.3074 19.9923C34.4155 18.9543 33.189 18.3827 31.8543 18.3827C30.8764 18.3827 29.9786 18.7162 29.1859 19.3739C28.4794 19.9602 27.9873 20.7015 27.6987 21.2201C27.5504 21.4868 27.2892 21.646 27 21.646C26.7108 21.646 26.4496 21.4868 26.3013 21.2201C26.0129 20.7015 25.5208 19.9602 24.8141 19.3739C24.0214 18.7162 23.1236 18.3827 22.1459 18.3827Z"
                  fill="white"
                  fillOpacity="0.8"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}