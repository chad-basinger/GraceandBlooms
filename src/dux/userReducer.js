const { findAllByTestId } = require("@testing-library/dom");

const initialState = {
    user: '',
    isLoggedIn: findAllByTestId
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER_SESSION = 'GET_USER_SESSION'

export function registerUser(userObj){
    return {
        type: REGISTER_USER,
        payload: userObj
    }
}

export function loginUser(userObj){
    console.log(userObj)
    return {
        type: LOGIN_USER,
        payload: userObj
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}
export function getSession(userObj) {
    return {
        type: GET_USER_SESSION,
        payload: userObj
    }
}


//reducer
export default function reducer(state= initialState, action){
    switch(action.type){
        case REGISTER_USER: 
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER: 
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            }
        case LOGOUT_USER: 
            return initialState
        
        case GET_USER_SESSION: 
            return {
                ...state,
                user: action.payload
            }


        default: return state
    }
}