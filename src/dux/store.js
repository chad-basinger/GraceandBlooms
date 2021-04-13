import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    userReducer,
    itemReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))