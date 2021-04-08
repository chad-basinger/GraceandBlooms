import './App.css';
import UploadImage from './components/AWS-SDK/UploadImage'
import { Component } from 'react';
import Header from './components/Header/Header'
import ItemList from './components/ItemList/ItemList'

class App extends Component {
  constructor(){
    super()
      this.state = {
        imageURL: ''
      }

  }


  render(){
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div>
          Search Input here, Filter By:
        </div>
        <section className="main-section">
          <div>
            <ItemList />
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
