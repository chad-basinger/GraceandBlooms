import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
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
            </nav>
            {/* <h2 className="registered-users-num">Registered Users being alerted: {129 + this.props.users.length}</h2> */}
                
        </div>
    )
}

export default Header;