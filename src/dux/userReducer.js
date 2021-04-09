const initialState = {
    user: null
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
        type: GET_SESSION,
        payload: userObj
    }
}


//reducer