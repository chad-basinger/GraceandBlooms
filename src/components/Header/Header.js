import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../dux/userReducer'
import axios from 'axios'

// import session from 'express-session'

class Header extends Component {
    
    
    // componentDidMount = () => {
    //     this.props.getSession()
    // }

    handleLogout = () => {
        // what do?
        axios
        .post('/api/auth/logout')
        .then(res => {
            this.props.logoutUser(res.data)
            console.log(res.data)
        })
        .catch (err => console.log(err))
        
    }


    
    render(){
        //SHOW THE FOLLOWING IF USER IS ADMIN
        console.log(this.props, 'REDUX STATE user')
        if(this.props.isLoggedIn === true){
                        if(!this.props.user.is_admin){
                        return (
                            <div className='header'>
                                <h1 className='logo'>Grace + Blooms Bracelet Co.</h1>
                                
                                <nav className='nav-menu'>
                                    <Link to='/'>
                                    <button>Bracelets</button>
                                    </Link>
                                    <Link to='/viewCart'>
                                    <button>View Cart</button>
                                    </Link>
                                    <Link to='/'>
                                    <button onClick={this.handleLogout}>Logout</button>
                                    </Link>
                                </nav>
                                
                                    
                            </div>
                        )
                                
                    }else {
                        return (
                            <div className='header'>
                                <h1 className='logo'>Grace + Blooms Bracelet Co.</h1>
                                
                                <nav className='nav-menu'>
                                    <Link to='/'>
                                    <button>Bracelets</button>
                                    </Link>
                                    <Link to='/viewCart'>
                                    <button>View Cart</button>
                                    </Link>
                                    <Link to='/addItem'>
                                    <button>Add Item</button>
                                    </Link>
                                    <Link to='/'>
                                    <button onClick={this.handleLogout}>Logout</button>
                                    </Link>
                                </nav>
                                
                                    
                            </div>
                        )
                    }
                }
            else{
                return (
                        <div className='header'>
                                <h1 className='logo'>Grace + Blooms Bracelet Co.</h1>
                                
                                <nav className='nav-menu'>
                                    <Link to='/'>
                                    <button>Bracelets</button>
                                    </Link>
                                    <Link to='/auth'>
                                    <button>Login</button>
                                    </Link>
                                    
                                </nav>
                                
                                    
                        </div>
                )
            }
        }
       
    }
    

const mapStateToProps = reduxState => {
    return reduxState.userReducer;

}

export default connect(mapStateToProps, {logoutUser})(Header);