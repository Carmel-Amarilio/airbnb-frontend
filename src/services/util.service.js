export const utilService = {
    makeId,
    getRandomIntInclusive,
    debounce,
    saveToStorage,
    loadFromStorage,
    formatDate,
    calculateNights,
    mapRating,
    getLastMonthDates,
    getDatesBetween,
    findConsecutiveAvailableDates
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = (date.getUTCDate() + 1).toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return
    const timeDifference = checkOut.getTime() - checkIn.getTime()
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

function mapRating(reviews) {
    const rating = {}
    const ratingName = ['cleanliness', 'communication', "check-in", 'accuracy', 'location', 'value']
    reviews.map(review => {
        for (const key in review.rate) {
            if (review.rate.hasOwnProperty(key)) {
                if (rating[key]) rating[key] += +review.rate[key]
                else rating[key] = +review.rate[key]
            }
        }
    })
    for (const key in rating) {
        if (rating.hasOwnProperty(key)) rating[key] = rating[key] / reviews.length
    }
    return { rating, ratingName }
}




function getLastMonthDates() {
    const currentDate = new Date();
    const lastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
    );
    const datesArray = [];

    while (lastMonth.getMonth() === currentDate.getMonth() - 1) {
        datesArray.push(
            `${lastMonth.getDate()} ${lastMonth.toLocaleString('default', {
                month: 'short',
            })}`
        );
        lastMonth.setDate(lastMonth.getDate() + 1);
    }

    return datesArray;
    return dates;
}

function getDatesBetween(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}


function findConsecutiveAvailableDates(DateNotAvailable) {
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    for (let i = 0; i <= DateNotAvailable.length + 1; i++) {
        const day1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i + 1)
        const day2 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i + 2)
        const day3 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i + 3)
        const isAllDaysAvailable = [day1, day2, day3].every(day => !DateNotAvailable.includes(day.toISOString()));
        if (isAllDaysAvailable) return { checkIn: day1, checkOut: day3 }
    }
}

