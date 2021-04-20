import {Component} from 'react'
import CardSection from './CardSection'
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

class CheckoutForm extends Component {
  constructor(props){
    super(props)
    
  }
  handleSubmit = async event => {
    event.preventDefault();

    // handle payment request
    const { stripe, elements } = this.props;
  if (!stripe || !elements) {
    return;
  }

  const card = elements.getElement(CardElement);
  const result = await stripe.createToken(card);
  if (result.error) {
    console.log(result.error.message);
  } else {
    console.log(result.token);
    // pass the token to your backend API
  }
    
    
  };

  render() {
    return (
      <div>
        <div className="product-info">
          <h3 className="product-title">Checkout</h3>
          <h4 className="product-price">$999</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button className="btn-pay">Complete Order</button>
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
    return (
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <CheckoutForm stripe={stripe} elements={elements} />
        )}
      </ElementsConsumer>
    );
  }