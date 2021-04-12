import {Component} from 'react'
import UploadImage from '../AWS-SDK/UploadImage'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            main_img_url: '',
            
        }
    }

    render(){
        return (
            <div>
                <p>Name of Item:</p>
                <input id='itemName' placeholder='item name'/>
                <div>
                <UploadImage/>
                </div>

            </div>

        )
    }
}

export default AddItem;