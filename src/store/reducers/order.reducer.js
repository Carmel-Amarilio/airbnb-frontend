
export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'


const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action = {}) {
    let orders
    switch (action.type) {

        case SET_ORDERS:
            return { ...state, orders: [...action.orders] }
        case ADD_ORDER:
            return { ...state, orders: [action.order, ...state.orders] }
        case UPDATE_ORDER:
            return { ...state, orders: state.orders.map(order => order._id === action.order._id ? action.order : order) }
        case REMOVE_ORDER:
            orders = state.orders.filter(order => order._id !== action.orderId)
            return { ...state, orders }


        default:
            return state
    }
}