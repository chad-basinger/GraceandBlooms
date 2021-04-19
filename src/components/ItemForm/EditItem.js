import {Component} from 'react'
import axios from 'axios'

class EditItem extends Component {
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
    }


    render(){
        return(
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
            </div>
        )
    }
}

export default EditItem;