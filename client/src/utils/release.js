import { useRouter } from "next/router"
import translate from "@/language/translate.json"

export default function Release({ time }) {
    const { locale } = useRouter()
    const year = time.substring(0, 10).split('-')[0]
    const month = time.substring(0, 10).split('-')[1]
    const day = time.substring(0, 10).split('-')[2]

    function monthText() {
        if (month == '01') return translate[locale].date.release.january
        if (month == '02') return translate[locale].date.release.february
        if (month == '03') return translate[locale].date.release.march
        if (month == '04') return translate[locale].date.release.april
        if (month == '05') return translate[locale].date.release.may
        if (month == '06') return translate[locale].date.release.june
        if (month == '07') return translate[locale].date.release.july
        if (month == '08') return translate[locale].date.release.august
        if (month == '09') return translate[locale].date.release.september
        if (month == '10') return translate[locale].date.release.october
        if (month == '11') return translate[locale].date.release.november
        if (month == '12') return translate[locale].date.release.december
    }

    return `${day} ${monthText()} ${year}`
}