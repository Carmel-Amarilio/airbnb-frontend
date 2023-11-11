import { stayService } from "../../services/stay.service.js";
import { ADD_STAY, REMOVE_STAY, SET_STAYS, UPDATE_STAY } from "../reducers/stay.reducer.js";
import { store } from "../store.js";

export async function loadStays(filterBy) {
    try {
        let stays = await stayService.query(filterBy)
        store.dispatch({
            type: SET_STAYS,
            stays
        })
    } catch (error) {
        console.error("Cannot load stays:", error)
        throw error
    }
}

export async function removeStays(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch({
            type: REMOVE_STAY,
            stayId
        })
    } catch (error) {
        console.error("Cannot remove stay:", error)
        throw error
    }
}

export async function updateStays(stay) {
    try {
        const savedStay = await stayService.save(stay)
        store.dispatch({
            type: UPDATE_STAY,
            stay: savedStay,
        })
    } catch (error) {
        console.error("Cannot save stay:", error)
        throw error
    }
}

export async function addStays(stayToAdd) {
    try {
        const stay = await stayService.save(stayToAdd)
        store.dispatch({
            type: ADD_STAY,
            stay,
        })
    } catch (error) {
        console.error("Cannot save stay:", error)
        throw error
    }
}
