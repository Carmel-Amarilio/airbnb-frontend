
export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'


const initialState = {
    stays: [],

}

export function stayReducer(state = initialState, action = {}) {
    let stays
    switch (action.type) {

        case SET_STAYS:
            return { ...state, stays: [...action.stays] }
        case ADD_STAY:
            return { ...state, stays: [action.stay, ...state.stays] }
        case UPDATE_STAY:
            return { ...state, stays: state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay) }
        case REMOVE_STAY:
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays }


        default:
            return state
    }
}