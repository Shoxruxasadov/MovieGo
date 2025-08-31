import { useTranslation } from "react-i18next"

export default function Soon() {
    const { t, i18n } = useTranslation()

    return (
        <div id="need">
            <p>{t("movie.soon")}</p>
        </div>
    )
}
