import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { MdOutlineMovie, MdOutlineHighQuality } from "react-icons/md";
import { PiCurrencyCircleDollar, PiLink } from "react-icons/pi";

import translate from "@/language/translate.json"
import Timeline from "@/utils/timeline";
import Release from "@/utils/release";
import Stars from "@/utils/stars";
import Time from "@/utils/time";

export default function Credits({ movie }) {
    const { locale } = useRouter()

    return (
        <aside data-aos="fade-up">
            <Image
                id="poster"
                width={405}
                height={600}
                src={movie.image.poster}
                alt={movie.title[locale]}
            />
            <div className="line release">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.21447 3.33947 4.375 4.375 4.375H15.625C16.6605 4.375 17.5 5.21447 17.5 6.25V15.625M2.5 15.625C2.5 16.6605 3.33947 17.5 4.375 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625M2.5 15.625V9.375C2.5 8.33947 3.33947 7.5 4.375 7.5H15.625C16.6605 7.5 17.5 8.33947 17.5 9.375V15.625" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{translate[locale].movie.release}</span>
                </h3>
                <p><Release time={movie.release ? movie.release : movie.timeline} /></p>
            </div>
            {movie.release && <div className="line timeline">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.625 2.5V4.375M14.375 2.5V4.375M2.5 15.625V6.25C2.5 5.21447 3.33947 4.375 4.375 4.375H15.625C16.6605 4.375 17.5 5.21447 17.5 6.25V15.625M2.5 15.625C2.5 16.6605 3.33947 17.5 4.375 17.5H15.625C16.6605 17.5 17.5 16.6605 17.5 15.625M2.5 15.625V9.375C2.5 8.33947 3.33947 7.5 4.375 7.5H15.625C16.6605 7.5 17.5 8.33947 17.5 9.375V15.625" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{translate[locale].movie.timeline}</span>
                </h3>
                <p><Timeline time={movie.timeline} /></p>
            </div>}
            <div className="line grossing">
                <h3>
                    <PiCurrencyCircleDollar className="library-svg" />
                    <span>{translate[locale].movie.grossing}</span>
                </h3>
                <p>{movie.grossing ? '$' + movie.grossing : '—'}</p>
            </div>
            <div className="line budget">
                <h3>
                    <PiCurrencyCircleDollar className="library-svg" />
                    <span>{translate[locale].movie.budget}</span>
                </h3>
                <p>{movie.budget ? '$' + movie.budget : '—'}</p>
            </div>
            <div className="line studio">
                <h3>
                    <MdOutlineMovie className="library-svg" />
                    <span>{translate[locale].movie.studio}</span>
                </h3>
                <Link href={`/studio/${movie.studio.module}`}><span>{movie.studio.name[locale]}</span> <PiLink /></Link>
            </div>
            <div className="line language">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8.75 17.5L13.125 8.125L17.5 17.5M10 15H16.25M2.5 4.68447C4.13797 4.48022 5.8067 4.375 7.5 4.375M7.5 4.375C8.43401 4.375 9.36054 4.40701 10.2786 4.47M7.5 4.375V2.5M10.2786 4.47C9.31361 8.88151 6.40723 12.5668 2.5 14.5852M10.2786 4.47C11.0249 4.5212 11.7655 4.59288 12.5 4.68447M8.67606 11.7635C7.32129 10.3849 6.23087 8.74575 5.48694 6.92805" stroke="#f3f3f3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{translate[locale].movie.languages}</span>
                </h3>
                <div className="wrapper">{movie.languages.map((item, i) => (<span key={i}>{translate[locale].languages[item]} </span>))}</div>
            </div>
            <div className="line quality">
                <h3>
                    <MdOutlineHighQuality className="library-svg" />
                    <span>{translate[locale].movie.quality}</span>
                </h3>
                <div className="wrapper">
                    <span className={movie.format == "IMAX" ? 'small' : ''}>{movie.format}</span>
                    {(movie.source ? movie.source["2160p"] : movie.episodes[0]["2160p"]) && <span>4K</span>}
                    {(movie.source ? movie.source["1080p"] : movie.episodes[0]["1080p"]) && <span>HD</span>}
                    {(movie.source ? movie.source["720p"] : movie.episodes[0]["720p"]) && <span>SD</span>}
                </div>
            </div>
            <div className="line rating">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M9.56663 2.91557C9.72675 2.53059 10.2721 2.53059 10.4322 2.91557L12.2039 7.17511C12.2714 7.33741 12.424 7.4483 12.5992 7.46235L17.1978 7.83101C17.6134 7.86433 17.7819 8.38301 17.4653 8.65426L13.9617 11.6555C13.8282 11.7698 13.7699 11.9492 13.8106 12.1202L14.8811 16.6076C14.9778 17.0132 14.5366 17.3338 14.1808 17.1164L10.2438 14.7117C10.0938 14.6201 9.9051 14.6201 9.7551 14.7117L5.8181 17.1164C5.46228 17.3338 5.02106 17.0132 5.11781 16.6076L6.18822 12.1202C6.229 11.9492 6.1707 11.7698 6.03721 11.6555L2.53361 8.65426C2.21695 8.38301 2.38548 7.86433 2.80109 7.83101L7.39963 7.46235C7.57485 7.4483 7.72748 7.33741 7.79498 7.17511L9.56663 2.91557Z" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{translate[locale].movie.rating}</span>
                </h3>
                <div className="wrapper rating">
                    <div className="item moviego">
                        <h4>MovieGo</h4>
                        <div className="rating-stars">
                            <Stars stars="9" />
                            <p>9.0 / 10</p>
                        </div>
                    </div>
                    <div className="item imdb">
                        <h4>IMDb</h4>
                        <div className="rating-stars">
                            <Stars stars="6.9" />
                            <p>6.9 / 10</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line genre">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3.125 5C3.125 3.96447 3.96447 3.125 5 3.125H6.875C7.91053 3.125 8.75 3.96447 8.75 5V6.875C8.75 7.91053 7.91053 8.75 6.875 8.75H5C3.96447 8.75 3.125 7.91053 3.125 6.875V5Z" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M3.125 13.125C3.125 12.0895 3.96447 11.25 5 11.25H6.875C7.91053 11.25 8.75 12.0895 8.75 13.125V15C8.75 16.0355 7.91053 16.875 6.875 16.875H5C3.96447 16.875 3.125 16.0355 3.125 15V13.125Z" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.25 5C11.25 3.96447 12.0895 3.125 13.125 3.125H15C16.0355 3.125 16.875 3.96447 16.875 5V6.875C16.875 7.91053 16.0355 8.75 15 8.75H13.125C12.0895 8.75 11.25 7.91053 11.25 6.875V5Z" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.25 13.125C11.25 12.0895 12.0895 11.25 13.125 11.25H15C16.0355 11.25 16.875 12.0895 16.875 13.125V15C16.875 16.0355 16.0355 16.875 15 16.875H13.125C12.0895 16.875 11.25 16.0355 11.25 15V13.125Z" stroke="#f3f3f3a3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>{translate[locale].movie.genres}</span>
                </h3>
                <div className="wrapper">{movie.genre.map((item, i) => (<span key={i}>{translate[locale].movie[item]} </span>))}</div>
            </div>
            <div className="line agerating">
                <h3>

                    <span>{translate[locale].movie.agerating}</span>
                </h3>
                <div className="wrapper">{movie.ratings.map((item, i) => (<span key={i}>{item} </span>))}</div>
            </div>
            <div className="line others">
                <h3>

                    <span>{translate[locale].movie.others}</span>
                </h3>
                <div className="wrapper"><span>{translate[locale].movie[movie.made]}</span><span><Time time={movie.duration} /></span></div>
            </div>
            {movie.directors.length > 0 && <div className="line directors">
                <h3><span>{translate[locale].movie.directors}</span></h3>
                <div className="wrapper">
                    {movie.directors.map((item, i) => (
                        <div className="director" key={i}>
                            <img src={item.image} alt="avatar" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>}
            {movie.producers.length > 0 && <div className="line producers">
                <h3>{translate[locale].movie.producers}</h3>
                <div className="wrapper">
                    {movie.producers.map((item, i) => (
                        <div className="producer" key={i}>
                            <img src={item.image} alt="avatar" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>}
            {movie.screenwriters.length > 0 && <div className="line screenwriters">
                <h3>{translate[locale].movie.screenwriters}</h3>
                <div className="wrapper">
                    {movie.screenwriters.map((item, i) => (
                        <div className="screenwriter" key={i}>
                            <img src={item.image} alt="avatar" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>}
        </aside>
    );
}
