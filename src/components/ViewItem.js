import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItem} from '../dux/itemReducer'


class ViewItem extends Component {
    constructor(props){
        super(props)

        // Although
    }

    componentDidMount(){
        console.log('props id', this.props)
        axios.get(`/api/item/${this.props.match.params.id}`)
        .then(res => {
            this.props.getItem(res.data)
        })
    }

    // getItemById(id){
    //     axios.get(`/api/item/${id}`)
    //     .then(res => {
    //         this.props.getItem(res.data)
    //     })

    // }



    render (){
        return (
            <div>
                <h2>
                    {this.state.item_name}
                </h2>
                <p>{this.state.item_description}</p>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, {getItem})(ViewItem);