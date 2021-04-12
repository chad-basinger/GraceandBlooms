import axios from 'axios'
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
        // console.log(this.state.items)
      }
    
    getAllItems() {
        // axios GET to /api/item/all here
        axios.get('/api/item/all')
        .then(responseItems => {
            console.log('response items', responseItems)
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
            //when I have the map uncommented, the props doesn't load correctly. Need to ask for help from instructors.
            <div>
                <div className='tool-bar-for-item-list'>
                    Search Input here, Filter By:
                </div>
                
                <div className="items">
                    {/* {console.log('props itemList.data', this.props.itemList.data)} */}
                    {/* {itemListings} */}
                    
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

export default Home;