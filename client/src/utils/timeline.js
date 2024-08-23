export default function timeline(time) {
    const year = time.substring(0, 7).split('-')[0]
    const month = time.substring(0, 7).split('-')[1]

    function monthText() {
        if (month == '01' || month == '02' || month == '12') return 'Winter'
        if (month == '03' || month == '04' || month == '05') return 'Spring'
        if (month == '06' || month == '07' || month == '08') return 'Summer'
        if (month == '09' || month == '10' || month == '11') return 'Autumn'
    }

    return `${year} ${monthText()}`
}
