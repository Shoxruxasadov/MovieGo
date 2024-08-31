import translate from "@/language/translate.json"
import { useRouter } from "next/router"

export default function Footer() {
  const { locale } = useRouter()

  return (
    <footer>
        <hr />
        <div className="rights">
          <p>{translate[locale].footer.rights}</p>
          <p><span>&copy; MovieGo {new Date().getFullYear()} | </span><a href="https://shoxrux.site" target="_blank">{translate[locale].footer.powered}</a></p>
        </div>
    </footer>
  )
}
