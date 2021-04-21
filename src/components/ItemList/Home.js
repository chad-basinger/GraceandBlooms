import axios from 'axios'
import {connect} from 'react-redux'
import {getAllItems} from '../../dux/itemReducer'
// import {getSession} from '../../dux/userReducer'
const { Component } = require("react");



class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            // imageURL: '',
            items: []
          }
          this.getAllItems = this.getAllItems.bind(this)
    }

    componentDidMount(){
        this.getAllItems()
        // this.props.getSession()
        // console.log(this.state.items)
      }
    
    getAllItems() {
        // axios GET to /api/item/all here
        axios.get('/api/item/all')
        .then(responseItems => {
            console.log('response items', responseItems)
            this.props.getAllItems(responseItems.data)
          this.setState({
            items: responseItems.data
            
          })
          // console.log('state items after setState', this.state.items)
        })
        .catch(err => console.log(err.response))
    }


    goToItemView(path) {
        this.props.history.push(path);
      }

    

    render(){
        console.log('redux state user', this.props.user)
        console.log('home render this.state', this.state.items)
        // let itemListings = this.props.itemList.map((element, index) => {
        //     return (
        //         <div key={index}>
        //             <img src={element.main_img_url} alt={element.item_name} />
        //             <span>{element.item_name}</span>
        //         </div>
        //     )
        //     }

        // )

        return (
            <div className='home-section'>
                
                <div className='tool-bar-for-item-list'>
                    Search Input here, Filter By:
                </div>
                
                <div className="items">
                    
                    {this.state.items.map((element, index) => {
                        return (
                        <div className='individual-item' key={index}>
                            <img src={element.main_img_url} alt={element.item_name}
                            onClick={
                                () => this.goToItemView(`/viewItem/${element.item_id}`)
                                // () => window.open(element.main_img_url)
                                }/>

                            <span className='item-title-text'>{element.item_name}</span>
                            <span className='item-price'>{element.item_price}</span>
                        </div>
                    )}) 
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState.itemReducer,
    reduxState.userReducer
}

export default connect(mapStateToProps, {getAllItems})(Home);