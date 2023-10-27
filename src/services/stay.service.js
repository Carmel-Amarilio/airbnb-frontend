import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const BASE_URL = 'stay/'
const STAYS_KEY = 'stayMB'

// _createStays()

export const stayService = {
    query,
    get,
    save,
    remove,
    getEmptyStay,
}

function query(filterBy = {}) {
    return storageService.query(STAYS_KEY)
}

function get(stayId) {
    return storageService.get(STAYS_KEY, stayId)
}

function save(stay) {
    if (stay._id) return storageService.put(STAYS_KEY, stay)
    else return storageService.post(STAYS_KEY, stay)
}

function remove(stayId) {
    return storageService.remove(STAYS_KEY, stayId)
}

function getEmptyStay() {
}

function _createStays() {
    const stay = {
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://res.cloudinary.com/du1jrse2t/image/upload/v1698421405/hotel-4_laxlll.jpg","https://res.cloudinary.com/du1jrse2t/image/upload/v1698421399/hotel-5_ui82qg.jpg","https://res.cloudinary.com/du1jrse2t/image/upload/v1698426697/hotel-1_1_jw2n14.jpg","https://res.cloudinary.com/du1jrse2t/image/upload/v1698426708/hotel-2_w49htt.jpg","https://res.cloudinary.com/du1jrse2t/image/upload/v1698426786/hotel-3_1_mc4lxl.jpg"],
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
            imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
            country: "Portugal",
            countryCode: "PT",
            city: "Lisbon",
            address: "17 Kombo st",
            lat: -8.61308,
            lng: 41.1413
        },
        reviews: [
            {
                id: "madeId",
                txt: "Very helpful hosts. Cooked traditional...",
                rate: 4,
                by: {
                    _id: "u102",
                    fullname: "user2",
                    imgUrl: "/img/img2.jpg"
                }
            }
        ],
        likedByUsers: ['mini-user']
    }
    save(stay)
}