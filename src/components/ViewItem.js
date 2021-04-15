import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../dux/itemReducer'
// import {Dropdown} from 'react-bootstrap'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


class ViewItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: 'initial',
            sizeList: [],
            currentPrice: ''
        }
        // Although
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
        this.setState({currentPrice: e.target.value})
    }

    getAllSizes = () => {
        axios.get('/api/admin/getAllSizes')
        .then(responseSizes => {
            console.log('response sizes', responseSizes)
            this.setState({sizeList: responseSizes.data})
        })
        .catch(err => console.log(err.response))
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
        console.log(`${this.state.sizeList.size}`)
        return (
            <section className='view-item-section'>
                <h2>
                    {Item.item_name}
                    {this.state.currentPrice}
                </h2>
                <p>{Item.item_description}</p>
                {/* <Dropdown options={options} onChange={this._onSelect, this.onSelect} value={'Select a Size'} placeholder="Select an option" />; */}
                <select value={this.state.sizeList} onChange={this.onSelect}>
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
                {/* <Dropdown id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                
                <img src={Item.main_img_url} className='view-item-main-img'/>
                <button>Add to Cart</button>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, {getItem})(ViewItem);