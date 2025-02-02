import { serverSideTranslations } from 'next-i18next';
import useLocalStorage from "use-local-storage";
import { Link as Scroll } from "react-scroll"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/store/zustand";
import translate from "@/language/translate.json"
import Rodal from "rodal";
import classNames from "classnames";

export default function Header() {
  const setUser = useUser(state => state.setUser);
  const user = useUser(state => state.user);

  const [lang, setLang] = useLocalStorage("locale", "ru");
  const [token, setToken] = useLocalStorage("token", null);
  const [accountMenu, setAccountMenu] = useState(false);
  const [rodalCloser, setRodalCloser] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [langMenu, setLangMenu] = useState(false);
  const [load, setLoad] = useState(false);

  const { locale } = useRouter()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguage = locale => {
    setLang(locale)
    router.push(router.pathname, router.asPath, { locale });
  };

  const nav = [
    { name: translate[locale].header.home, link: "/" },
    { name: translate[locale].header.tv, link: "/tv" },
    { name: translate[locale].header.movies, link: "/movies" },
    { name: translate[locale].header.series, link: "/series" },
    { name: translate[locale].header.cartoon, link: "/cartoon" },
    { name: translate[locale].header.anime, link: "/anime" },
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
    <header className={classNames({ active: isScrolled })}>
      <nav>
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

        <ul>{nav.map((section, i) => (
          <li key={i}><Link href={section.link} className={classNames({ active: pathname == section.link })}>{section.name}</Link></li>
        ))}</ul>
      </nav>

      <div className="right">
        <div className="language"
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
        </div>
        {user && load ? <div className="account" onClick={() => setAccountMenu(true)}>
          <Image
            src={user.image ? user.image : '/sign/user.webp'}
            alt="avatar"
            width={256}
            height={256}
            className='avatar'
          />
        </div> : <Link href='/login'>{translate[locale].header.login}</Link>}
      </div >

      {
        user && <div className={classNames("account-menu-wrapper", { active: accountMenu })}>
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
        </div>
      }

      {
        accountMenu && <Rodal visible={rodalCloser} onClose={() => setRodalCloser(false)}>
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
        </Rodal>
      }
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