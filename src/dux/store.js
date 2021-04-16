import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import {loadState} from '../localStorage'
import {composeWithDevTools} from 'redux-devtools-extension'

// const cartItems = [
//     {
//       id: 1,
//       title: "Samsung",
//       price: 799.99,
//       img:
//         "shorturl.at/ajkq9",
//       amount: 1
//     },
//     {
//       id: 2,
//       title: "Google pixel Max",
//       price: 399.99,
//       img:
//         "shorturl.at/ajkq9",
//       amount: 1
//     },
//     {
//       id: 3,
//       title: "Xiaomi",
//       price: 999.99,
//       img:
//         "shorturl.at/ajkq9",
//       amount: 1
//     }
//   ];

const persistedState = loadState();

// const initialStore = {
//     cart: cartItems,
//     amount: 0,
//     total: 0,
//     persistedState
// }
const rootReducer = combineReducers({
    userReducer,
    itemReducer,
    cartReducer
})

export const store =  createStore(rootReducer, persistedState, composeWithDevTools(
    applyMiddleware(promiseMiddleware)))