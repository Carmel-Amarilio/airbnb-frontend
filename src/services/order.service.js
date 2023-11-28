import { httpService } from './http.service'

const BASE_URL = 'order/'


export const orderService = {
    query,
    get,
    save,
    remove,
    getEmptyOrder,
}

function query(filterBy = {}, sortBy = '') {
    return httpService.get(BASE_URL, { filterBy, sortBy })
}

function get(id) {
    return httpService.get(BASE_URL + id)
}

function save(order) {
    if (order._id) return httpService.put(BASE_URL, order)
    else return httpService.post(BASE_URL, order)
}

function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

function getEmptyOrder({ host, loggedinUser, totalPrice, checkIn, checkOut, guests, miniStay, status }) {
    return {
        hostId: host._id,
        host,
        buyer: loggedinUser,
        totalPrice,
        checkIn,
        checkOut,
        guests: {
            adults: guests.adults,
            children: guests.children,
            infants: guests.infants
        },
        stay: miniStay,
        msgs: [],
        status,
         lastUpdate: Date.now()
    }
}
