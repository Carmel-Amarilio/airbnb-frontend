import { orderService } from "../../services/order.service.js";
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS, UPDATE_ORDER } from "../reducers/order.reducer.js";
import { store } from "../store.js";

export async function loadOrders(filterBy, sort) {
    try {
        let orders = await orderService.query(filterBy, sort)
        store.dispatch({
            type: SET_ORDERS,
            orders
        })
    } catch (error) {
        console.error("Cannot load orders:", error)
        throw error
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch({
            type: REMOVE_ORDER,
            orderId
        })
    } catch (error) {
        console.error("Cannot remove order:", error)
        throw error
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({
            type: UPDATE_ORDER,
            order: savedOrder,
        })
    } catch (error) {
        console.error("Cannot save order:", error)
        throw error
    }
}

export async function addOrder(orderToAdd) {
    try {
        const order = await orderService.save(orderToAdd)
        store.dispatch({
            type: ADD_ORDER,
            order,
        })
        return order
    } catch (error) {
        console.error("Cannot save order:", error)
        throw error
    }
}
