import axios from 'axios';

const initialState = {
    items: [],
    isLoading: true
}

const GET_ALL_ITEMS = 'GET_ALL_ITEMS'

export function getAllItems() {
    return {
        type: GET_ALL_ITEMS,
        payload: axios.get('/api/item/all')
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_ITEMS + "_FULFILLED":
            return {
                ...state,
                items: action.payload.data,
                isLoading: false
            };
        case GET_ALL_ITEMS + "_PENDING":    
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}