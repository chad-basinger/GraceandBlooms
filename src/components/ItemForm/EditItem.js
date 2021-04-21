import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getItem} from '../../dux/itemReducer'
import UploadImage from '../AWS-SDK/UploadImage'
import { useHistory } from "react-router-dom";

class EditItem extends Component {
    constructor(props){
        super(props)
        // let history = useHistory();

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
            this.setState({name: responseItem.data.item[0].item_name})
            this.setState({description: responseItem.data.item[0].item_description})
            this.setState({displayPrice: responseItem.data.item[0].item_price})
            this.setState({main_img_url: responseItem.data.item[0].main_img_url})
            this.setState({is_active: responseItem.data.item[0].is_active})
        })
        .catch(err => console.log(err.response))
    }

    // updateItem = () => {
    //     const {name, description, displayPrice, is_active} = this.state
    //     axios.put(`/api/item/${this.props.match.params.id}`, {name, description, displayPrice, is_active})
    //     .then(updatedItem => {
    //         console.log('updated item', updatedItem)
    //         // this.setState({sizeList: responseSizes.data})
    //     })
    //     .catch(err => console.log(err.response))
    // }

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

    handleSubmitSize = () => {
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

    onAddImage = (img) => {
        var newImgList = [...this.state.image_urls]
        newImgList.push(`${img}`)
        this.setState({image_urls: newImgList})
        console.log(this.state.image_urls)
    }

    handleUpdateItem = () => {
        const {name, description, main_img_url, image_urls, displayPrice, is_active} = this.state;
        //axios put items table using id and this.state
        axios.put(`/api/item/${this.props.match.params.id}`, {name, description, main_img_url, displayPrice, is_active, image_urls})
        .then(updatedItem => {
            console.log('updated item', updatedItem)
        })
        .catch (err => console.log(err))
        //axios insert into item_images using item_id, image_url
        axios.post(`/api/item/addImages/${this.props.match.params.id}`, {image_urls})
        .then(updatedItemImages => {
            console.log('updated item IMAGES', updatedItemImages)
            this.props.history.goBack()

        })
        .catch (err => console.log(err))
    }


    render(){

        const Item = this.props.itemReducer.itemViewed.item[0]
        return(
            <div className='edit-item-section'>
                <p>
                    Name of Item: 
                    <input className='input-long' name='name' defaultValue={Item.item_name} onChange={this.handleInput} id='itemName' placeholder='item name'/>
                </p>
                <p>
                    Listing Price: 
                    <input className='input-short' name='displayPrice' defaultValue={Item.item_price} onChange={this.handleInput} id='displayPrice' placeholder='listing price'/>
                </p>
                <p>
                    Item Description: 
                    <input className='input-description' name='description' defaultValue={Item.item_description} onChange={this.handleInput} id='item-description' placeholder='item description'/>
                </p>
                <div>
                    <input value={this.state.size} className='input-long' name='size' placeholder='add-size' onChange={this.handleInput}/>
                    <input value={this.state.price} className='input-short' name='price' placeholder='add-price' onChange={this.handleInput}/>
                    <button onClick={this.handleSubmitSize}>Add New Size/Price</button>
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
                <div className='main-img-div-edit-item'>
                    <p>Main Image on Listing</p>
                    <img src={Item.main_img_url} className='edit-item-main-img'/>
                    {this.state.image_urls.map((el, index) => {
                        // console.log(el, 'el from maps')
                        return (
                            <img className='mini-pic' src={el} key={index} alt={el.data}/>
                            
                        )
                    })}
                    <UploadImage onAddImage={this.onAddImage}/>
                </div>

                <button className='submit-button' onClick={this.handleUpdateItem}>Update Item</button>
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