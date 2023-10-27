import { combineReducers, legacy_createStore as createStore } from "redux"
import { userReducer } from "./reducers/user.reducer"
import { stayReducer } from "./reducers/stay.reducer"


const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)