import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
// require('dotenv').config()
// import Stripe from "stripe";



toast.configure()
// const {STRIPE_PUBLISHABLE_KEY} = process.env

export default function CheckoutNew (props) {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         product: {
    //             name: this.props.name,
    //             price: this.props.total,
    //             description: "Cute Bracelets"
    //         }
    //     }
    // }
    var [product] = React.useState({
        name: props.name,
        price: props.total,
        description: "Cool car"
      });

      async function handleToken (token, addresses) {
        const response = await axios.post(
          "http://localhost:3000/#/viewCart/checkout",
          { token, product }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      }

      function handleToken (token, addresses) {
          console.log(token, addresses)
      }
    
    
        return (
            <div className='stripe-container'>
                <div className='product'>
    
                </div>
                <StripeCheckout 
                stripeKey='pk_test_51Ifs8VCJOqgNi9m25KvT5fbS1MPYnWPMYsBExoeRjMqOYGnF25vgy4kPnZwXmVZMBg5KD2dMLNEdexZ09nqNXKhZ00JgFQ8IST'
                token={handleToken}
                billingAddress
                shippingAddress
                amount={product.price * 100}
                name={product.name}
    
                />
    
            </div>
        )

    
}