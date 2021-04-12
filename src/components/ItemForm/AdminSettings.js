//Place admin can set sizes for bracelets and corresponding prices
import React, {Component} from 'react'
import axios from 'axios'

class AdminSettings extends Component {
    constructor(){
        super()

        this.state = {
            size: '',
            price: '',
            sizeList: []
        }

        this.reset = this.reset.bind(this)
    }

    componentDidMount = () => {
        this.getAllSizes()
        // console.log(this.state.items)
      }

    getAllSizes = () => {
        axios.get('/api/admin/getAllSizes')
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

        axios.post(`/api/admin/addSizeAndPrice`, {size, price})
        .then(res => {
            this.props.addSizePrice(res.data)
            this.reset()
        })
        .catch (err => console.log(err))
    }

    reset(){
        this.setState({size: ''})
        this.setState({price: ''})
    }
    

    render(){
        return (
            <div>
                <div>
                    <input value={this.state.size} name='size' placeholder='add-size' onChange={this.handleInput}/>
                    <input value={this.state.price} name='price' placeholder='add-price' onChange={this.handleInput}/>
                    <button onClick={this.handleSubmit}>Add New Size/Price</button>
                </div>
                <div>
                    {this.state.sizeList.map((el, index) => {
                        return (
                            <div className='size-price' key={index}>
                                <p>{el.size}</p>
                                <p>- - - - - - - - - </p>
                                <p>{el.size_price}</p>
                                <button>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default AdminSettings;