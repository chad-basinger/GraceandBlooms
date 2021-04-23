import './App.css';
import './mobile.css'
import { Component } from 'react';
import Header from './components/Header/Header'
import routes from './routes'


class App extends Component {
  // constructor(){
  //   super()
      
  // }

  
  render(){
    // console.log('app render', this.state.items)
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <section className="main-section">
          {routes}
          
          {/* <div className="item-list">
            <Home itemList={this.state.items}/>
          </div> */}
        </section>
        
        
      </div>
    );

  }
}

export default App;

//HOW DO I ADD the state to HOME component if there are routes
