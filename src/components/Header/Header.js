const Header = () => {
    return (
        <div className='header'>
            <h1 className='logo'>Grace and Blooms Bracelet Co.</h1>
            
            <div className='nav-menu'>
                <button>Home</button>
                <button>View Cart</button>
                <button>Add Item</button>
                <button>Login</button>
            </div>
            {/* <h2 className="registered-users-num">Registered Users being alerted: {129 + this.props.users.length}</h2> */}
                
        </div>
    )
}

export default Header;