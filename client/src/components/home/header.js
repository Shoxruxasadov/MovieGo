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
import { v4 as uuid } from 'uuid';
import useLocalStorage from "use-local-storage";
import Rodal from "rodal";

export default function Header({ movie }) {
  const user = useUser(state => state.user);
  const title = useStore(state => state.title);

  const [isScrolled, setScrolled] = useState(false);
  const [load, setLoad] = useState(false);
  const [langMenu, setLangMenu] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [rodalCloser, setRodalCloser] = useState(false);

  const [token, setToken] = useLocalStorage("token", null);
  const setUser = useUser(state => state.setUser);

  const pathname = usePathname()
  const router = useRouter();
  const { locale } = useRouter()

  const handleLanguage = locale => router.push(router.pathname, router.asPath, { locale })

  const uid = +Math.floor(new Date().valueOf() * Math.random()).toString().substring(0, 7)

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
        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" />
        <h1>MovieGo</h1>
      </Scroll> : <Link href="/" className="logo">
        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" />
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
        <h1>{title[locale]}</h1>
      </nav> : <></>}

      <div className="right">
        {load && <>
          {!user && <div className="language"
            onMouseEnter={() => setLangMenu(true)}
            onMouseLeave={() => setLangMenu(false)}
          >
            <div className={langMenu ? 'lang-menu active' : "lang-menu"}>
              <div className="selected">
                <img src={`/language/${locale}.svg`} alt={locale} width={21} height={21} />
                <span>{translate[locale].header.language}</span>
              </div>
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
          </div>}
          {user ? <div className="account" onClick={() => setAccountMenu(true)}>
            <Image
              src={user.image ? user.image : '/sign/user.webp'}
              alt="avatar"
              width={256}
              height={256}
              className='avatar'
            />
          </div> : <Link href='/login'>{translate[locale].header.login}</Link>}
        </>}
      </div >

      {user && <div className={accountMenu ? 'account-menu-wrapper active' : "account-menu-wrapper"}>
        <div className="close" onClick={() => setAccountMenu(false)} />
        <div className="menu">
          <div className="top">
            <div className="user">
              <div className="name">
                <h3>{user && user.name}</h3>
                <p>{user && user.email}</p>
              </div>
              {load && <Image
                src={user.image ? user.image : '/sign/user.webp'}
                alt="avatar"
                width={256}
                height={256}
                className='avatar'
              />}
            </div>

            <ul>
              {/* <div className="list ordinary">
                <li>Профил</li>
                <li>Настройка</li>
              </div> */}
              <div className="list logout">
                {/* {user.admin && <li>Админ панел</li>} */}
                <li onClick={() => setRodalCloser(true)}>{translate[locale].header.logout}</li>
              </div>
            </ul>
          </div>

          <div className="language">
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
      </div>}

      {accountMenu && <Rodal visible={rodalCloser} onClose={() => setRodalCloser(false)}>
        <div className="text">
          <p>{translate[locale].header.realy}</p>
        </div>
        <div className="wrapper">
          <button className="cancel" onClick={() => setRodalCloser(false)}>{translate[locale].header.cancel}</button>
          <button className="confirm" onClick={() => {
            setToken(null)
            setUser(null)
            setRodalCloser(false)
          }}>{translate[locale].header.confirm}</button>
        </div>
      </Rodal>}


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