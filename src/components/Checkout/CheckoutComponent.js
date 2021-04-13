import { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from '../Stripe/CheckoutForm'

const {STRIPE_PUBLISHABLE_KEY} = process.env

const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);

export default class CheckoutComponent extends Component{


    render(){
        return (
            <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
            </div>
        )
    }
}