import { useRouter } from "next/router"
import translate from "@/language/translate.json"
import Link from "next/link"

export default function Need() {
    const { locale } = useRouter()

    return (
        <div id="need">
            <p>{translate[locale].movie.need}</p>
            <div className="sign">
                <Link href="/signup">{translate[locale].movie.signup}</Link>
                <Link href="/login">{translate[locale].movie.login}</Link>
            </div>
        </div>
    )
}
