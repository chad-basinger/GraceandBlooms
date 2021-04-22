import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

//store
import {store} from './dux/store'
import { saveState } from './localStorage';
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

// const cartItems = [
//   {
//     id: 1,
//     title: "Samsung",
//     price: 799.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   },
//   {
//     id: 2,
//     title: "Google pixel Max",
//     price: 399.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   },
//   {
//     id: 3,
//     title: "Xiaomi",
//     price: 999.99,
//     img:
//       "shorturl.at/ajkq9",
//     amount: 1
//   }
// ];

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    total: store.getState().total,
    amount: store.getState().amount
  });
});


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <App/>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
