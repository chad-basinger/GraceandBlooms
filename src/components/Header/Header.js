import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import session from 'express-session'

const Header = () => {
    const handleLogout = () => {
        // what do?
        axios
        .post('/api/auth/logout')
        
    }

    
    
    // if(!session.user){
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
    //                 <button onClick={handleLogout}>Logout</button>
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
                    <button onClick={handleLogout}>Logout</button>
                    </Link>
                </nav>
                
                    
            </div>
        )
   
}

// const mapStateToProps = reduxState => {
//     return reduxState;

// }

export default Header;