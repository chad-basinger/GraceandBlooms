import axios from 'axios'
const { Component } = require("react");


class ItemList extends Component {
    constructor(props){
        super(props)
        
    }

    

    render(){
        // console.log('props itemList.data', this.props.itemList)
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
            <div className="items">
                {/* {console.log('props itemList.data', this.props.itemList.data)} */}
                {/* {itemListings} */}
                
                {this.props.itemList.map((element, index) => {
                    return (
                    <div className='individual-item' key={index}>
                        <img src={element.main_img_url} alt={element.item_name}
                         onClick={() => window.open(element.main_img_url)}/>

                        <span className='item-title-text'>{element.item_name}</span>
                        <span className='item-price'>{element.item_price}</span>
                    </div>
                )}) 
                }
            </div>
        )
    }
}

export default ItemList;