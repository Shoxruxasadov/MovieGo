import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from 'react-i18next';
import { usePathname } from "next/navigation";
import { Link as Scroll } from "react-scroll"
import { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Header() {
    const [langMenu, setLangMenu] = useState(false);
    const { t, i18n } = useTranslation();
    const pathname = usePathname()
    const languages = ["uz", "ru", "en"]
    const languageNames: Record<string, string> = {
        "uz": "Uzbek",
        "ru": "Russian",
        "en": "English"
    }

    const handleLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        Cookies.set("language", locale, { expires: 365 });
    };

    return (
        <AnimatePresence mode="wait">
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
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
                        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" />
                        <h1>MovieGo</h1>
                    </Scroll> : <Link href="/" className="logo">
                        <Image src='/logo/logo.png' width={256} height={256} alt="MovieGo Logo" />
                        <h1>MovieGo</h1>
                    </Link>}
                </nav>
                <div className="right">
                    <div className="language"
                        onMouseEnter={() => setLangMenu(true)}
                        onMouseLeave={() => setLangMenu(false)}
                    >
                        <div className={langMenu ? 'lang-menu active' : "lang-menu"}>
                            <div className="selected">
                                <img src={`/language/${i18n.resolvedLanguage}.svg`} alt={i18n.resolvedLanguage} width={21} height={21} />
                                <span>{t("header.language")}</span>
                            </div>
                            {languages.map(lng => (
                                <button
                                    key={lng}
                                    disabled={lng === i18n.resolvedLanguage}
                                    onClick={() => handleLanguage(lng)}
                                >
                                    <img src={`/language/${lng}.svg`} alt={lng} width={21} height={21} />
                                    <span>{languageNames[lng]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div >
            </motion.header >
        </AnimatePresence>
    )
}