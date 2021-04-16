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
export const ADD_TO_CART = 'ADD_TO_CART'

//handler functions
export function increase(itemObj){
    return {
        type: INCREASE,
        payload: itemObj
    }
}

export function decrease(itemObj){
    console.log(itemObj)
    return {
        type: DECREASE,
        payload: itemObj
    }
}

export function remove() {
    return {
        type: REMOVE
    }
}
export function clearCart(itemObj) {
    return {
        type: CLEAR_CART,
        payload: itemObj
    }
}

export function getTotals(itemObj) {
    return {
        type: GET_TOTALS,
        payload: itemObj
    }
}

export function addToCart(itemObj) {
  return {
      type: ADD_TO_CART,
      payload: itemObj
  }
}
    
//reducer
  export default function reducer(state = initialState, action) {
    switch(action.type){
      case ADD_TO_CART:
        return {
          ...state,
          cart: action.payload,
          amount: 1,
          total: (state.total += action.payload.currentPrice)
        }
      case INCREASE:
        return{
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === action.payload.id) {
              item.amount++;
            }
            return item;
          })
        }
      case DECREASE: 
        return {
          ...state, 
          cart: state.cart.map((item) => {
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
      case CLEAR_CART:
        return { 
          ...state, 
          cart: [] 
        }
      case REMOVE: 
        return {
          ...state, 
          cart: state.cart.filter(item => item.id !== action.payload.id)
        }
      case GET_TOTALS:
        // let { total, amount } = 
        // state.cart.reduce((cartTotal, cartItem) => {
        //   const { price, amount } = cartItem;
        //   cartTotal.amount += amount;
        //   cartTotal.total += Math.floor(amount * price);
        //   return cartTotal;
        // }, { amount: 0, total: 0 });
        return { 
          ...state
        };
      default: return state;
    }
  }






  //   if (action.type === DECREASE) {
  //     return {
  //       ...state, cart: state.cart.map((item) => {
  //         if (item.id === action.payload.id) {
  //           if (item.amount === 0) {
  //             return item;
  //           } else {
  //             item.amount--;
  //           }
  //         }
  //         return item;
  //       })
  //     }
  //   }
  //   if (action.type === INCREASE) {
  //     return {
  //       ...state, cart: state.cart.map((item) => {
  //         if (item.id === action.payload.id) {
  //           item.amount++;
  //         }
  //         return item;
  //       })
  //   }
  // }
//   if (action.type === CLEAR_CART) {
//     return { ...state, cart: [] };
//   }
//   if (action.type === REMOVE) {
//     return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
//   }
//   if (action.type === GET_TOTALS) {
//     let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
//       const { price, amount } = cartItem;
//       cartTotal.amount += amount;
//       cartTotal.total += Math.floor(amount * price);
//       return cartTotal;
//     }, { amount: 0, total: 0 });
//     return { ...state, total, amount };
//   }
//   return state;
// }
  
// export default reducer;