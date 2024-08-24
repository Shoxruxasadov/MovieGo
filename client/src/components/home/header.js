import { Link as Scroll } from "react-scroll"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useStore, useUser } from "@/store/zustand";

export default function Header({ movie }) {
  const user = useUser(state => state.user);
  const title = useStore(state => state.title);
  const [load, setLoad] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const pathname = usePathname()

  const homeList = [
    { name: "Home", link: "home", position: 0 },
    { name: "Movies", link: "movies", position: -100 },
    { name: "Series", link: "series", position: -100 },
    { name: "Modules", link: "modules", position: -100 },
  ]

  const movieList = [
    { name: "Home", link: "movie-home", position: 0 },
    { name: "Watch", link: "movie-player", position: -100 },
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
        <h3>{title}</h3>
      </nav> : <></>}

      <div className="right">
        {load && (user ? <div className="account">
          <div><h3>{user.name}</h3>
            <p>{user.email}</p></div>
          <Image
            src={user.image ? user.image : '/sign/user.webp'}
            alt="avatar"
            width={256}
            height={256}
            className='avatar'
          />
        </div> : <Link href='/login'>Login</Link>)}
      </div >
    </header >
  )
}
