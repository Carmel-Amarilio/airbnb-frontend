import { httpService } from './http.service'

const BASE_URL = 'order/'


export const orderService = {
    query,
    get,
    save,
    remove,
    getEmptyOrder,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
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

function getEmptyOrder(host) {
    return {
        name: "",
        type: "Cabins",
        imgUrls: [],
        price: 225.00,
        summary: "Take it easy at this unique and tranquil getaway.",
        capacity: {
            guests: 4,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1
        },
        amenities: [],
        labels: [],
        host,
        loc: {
            country: "",
            countryCode: "",
            city: "",
            street: "",
            houseNumber: "",
            lat: 0,
            lng: 0
        },
        reviews: [],
        likedByUsers: []
    }
}
