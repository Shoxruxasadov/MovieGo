import { useRouter } from "next/router"
import translate from "@/language/translate.json"

export default function timeline(time) {
    const { locale } = useRouter()
    const year = time.substring(0, 7).split('-')[0]
    const month = time.substring(0, 7).split('-')[1]

    function monthText() {
        if (month == '01' || month == '02' || month == '12') return translate[locale].date.season.winter
        if (month == '03' || month == '04' || month == '05') return translate[locale].date.season.spring
        if (month == '06' || month == '07' || month == '08') return translate[locale].date.season.summer
        if (month == '09' || month == '10' || month == '11') return translate[locale].date.season.autumn
    }

    return `${year} ${monthText()}`
}
