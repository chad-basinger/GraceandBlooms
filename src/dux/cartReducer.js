
// import {
//     INCREASE,
//     DECREASE,
//     REMOVE,
//     CLEAR_CART,
//     GET_TOTALS,
//   } from './actions';

const initialState ={
    cart: [],
    amount: 0,
    total: 0,
}

export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'
export const REMOVE = 'REMOVE'
export const CLEAR_CART = 'CLEAR_CART'
export const GET_TOTALS = 'GET_TOTALS'

export function increase(userObj){
    return {
        type: INCREASE,
        payload: userObj
    }
}

export function decrease(userObj){
    console.log(userObj)
    return {
        type: DECREASE,
        payload: userObj
    }
}

export function remove() {
    return {
        type: REMOVE
    }
}
export function clearCart(userObj) {
    return {
        type: CLEAR_CART,
        payload: userObj
    }
}

export function getTotals(userObj) {
    return {
        type: GET_TOTALS,
        payload: userObj
    }
}
    
  function reducer(state = initialState, action) {
    if (action.type === DECREASE) {
      return {
        ...state, cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            if (item.amount === 0) {
              return item;
            } else {
              item.amount--;
            }
          }
          return item;
        })
      }
    }
    if (action.type === INCREASE) {
      return {
        ...state, cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.amount++;
          }
          return item;
        })
    }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === REMOVE) {
    return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
      const { price, amount } = cartItem;
      cartTotal.amount += amount;
      cartTotal.total += Math.floor(amount * price);
      return cartTotal;
    }, { amount: 0, total: 0 });
    return { ...state, total, amount };
  }
  return state;
}
  
export default reducer;