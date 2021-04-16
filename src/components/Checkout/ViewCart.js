import React from "react";
import CartItem from './CartItem';
import {Component} from 'react'
import { connect } from 'react-redux';
import { clearCart, remove, getTotals } from '../../dux/cartReducer';
  
class ViewCart extends Component {
  constructor(){
    super()
    
  }

  componentWillMount(){
    this.props.getTotals()
  }

  render(){
  
  if (this.props.cart.length === 0) {
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
        
        {this.props.cart.map((element, index) => {
          console.log('element', element)
          return (
            <div key={index}>
              <p>{element.id}</p>
              <p>{element.selectedSize}</p>
              <p>{element.currentPrice}</p>
            </div>
          )
        })}
      </article>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${this.props.total}</span>
          </h4>
        </div>
        <button className="btn clear-btn"
          onClick={() => this.props.remove()} >clear cart</button>
      </footer>
    </section>
  );
};
}
  
const mapStateToProps = reduxState => {
  return reduxState;
}

// function mapDispatchToProps(dispatch) {
//     return {
//       remove: () => dispatch({ type: CLEAR_CART }),
//       getTotal: () => dispatch({ type: GET_TOTALS })
//     }
//   }
    
  export default connect(mapStateToProps, {clearCart, remove, getTotals})(ViewCart);
  
      
      
      
      
      
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