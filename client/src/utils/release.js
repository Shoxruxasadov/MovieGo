export default function release(time) {
    const year = time.substring(0, 10).split('-')[0]
    const month = time.substring(0, 10).split('-')[1]
    const day = time.substring(0, 10).split('-')[2]

    function monthText() {
        if (month == '01') return 'January'
        if (month == '02') return 'February'
        if (month == '03') return 'March'
        if (month == '04') return 'April'
        if (month == '05') return 'May'
        if (month == '06') return 'June'
        if (month == '07') return 'July'
        if (month == '08') return 'August'
        if (month == '09') return 'September'
        if (month == '10') return 'October'
        if (month == '11') return 'November'
        if (month == '12') return 'December'
    }

    return `${day} ${monthText()} ${year}`
}