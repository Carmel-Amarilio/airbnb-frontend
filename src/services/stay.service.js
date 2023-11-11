import axios from 'axios'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'

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

function _createStays() {
    const stay = {
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://res.cloudinary.com/du1jrse2t/image/upload/v1698421405/hotel-4_laxlll.jpg", "https://res.cloudinary.com/du1jrse2t/image/upload/v1698421399/hotel-5_ui82qg.jpg", "https://res.cloudinary.com/du1jrse2t/image/upload/v1698426697/hotel-1_1_jw2n14.jpg", "https://res.cloudinary.com/du1jrse2t/image/upload/v1698426708/hotel-2_w49htt.jpg", "https://res.cloudinary.com/du1jrse2t/image/upload/v1698426786/hotel-3_1_mc4lxl.jpg"],
        price: 80.00,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
            "TV",
            "Wifi",
            "Kitchen",
            "Smoking allowed",
            "Pets allowed",
            "Cooking basics"
        ],
        labels: [
            "Top of the world",
            "Trending",
            "Play",
            "Tropical"
        ],
        host: {
            _id: "u101",
            fullname: "Davit Pok",
            imgUrl: "https://res.cloudinary.com/du1jrse2t/image/upload/v1698603637/download_jtm9hv.jpg",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: 38.722252,
            lng: -9.139337
        },
        reviews: [
            {
                "id": "cex3BQ",
                "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.",
                "rate": {
                    "cleanliness": 4.7,
                    "communication": 4.9,
                    "check-in": 4.7,
                    "accuracy": 4.6,
                    "location": 4.5,
                    "value": 4.8
                },
                "by": {
                    "_id": "622f3407e36c59e6164fc004",
                    "fullname": "Kiesha",
                    "imgUrl": "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/male/68.jpg"
                }
            },
            {
                "id": "lc2vxY",
                "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. ",
                "rate": {
                    "cleanliness": 4.6,
                    "communication": 4.6,
                    "check-in": 4.7,
                    "accuracy": 5,
                    "location": 5,
                    "value": 4.7
                },
                "by": {
                    "_id": "622f3403e36c59e6164fb204",
                    "fullname": "Chris",
                    "imgUrl": "https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/10.jpg"
                }
            },
        ],
        likedByUsers: ['mini-user']
    }
    save(stay)
}