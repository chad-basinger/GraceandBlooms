import {Switch, Router} from 'react-router-dom'
import AddItem from './components/ItemForm/AddItem'
import EditItem from './components/ItemForm/EditItem'
import Home from './components/ItemList/Home'
import ViewItem from './components/ViewItem'
import ViewCart from './components/Checkout/ViewCart'
import Auth from './components/User/Auth'

export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/addItem' component={AddItem}/>
        <Route path='/viewItem' component={ViewItem}/>
        <Route path='/editItem' component={EditItem}/>
        <Route path='/viewCart' component={ViewCart}/>
        <Route path='/auth' component={Auth}/>
    </Switch>
)