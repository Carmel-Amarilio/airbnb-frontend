import axios from 'axios'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'
import { createStays } from './stayDemoData.service'

const BASE_URL = 'stay/'
const STAYS_KEY = 'stayMB'


export const stayService = {
    query,
    get,
    save,
    remove,
    getEmptyStay,
    getLngLan
}

function query(filterBy = {}) {
    // return storageService.query(STAYS_KEY)
    return httpService.get(BASE_URL, filterBy)
}

function get(id) {
    // return storageService.get(STAYS_KEY, id)
    return httpService.get(BASE_URL + id)
}

function save(stay) {
    if (stay._id) return httpService.put(BASE_URL, stay)
    else return httpService.post(BASE_URL, stay)
    // if (stay._id) return storageService.put(STAYS_KEY, stay)
    // else return storageService.post(STAYS_KEY, stay)
}

function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
    // return storageService.remove(STAYS_KEY, stayId)
}


async function getLngLan(houseNumber, street, city, country) {
    try {
        const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=60607&city=${city}&country=${country}&lang=en&limit=5&format=json&apiKey=${"39b01718a5614cf4bc536ee0344ddee0"}`)
        return res.data.results
    } catch (error) {
        console.log(error);
    }
}


function getEmptyStay(host) {
    return {
        name: "",
        type: "An entire place",
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
        likedByUsers: [],
        DateNotAvailable: []
    }
}

// saveStays()
async function saveStays() {
    const newStays = await createStays()
    console.log(newStays);
    for (let i = 0; i < 50; i++) {
        console.log(newStays[i]);
        save(newStays[i])
    }
}



