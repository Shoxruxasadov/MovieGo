import { Link as Scroll } from "react-scroll"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function Header({ movie }) {
  const [isScrolled, setScrolled] = useState(false);
  const pathname = usePathname()

  const homeList = [
    { name: "Home", link: "home", position: 0 },
    { name: "Movies", link: "movies", position: -100 },
    { name: "Series", link: "series", position: -100 },
    { name: "Modules", link: "modules", position: -100 },
  ]

  const movieList = [
    { name: "Home", link: "watch", position: 0 },
    { name: "Watch", link: "player", position: -100 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 40) setScrolled(true);
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
        <ul>
          {movieList.map((section, i) => (
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
      </nav> : <></>}

      <div className="account">
        {pathname != '/login' && pathname != '/register' && <Link href='/login'>Login</Link>}
      </div>
    </header>
  )
}
