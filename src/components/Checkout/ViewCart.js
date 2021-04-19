import React from "react";
import CartItem from './CartItem';
import {Component} from 'react'
import { connect } from 'react-redux';
import { clearCart, remove, getTotals } from '../../dux/cartReducer';
// import {getUserCart} from '../../dux/'
import axios from "axios";
  
class ViewCart extends Component {
  constructor(props){
    super(props)
    this.state = {
      cart: []
    }
    
  }

  componentWillMount(){
    console.log(this.props, 'REDUX STATE user')
    axios.get(`/api/cart/${this.props.user.id}`)
    .then(res => {
      console.log(res, 'RESPONSE TO VIEW CART')
      this.setState({
        cart: res.data
      })
    })
    .catch(err => console.log(err))
    // this.props.getTotals()
  }

  render(){

  console.log(this.state.cart)
  if (this.state.cart.length === 0) {
    return (
      <section className="cart">
  
        <header>
          <h2>your cart</h2>
          <h4 className="empty-cart">
              is currently empty
          </h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>your cart</h2>
      </header>
      {/* cart items */}
      <article>
        
        {this.state.cart.map((element, index) => {
          console.log('element', element)
          return (
            <div key={index}>
              <p>{element.item_id}</p>
              <p>{element.item_name}</p>
              <img src={element.main_img_url}/>

            </div>
          )
        })}
      </article>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            {/* total <span>${this.props.total}</span> */}
          </h4>
        </div>
        <button className="btn clear-btn">clear cart</button>
      </footer>
    </section>
  );
};
}
  
const mapStateToProps = reduxState => {
  return reduxState.userReducer;
}

// function mapDispatchToProps(dispatch) {
//     return {
//       remove: () => dispatch({ type: CLEAR_CART }),
//       getTotal: () => dispatch({ type: GET_TOTALS })
//     }
//   }
    
  export default connect(mapStateToProps)(ViewCart);
  
      
      
      
      
      
{/* import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class ViewCart extends Component {

    render (){
        return (
            <div>
                Testing View Cart
                <Link to='/viewCart/checkout'>
                    <button>Checkout</button>
                </Link>
            </div>
        )
    }
}

export default ViewCart; */}