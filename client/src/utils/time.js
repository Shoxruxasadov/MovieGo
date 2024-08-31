import { useRouter } from "next/router"
import translate from "@/language/translate.json"

export default function time(time) {
    const { locale } = useRouter()

    const hour = Math.floor(time / 60)
    const minute = Math.floor(time % 60)

    if (hour) return `${hour}${translate[locale].movie.h} ${minute}${translate[locale].movie.m}`
    else return  `${minute}${translate[locale].movie.m}`
}