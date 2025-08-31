import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Need() {
    const { t, i18n } = useTranslation()

    return (
        <div id="need">
            <p>{t("movie.need")}</p>
            <div className="sign">
                <Link href="/signup">{t("movie.signup")}</Link>
                <Link href="/login">{t("movie.login")}</Link>
            </div>
        </div>
    )
}
