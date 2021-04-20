import {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getItem} from '../../dux/itemReducer'

class EditItem extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
            description: '',
            main_img_url: '',
            image_urls: [],
            displayPrice: '',
            size: '',
            price: '',
            sizeList: [],
            is_active: true
        }

        this.reset = this.reset.bind(this)
    }

    componentDidMount = () => {
        this.getAllSizes()
        this.getItem()

        // console.log(this.state.items)
      }
    
    getItem = () => {
        axios.get(`/api/item/${this.props.match.params.id}`)
        .then(responseItem => {
            console.log('response item', responseItem)
            // this.setState({sizeList: responseSizes.data})
        })
        .catch(err => console.log(err.response))
    }

    updateItem = () => {
        const {name, description, displayPrice, is_active} = this.state
        axios.put(`/api/item/${this.props.match.params.id}`, {name, description, displayPrice, is_active})
        .then(updatedItem => {
            console.log('updated item', updatedItem)
            // this.setState({sizeList: responseSizes.data})
        })
        .catch(err => console.log(err.response))
    }

    getAllSizes = () => {
        axios.get(`/api/admin/getAllSizes/${this.props.match.params.id}`)
        .then(responseSizes => {
            console.log('response sizes', responseSizes)
            this.setState({sizeList: responseSizes.data})
        })
        .catch(err => console.log(err.response))
    }
    handleInput = e => {
        const {name, value} = e.target;

        this.setState({[name]: value})
    }

    handleSubmit = () => {
        const {size, price} = this.state;

        axios.post(`/api/admin/addSizeAndPrice/${this.props.match.params.id}`, {size, price})
        .then(res => {
            this.getAllSizes()
            // this.props.addSizePrice(res.data)
            this.reset()
        })
        .catch (err => console.log(err))
    }

    reset(){
        this.setState({size: ''})
        this.setState({price: ''})
    }

    handleDelete(id){
        axios.delete(`/api/admin/size/${id}`)
        .then(_ => this.getAllSizes())
        .catch (err => console.log(err))
    }


    render(){

        const Item = this.props.itemReducer.itemViewed.item[0]
        return(
            <div>
                <p>
                    Name of Item: 
                    <input name='name' onChange={this.handleInput} id='itemName' placeholder='item name'/>
                </p>
                <p>
                    Display Price: 
                    <input name='displayPrice' onChange={this.handleInput} id='displayPrice' placeholder='price displayed on listing'/>
                </p>
                <p>
                    Item Description: 
                    <input name='description' onChange={this.handleInput} id='item-description' placeholder='item description'/>
                </p>
                <div>
                    <input value={this.state.size} name='size' placeholder='add-size' onChange={this.handleInput}/>
                    <input value={this.state.price} name='price' placeholder='add-price' onChange={this.handleInput}/>
                    <button onClick={this.handleSubmit}>Add New Size/Price</button>
                </div>
                <div>
                    {this.state.sizeList.map((el, index) => {
                        return (
                            <div className='size-price' key={index}>
                                <div className='size-price-listed'>
                                    <p>{el.size}</p>
                                    <p> / </p>
                                    <p>{el.size_price}</p>
                                </div>
                                <div>
                                    <button onClick={_ => this.handleDelete(el.size_id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <img src={Item.main_img_url} className='edit-item-main-img'/>
                <button>Update Item</button>
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

export default connect(mapStateToProps, {getItem})(EditItem);