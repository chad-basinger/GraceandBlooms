import './App.css';
import UploadImage from './components/AWS-SDK/UploadImage'
import { Component } from 'react';
import Header from './components/Header/Header'
import Home from './components/ItemList/Home'
import axios from 'axios'

class App extends Component {
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


  render(){
    // console.log('app render', this.state.items)
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div>
          Search Input here, Filter By:
        </div>
        <section className="main-section">
          <div className="item-list">
            <Home itemList={this.state.items}/>
          </div>
        </section>
        {/* <div>
        <UploadImage/>
        </div> */}
      </div>
    );

  }
}

export default App;
