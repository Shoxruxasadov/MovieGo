import { Link as Scroll } from "react-scroll"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setScrolled] = useState(false);

  const list = [
    { name: "Home", link: "home", position: 0 },
    { name: "Movies", link: "movies", position: -100 },
    { name: "Series", link: "series", position: -100 },
    { name: "MCUT", link: "mcut", position: -100 },
  ]

  const handleScroll = () => {
    if (window.pageYOffset > 80) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'active' : ''}>
      <div className="container">
        <div className="left">
          <Link href={"/"} className="logo">
            <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo" />
            <h1>MovieGo</h1>
          </Link>
          <nav>
            <ul>
              {list.map((section, i) => (
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
            </ul>
          </nav>
        </div>
        <div className="manage">
          <div className="search">
            <input type="text" placeholder="Search Movies, Series..."/>
          </div>
          <div className="account">
            <button>Log In</button>
          </div>
        </div>
      </div>
    </header>
  )
}
