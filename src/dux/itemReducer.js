const initialState = {
    items: '',
    itemViewed: ''
}

const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const GET_ITEM = 'GET_ITEM'

export function getAllItems(itemObj) {
    console.log(itemObj)
    return {
        type: GET_ALL_ITEMS,
        payload: itemObj
        // axios.get('/api/item/all')
    }
}

export function getItem(itemObj){
    console.log(itemObj)
    return {
        type: GET_ITEM,
        payload: itemObj
    }
}

export default function reducer(state = initialState, action){
    console.log(action.payload, 'reducer items')
    switch(action.type){
        case GET_ALL_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case GET_ITEM:
            return {
                ...state,
                itemViewed: action.payload
            }
        default: return state;
    }
}