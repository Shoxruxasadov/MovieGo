"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Link as Scroll } from "react-scroll"
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/store/zustand";

import LanguageWidget from '../widgets/language';
import LogoutConfirm from '../widgets/confirm';
import AccountMenu from '../widgets/menu';

import { RiSearch2Line } from "react-icons/ri";
import { MdFavorite, MdFavoriteBorder, MdNotificationsActive, MdNotificationsNone } from "react-icons/md";

export default function Header() {
  const { user } = useUser();
  const pathname = usePathname()
  const { t } = useTranslation()

  const [accountMenu, setAccountMenu] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [isScrolled, setScrolled] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  const [openedFavorite, setOpenedFavorite] = useState<boolean>(false)
  const [openedNotification, setOpenedNotification] = useState<boolean>(false)

  const nav = [
    { name: t("header.home"), link: "/" },
    { name: t("header.tv"), link: "/tv" },
    { name: t("header.movies"), link: "/movies" },
    { name: t("header.series"), link: "/series" },
    { name: t("header.cartoon"), link: "/cartoon" },
    { name: t("header.anime"), link: "/anime" },
    { name: t("header.subscription"), link: "/settings/payments" },
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
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={classNames({ active: isScrolled })}
      >
        <nav>
          {pathname == '/' ? <Scroll
            className="logo"
            duration={500}
            smooth={true}
            spy={true}
            offset={0}
            to='home'
          >
            <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" priority />
            <h1>MovieGo</h1>
          </Scroll> : <Link href="/" className="logo">
            <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" priority />
            <h1>MovieGo</h1>
          </Link>}
          <ul>{nav.map((section, i) => (
            <li key={i}><Link href={section.link} className={classNames({ active: pathname == section.link })}>{section.name}</Link></li>
          ))}</ul>
        </nav>
        <div className="right">
          <div className="search">
            <RiSearch2Line className="poisk" />
            <input type="text" placeholder={t("header.search")} />
          </div>
          {/* convert div to button */}
          <div className={classNames("favorite", { active: openedFavorite })} onClick={() => setOpenedFavorite(!openedFavorite)}>{openedFavorite ? <MdFavorite /> : <MdFavoriteBorder />}</div>
          <div className={classNames("notification", { active: openedNotification })} onClick={() => setOpenedNotification(!openedNotification)}>{openedNotification ? <MdNotificationsActive /> : <MdNotificationsNone />}</div>
          {/* convert div to button */}
          <LanguageWidget />
          {user && load ? <div className="account" onClick={() => setAccountMenu(true)}>
            <Image
              src={user.image ? user.image : '/sign/user.webp'}
              alt="avatar"
              width={256}
              height={256}
              className='avatar'
            />
          </div> : <Link href='/login'>{t("header.login")}</Link>}
        </div >
        {user && <AccountMenu accountMenu={accountMenu} setAccountMenu={setAccountMenu} load={load} setLogoutModal={setLogoutModal} />}
        {accountMenu && <LogoutConfirm logoutModal={logoutModal} setLogoutModal={setLogoutModal} />}
      </motion.header >
    </AnimatePresence>
  )
}