import axios from 'axios';
import { Component } from 'react';
import './auth.scss';
import {connect} from 'react-redux'
import {loginUser} from '../../dux/userReducer'


class Auth extends Component {
    constructor(){
        super()
        this.state ={
            mode: 'register',
            email: '',
            password: ''
        }
        // this.handleMode = this.handleMode.bind(this)
    }

    handleMode = e => {
        // console.log(e.target.name)
        this.setState({mode: e.target.name})
    }

    handleInput = e => {
        const {name, value} = e.target;

        this.setState({[name]: value})
    }

    handleSubmit = () => {
        const {mode, email, password} = this.state;
        const path = mode === 'register' ? 'register' : 'login'

        axios.post(`/api/auth/${path}`, {email, password})
        .then(res => {
            
            console.log(res.data)
            this.props.loginUser(res.data)
            this.showToast()
        })
        .catch (err => console.error(err))
    }

    showToast() {
        // Get the snackbar DIV
        var x = document.getElementById("success");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }



    render(){
        const {mode} = this.state;
        // console.log(reduxState)
        if(mode === 'register')
        return (
            <section className ='auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                        Register
                    </button>
                    <button name='sign-in' onClick={this.handleMode} disabled={mode === 'sign-in'}>
                        Sign In
                    </button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div>
                    <input placeholder='email' name='email' onChange={this.handleInput}/>
                    <input placeholder='password' name='password' onChange={this.handleInput}/> 
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div id="success">Successfully Registered!</div>
            </section>
        )
        else {
            return (
                <section className ='auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                        Register
                    </button>
                    <button name='sign-in' onClick={this.handleMode} disabled={mode === 'sign-in'}>
                        Sign In
                    </button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div>
                    <input placeholder='email' name='email' onChange={this.handleInput}/>
                    <input placeholder='password' name='password' onChange={this.handleInput}/>
                    
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div id="success">Successfully Logged In!</div>
            </section>
            )
        }
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, {loginUser})(Auth);

