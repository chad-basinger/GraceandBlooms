import {Component} from 'react'
import UploadImage from '../AWS-SDK/UploadImage'
import axios from 'axios'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            // main_img_url: '',
            // image_urls: [],
            displayPrice: '',
            // size: '',
            // price: '',
            // sizeList: [],
            // index: -1,
            is_active: true
            
        }
    }

    // componentDidMount = () => {
    //     // this.getAllSizes()
    //     // console.log(this.state.items)
    //   }

    // getAllSizes = () => {
    //     axios.get(`/api/admin/getAllSizes/${this.props.match.params.id}`)
    //     .then(responseSizes => {
    //         console.log('response sizes', responseSizes)
    //         this.setState({sizeList: responseSizes.data})
    //     })
    //     .catch(err => console.log(err.response))
    // }

    handleInput = e => {
        const {name, value} = e.target;

        this.setState({[name]: value})
    }

    handleImageAdd = e => {
        const {name, value} = e.target;

        this.setState({[name]: value})
    }

    // handleSubmitAdd = () => {
    //     const {size, price, index} = this.state;
    //     var newsizeList = this.state.sizeList.push(
    //         {
    //             sl_index: index + 1,
    //             sl_size: size,
    //             sl_price: price
    //         })
    //     this.setState({sizeList: newsizeList})
    //     console.log(this.state.sizeList, 'sizeList')
    // }

    // handleDeleteStateSize = (index) => {
    //     var newsizeList = this.state.sizeList.splice( index, 1)
    //     this.setState({sizeList: newsizeList})
    // }
    // axios.post(`/api/admin/addSizeAndPrice/${this.props.match.params.id}`, {size, price})
    // .then(res => {
    //     this.getAllSizes()
    //     // this.props.addSizePrice(res.data)
    //     this.reset()
    // })
    // .catch (err => console.log(err))

    // reset(){
    //     this.setState({size: ''})
    //     this.setState({price: ''})
    // }



    render(){
        return (
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
                    *Add a Size/Price in the Edit Item form after creating the listing* 
                </div>
                <div>
                    *Add images in the Edit Item form after creating the listing* 
                </div>
                {/* <div>
                    {this.state.sizeList.map((el, index) => {
                        return (
                            <div className='size-price' key={index}>
                                <div className='size-price-listed'>
                                    <p>{el.sl_size}</p>
                                    <p> / </p>
                                    <p>{el.sl_price}</p>
                                </div>
                                <div>
                                    <button onClick={_ => this.handleDeleteStateSize(el.sl_index)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div> */}
                <div>
                    <UploadImage/>
                </div>

            </div>

        )
    }
}

export default AddItem;