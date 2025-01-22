import { useRouter } from "next/router"
import translate from "@/language/translate.json"

export default function Soon() {
    const { locale } = useRouter()

    return (
        <div id="need">
            <p>{translate[locale].movie.soon}</p>
        </div>
    )
}
