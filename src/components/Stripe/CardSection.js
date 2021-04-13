import { CardElement } from "@stripe/react-stripe-js";
import { findByLabelText } from "@testing-library/dom";
import reportWebVitals from "../../reportWebVitals";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "rgb(240, 57, 122)",
      fontSize: "16px",
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

export default function CardSection() {
  return (
        <label className='card-section'>
            Card details
            <CardElement options={CARD_ELEMENT_OPTIONS} />
        </label>
  )
}