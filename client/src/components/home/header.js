import { Link as Scroll } from "react-scroll"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { serverSideTranslations, } from 'next-i18next';
import { useRouter } from "next/router";
import { useStore, useUser } from "@/store/zustand";
import translate from "@/language/translate.json"

export default function Header({ movie }) {
  const user = useUser(state => state.user);
  const title = useStore(state => state.title);

  const [isScrolled, setScrolled] = useState(false);
  const [load, setLoad] = useState(false);
  const [menu, setMenu] = useState(false);

  const pathname = usePathname()
  const router = useRouter();
  const { locale } = useRouter()

  const handleLanguage = locale => router.push(router.pathname, router.asPath, { locale })

  const homeList = [
    { name: translate[locale].header.home, link: "home", position: 0 },
    { name: translate[locale].header.movies, link: "movies", position: -100 },
    { name: translate[locale].header.serials, link: "series", position: -100 },
    { name: translate[locale].header.studios, link: "studios", position: -100 },
  ]

  useEffect(() => {
    setLoad(true)
    const handleScroll = () => {
      if (window.pageYOffset > 10) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'active' : ''}>
      {pathname == '/' ? <Scroll
        className="logo"
        duration={500}
        smooth={true}
        spy={true}
        offset={0}
        to='home'
      >
        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo" />
        <h1>MovieGo</h1>
      </Scroll> : <Link href="/" className="logo">
        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo" />
        <h1>MovieGo</h1>
      </Link>}

      {pathname == '/' ? <nav>
        <ul>
          {homeList.map((section, i) => (
            <li key={i}>
              <Scroll
                activeClass="active"
                to={section.link}
                spy={true}
                smooth={true}
                offset={section.position}
                duration={500}
              >
                {section.name}
              </Scroll>
            </li>
          ))}
          <li className="search">
            <Link href='/search'><IoSearch /></Link>
          </li>
        </ul>
      </nav> : movie ? <nav>
        <h3>{title[locale]}</h3>
      </nav> : <></>}

      <div className="right">
        <div className="language"
          onMouseEnter={() => setMenu(true)}
          onMouseLeave={() => setMenu(false)}
        >
          <div className="selected">
            <img src={`/language/${locale}.svg`} alt={locale} width={21} height={21} />
            <span>{translate[locale].header.language}</span>
          </div>
          <div className={`menu${menu ? ' active' : ''}`}>
            {router.locales.map(lng => (
              <button
                key={lng}
                disabled={lng === locale}
                onClick={() => handleLanguage(lng)}
              >
                <img src={`/language/${lng}.svg`} alt={lng} width={21} height={21} />
                <span>{translate[lng].header.language}</span>
              </button>
            ))}
          </div>
        </div>
        {load && (user ? <div className="account">
          <Image
            src={user.image ? user.image : '/sign/user.webp'}
            alt="avatar"
            width={256}
            height={256}
            className='avatar'
          />
        </div> : <Link href='/login'>{translate[locale].header.login}</Link>)}
      </div >
    </header >
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}