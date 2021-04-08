import axios from 'axios'
const { Component } = require("react");


class ItemList extends Component {
    constructor(){
        super()
        this.state = {
            items: {}
        }

        this.getAllItems = this.getAllItems.bind(this)
    }

    componentDidUpdate(){
        this.getAllItems()
    }

    getAllItems() {
        // axios GET to /api/item/all here
        axios.get('api/item/all')
        .then(responseItems => {
            console.log(responseItems)
          this.setState({
            items: responseItems
            
          })
        })
        .catch(err => console.log(err.response.request.response))
      }

    render(){
        console.log(this.state.items)
        return (
            <div>
                {/* {this.state.items.map((element, index) => {
                    return (
                    <div className='individual-item' key={index}>
                        <img src={element.main_img_url} alt={element.item_name}
                         onClick={() => window.open(element.main_img_url)}/>

                        <span className='hat-title-text'>{element.item_name}</span>
                        <span className='hat-price'>{element.item_price}</span>
                    </div>
                )}) 
                } */}
            </div>
        )
    }
}

export default ItemList;