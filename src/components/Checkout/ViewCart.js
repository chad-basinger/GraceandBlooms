import React, {Component} from 'react'
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

export default ViewCart;