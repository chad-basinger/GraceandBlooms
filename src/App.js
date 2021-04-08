import './App.css';
import UploadImage from './components/AWS-SDK/UploadImage'
import { Component } from 'react';

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
        {/* <Header />
        <Container /> */}
        {/* <UploadImageToS3WithNativeSdk/> */}
        <UploadImage/>
      </div>
    );

  }
}

export default App;
