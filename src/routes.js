import {Switch, Router} from 'react-router-dom'
import Header from './components/Header/Header'
import AddItem from './components/ItemForm/AddItem'
import EditItem from './components/ItemForm/EditItem'
import Home from './components/ItemList/Home'
import ViewItem from './components/ViewItem'

export default(
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/AddItem' component={AddItem}/>
        <Route path='/ViewItem' component={Home}/>
        <Route path='/' component={Home}/>

    </Switch>
)