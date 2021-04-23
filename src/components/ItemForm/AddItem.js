import {Component} from 'react'
import UploadImageOnCreate from '../AWS-SDK/UploadImageOnCreate'
import axios from 'axios'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            main_img_url: '',
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

    createListing = () => {
        const {name, description, displayPrice, is_active, main_img_url} = this.state;
        axios.post('/api/item/add', {name, description, displayPrice, is_active, main_img_url})
        .then(_ => {
            this.reset()
            this.props.history.push('/');
        })
       
    }

    onAddMainImage = (img) => {
        this.setState({main_img_url: img})
        console.log(this.state.main_img_url)
        this.showImage()
    }

    showImage() {
        // Get the snackbar DIV
        var x = document.getElementById("item-img-added");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // // After 3 seconds, remove the show class from DIV
        // setTimeout(function(){ x.className = x.className.replace("show", ""); });
    }

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

    reset = () => {
        this.setState({size: ''})
        this.setState({price: ''})
        this.setState({description: ''})
        this.setState({is_active: true})
    }



    render(){
        return (
            <div className='add-item-section'>
                <div>
                    Name of Item: 
                    <input name='name' onChange={this.handleInput} id='itemName' placeholder='item name'/>
                </div>
                <div>
                    Display Price: 
                    <input name='displayPrice' onChange={this.handleInput} id='displayPrice' placeholder='price displayed on listing'/>
                </div>
                <div className='description-div'>
                    <p>
                    Item Description: 
                    </p>
                    <input className='input-description' onChange={this.handleInput} id='item-description' placeholder='item description'/>
                </div>
                <div>
                    *Add a Size/Price in the Edit Item form after creating the listing* 
                </div>
                <img id='item-img-added' className='' src={this.state.main_img_url} alt={this.state.main_img_url}/>
                <UploadImageOnCreate onAddMainImage={this.onAddMainImage}/>
                <div>
                    *Add more images in the Edit Item form after creating the listing* 
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
                    <button className='submit-button' onClick={this.createListing}>Create Item Listing</button>
                </div>

            </div>

        )
    }
}

export default AddItem;