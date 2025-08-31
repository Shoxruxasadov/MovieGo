import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Cookies from "js-cookie";

export default function LanguageWidget() {
    const [langMenu, setLangMenu] = useState(false);
    const { t, i18n } = useTranslation();
    const languages = ["uz", "ru", "en"]

    const handleLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        Cookies.set("language", locale, { expires: 365 });
    }

    return (
        <div className="language"
            onMouseEnter={() => setLangMenu(true)}
            onMouseLeave={() => setLangMenu(false)}
        >
            <div className={langMenu ? 'lang-menu active' : "lang-menu"}>
                <div className="selected">
                    <img src={`/language/${i18n.resolvedLanguage}.svg`} alt={i18n.resolvedLanguage} width={21} height={21} />
                    <span>{t("header.language")}</span>
                </div>
                {languages.map((lng: string) => (
                    <button
                        key={lng}
                        disabled={lng === i18n.resolvedLanguage}
                        onClick={() => handleLanguage(lng)}
                    >
                        <img src={`/language/${lng}.svg`} alt={lng} width={21} height={21} />
                        <span>{lng}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}