import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

// import session from 'express-session'

class Header extends Component {
    constructor(){
        super()
    }
    
    handleLogout = () => {
        // what do?
        axios
        .post('/api/auth/logout')
        
    }

    // ComponentDidMount = () => {
    //     axios.get('/api/auth/me')
    //     .then(res => {
    //         session = res.data
    //     })
    // }

    
    render(){
        //SHOW THE FOLLOWING IF USER IS ADMIN
        // console.log()
        // if(this.user){
        //     return (
        //         <div className='header'>
        //             <h1 className='logo'>Grace and Blooms Bracelet Co.</h1>
                    
        //             <nav className='nav-menu'>
        //                 <Link to='/'>
        //                 <button>Home</button>
        //                 </Link>
        //                 <Link to='/viewCart'>
        //                 <button>View Cart</button>
        //                 </Link>
        //                 {/* <Link to='/addItem'>
        //                 <button>Add Item</button>
        //                 </Link> */}
        //                 {/* <Link to='/admin/settings'>
        //                 <button>Admin Settings</button>
        //                 </Link> */}
        //                 <Link to='/auth'>
        //                 <button>Login</button>
        //                 </Link>
        //                 <button onClick={this.handleLogout}>Logout</button>
        //             </nav>
                    
                        
        //         </div>
        //     )
                    
        // }else {
            return (
                <div className='header'>
                    <h1 className='logo'>Grace and Blooms Bracelet Co.</h1>
                    
                    <nav className='nav-menu'>
                        <Link to='/'>
                        <button>Home</button>
                        </Link>
                        <Link to='/viewCart'>
                        <button>View Cart</button>
                        </Link>
                        <Link to='/addItem'>
                        <button>Add Item</button>
                        </Link>
                        <Link to='/admin/settings'>
                        <button>Admin Settings</button>
                        </Link>
                        <Link to='/auth'>
                        <button>Login</button>
                        </Link>
                        <Link to='/'>
                        <button onClick={this.handleLogout}>Logout</button>
                        </Link>
                    </nav>
                    
                        
                </div>
            )
        }
       
    }
    

// const mapStateToProps = reduxState => {
//     return reduxState;

// }

export default Header;