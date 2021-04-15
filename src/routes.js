import {Switch, Route} from 'react-router-dom'
import AddItem from './components/ItemForm/AddItem'
import EditItem from './components/ItemForm/EditItem'
import Home from './components/ItemList/Home'
import ViewItem from './components/ViewItem'
import ViewCart from './components/Checkout/ViewCart'
import Auth from './components/User/Auth'
import AdminSettings from './components/ItemForm/AdminSettings'
import CheckoutComponent from './components/Checkout/CheckoutComponent'

const cartItems = [
    {
      id: 1,
      title: "Samsung",
      price: 799.99,
      img:
        "shorturl.at/ajkq9",
      amount: 1
    },
    {
      id: 2,
      title: "Google pixel Max",
      price: 399.99,
      img:
        "shorturl.at/ajkq9",
      amount: 1
    },
    {
      id: 3,
      title: "Xiaomi",
      price: 999.99,
      img:
        "shorturl.at/ajkq9",
      amount: 1
    }
  ];

export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        {/* <Route path="/" render={props => <Home {...props} />} /> */}
        <Route path='/addItem' component={AddItem}/>
        <Route path='/viewItem/:id' component={ViewItem}/>
        <Route path='/editItem' component={EditItem}/>
        {/* <Route exact path='/viewCart' component={ViewCart}/> */}
        <Route exact path='/viewCart' render={(props) => (
            <ViewCart {...props} cart={cartItems} />
            )}/>
        <Route path='/auth' component={Auth}/>
        <Route path='/admin/settings' component={AdminSettings}/>
        <Route path='/viewCart/checkout' component={CheckoutComponent}/>
    </Switch>
)