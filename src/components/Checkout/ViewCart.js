import React from "react";
// import CartItem from './CartItem';
import {Component} from 'react'
import { connect } from 'react-redux';
// import { clearCart, remove, getTotals } from '../../dux/cartReducer';
// import {getUserCart} from '../../dux/'
import axios from "axios";
// import CheckoutComponent from "./CheckoutComponent";
import CheckoutNew from './CheckoutNew'
  
class ViewCart extends Component {
  constructor(props){
    super(props)
    this.state = {
      cart: [],
      total: 0
    }
    
  }

  componentWillMount(){
    console.log(this.props, 'REDUX STATE user')
    axios.get(`/api/cart/${this.props.user.id}`)
    .then((res) => {
      console.log(res.data, 'RESPONSE TO VIEW CART')
      // let result = res.data.map(a => decimal.parse(a.size_price, NumberStyles.Currency));
      var result = res.data.map(a => a.size_price.replace(/[^0-9.-]+/g,"") * a.quantity)
      function sum(a) {
        return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
      }
      let finalResult = sum(result).toFixed(2)
      // console.log(finalResult)
      // const finalResult = (result
      //   .map(function(i) { // assure the value can be converted into an integer
      //     return /^\d+(\.\d+)?$/.test(i) ? parseFloat(i) : 0;
      //   })
      //   .reduce(function(a, b) { // sum all resulting numbers
      //     return (a + b)
      //   }) /
      //   result.length).toFixed(1);
      
      // console.log(finalResult, 'final Result');
      this.setState({total: finalResult})
      this.setState({
        cart: res.data
      })
      
      // console.log(total, 'result')
      
    })
    .catch(err => console.log(err))
    // this.props.getTotals()

    
  }

  clearCart = () => {
    axios.delete(`/api/cart/clear/${this.props.user.id}`)
    .then(res => {
      console.log(res, 'RESPONSE TO CLEAR CART')
      this.setState({
        cart: res.data
      })
      console.log('state cart after clear cart', this.state.cart)
    })
    .catch(err => console.log(err))
  }

  render(){

  console.log(this.state.cart)
  if (this.state.cart.length === 0) {
    return (
      <section className="cart">
  
        <header>
          <h2>YOUR CART</h2>
          <h4 className="empty-cart">
              is currently empty!
          </h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>CART</h2>
      </header>
      {/* cart items */}
      <div className='cart-article-section'>
        <article className='cart-article'>
          
          {this.state.cart.map((element, index) => {
            console.log('element', element)
            return (
              <div className='cart-item' key={index}>
                <br/>
                <p>{element.item_id}</p>
                <p>{element.item_name}</p>
                <img className='cart-img' src={element.main_img_url} alt='cart-item-img'/>
                <p>Size: {element.size}</p>
                <p>Quantity: {element.quantity}</p>
                <p className='cart-item-price'>Each/{element.size_price}</p>


              </div>
            )
          })}
        </article>

      </div>
      {/* cart footer */}
        <hr />
      <footer>
        <div className="cart-total">
          <h4>
            total <span>${this.state.total}</span>
          </h4>
        </div>
        <button className="clear-btn" onClick={this.clearCart}>Clear Cart</button>
      {/* <CheckoutNew total={this.state.total} name={'Grace and Blooms Bracelets'}/> */}
      <p>Working on fixing a bug with payment processing. 
      </p>
        <button onClick={() => window.location.href = 'https://www.etsy.com/shop/graceandbloomsco/'}>Complete Order here</button>
      </footer>
      {/* <button onClick={() => this.props.history.push(`/viewCart/checkout`)}>Checkout/Pay with Card</button> */}
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
  