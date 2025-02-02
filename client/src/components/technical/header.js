import { serverSideTranslations } from 'next-i18next';
import useLocalStorage from 'use-local-storage';
import { Link as Scroll } from "react-scroll"
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import translate from "@/language/translate.json"

export default function Header() {
    const [lang, setLang] = useLocalStorage("locale", "ru");
    const [langMenu, setLangMenu] = useState(false);
    const { locale } = useRouter()
    const pathname = usePathname()
    const router = useRouter()

    const handleLanguage = locale => {
        setLang(locale)
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <header>
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