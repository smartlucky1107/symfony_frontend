export function handleConvertDateFormat(date) {
    if (date) {
        if (isNaN(date)) {
            date = new Date(date);
        } else {
            date = new Date(date * 1000);
        }
        let dateDay = date.getDate();
        let dateMonth = date.getMonth() + 1;
        let dateYear = date.getFullYear();

        return `${dateDay < 10 ? `0${dateDay}` : dateDay}-${
            dateMonth < 10 ? `0${dateMonth}` : dateMonth
        }-${dateYear}`;
    } else {
        return `-`;
    }
}
export function handleConvertTimeFormat(date) {
    if (isNaN(date)) {
        date = new Date(date);
    } else {
        date = new Date(date * 1000);
    }
    let dateHour = date.getHours();
    let dateMin = date.getMinutes();
    return `${dateHour < 10 ? `0${dateHour}` : dateHour}:${
        dateMin < 10 ? `0${dateMin}` : dateMin
    }`;
}

export function handleConvertDateFormatFilter(date) {
    let dateDay = date.getDate();
    let dateMonth = date.getMonth() + 1;
    let dateYear = date.getFullYear();

    return `${dateDay}-${dateMonth}-${dateYear}`;
}
