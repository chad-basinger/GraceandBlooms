import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../dux/itemReducer'
// import {Dropdown} from 'react-bootstrap'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {addToCart} from '../dux/cartReducer'


class ViewItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            loading: 'initial',
            sizeList: [],
            currentPrice: '',
            chosenSize: 'Choose bracelet length',
            quantity: 1

        }
        // Although
        // this.addToCart = this.addToCart.bind(this)
    }

    componentDidMount(){
        console.log('props id', this.props)
        this.getAllSizes()
        this.setState({loading: 'true'})
        axios.get(`/api/item/${this.props.match.params.id}`)
        .then(res => {
            this.props.getItem(res.data)
            this.setState({loading: 'false'})
            console.log(res.data, 'THIS IS IT')
            this.setState({currentPrice: res.data.item[0].item_price})

            
        })
    }

    onSelect = (e) => {
        // console.log('e target', e.target)
        this.setState({currentPrice: e.target.value})
        this.setState({chosenSize: e.target.value})
        
    }

    getAllSizes = () => {
        axios.get(`/api/admin/getAllSizes/${this.props.match.params.id}`)
        .then(responseSizes => {
            console.log('response sizes', responseSizes)
            this.setState({sizeList: responseSizes.data})
        })
        .catch(err => console.log(err.response))
    }

    addToCart = async () => {
        console.log(this.props.user, 'add to cart this.props.user')
        const {quantity, chosenSize} = this.state
        if(this.props.user.isLoggedIn === true){
            //insert axios request HERE to add the item to the cart, insert into user_cart
            axios.post(`/api/cart/${this.props.user.user.id}/${this.props.match.params.id}`, {quantity, chosenSize})
            .then()
        }
        //if user is NOT logged in, take them to the login page. 
        else{
            console.log('user is NOT logged in')
            this.showPleaseLogin()
            await new Promise(resolve => setTimeout(resolve, 4000));
            this.props.history.push('/auth');
        }

        // const currentItem = {
        //     id: this.props.match.params.id,
        //     chosenSize: this.state.chosenSize,
        //     currentPrice: this.state.currentPrice

        // }
        // console.log('current item', currentItem)
        // this.props.addToCart(currentItem)
        // this.showToast()
    }

    showPleaseLogin() {
        // Get the snackbar DIV
        var x = document.getElementById("login-required");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    goToItemView(path) {
        this.props.history.push(path);
      }

    showToast() {
        // Get the snackbar DIV
        var x = document.getElementById("success");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    // getItemById(id){
    //     axios.get(`/api/item/${id}`)
    //     .then(res => {
    //         this.props.getItem(res.data)
    //     })

    // }



    render (){
        console.log('props items on viewItem', this.props.itemReducer)
        
        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }
        
        
        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        const Item = this.props.itemReducer.itemViewed.item[0]
        // the following maps the options from state and provides the value, label that dropdown is looking for.
        const options = this.state.sizeList.map(el => {
            return {
                value: el.size_price,
                label: `${el.size} - ${el.size_price}`
            }
        })
    
        console.log('options', this.state.sizeList)
        
        return (
            <div>
                <div
                    onClick={
                                () => this.goToItemView(`/editItem/${this.props.match.params.id}`)
                                // () => window.open(element.main_img_url)
                                }>
                    <button>Edit Item</button>
                </div>
                <section className='view-item-section'>
                    <h2>
                        {Item.item_name}
                        {this.state.currentPrice}
                    </h2>
                    <p>{Item.item_description}</p>
                    {/* <Dropdown options={options} onChange={this._onSelect, this.onSelect} value={'Select a Size'} placeholder="Select an option" />; */}
                    <label for='sizes'>Choose a bracelet length:</label>
                    <select value={this.state.sizeList} onChange={this.onSelect} id='sizes'>
                        <option value={this.state.chosenSize} label={this.state.chosenSize}>{this.state.chosenSize}</option>
                    {options.map((option) => (
                        <option value={option.value} title={option.label}>{option.label}</option>
                    ))}
                </select>
                <img src={Item.main_img_url} className='view-item-main-img'/>
                <button onClick={() => this.addToCart()}>Add to Cart</button>
                <div id="success">Successfully added to the cart!</div>
                <div id="login-required">Please login before completing your order.</div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user: reduxState.userReducer,
        itemReducer: reduxState.itemReducer
    };
}

export default connect(mapStateToProps, {getItem, addToCart})(ViewItem);