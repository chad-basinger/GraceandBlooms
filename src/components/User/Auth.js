import axios from 'axios';
import { Component } from 'react';
import './auth.scss';
import {connect} from 'react-redux'
import {loginUser} from '../../dux/userReducer'


class Auth extends Component {
    constructor(){
        super()
        this.state ={
            mode: 'sign-in',
            email: '',
            password: ''
        }
        // this.handleMode = this.handleMode.bind(this)
        this.handleRegisterModeChange = this.handleRegisterModeChange.bind(this)
    }

    handleMode = e => {
        // console.log(e.target.name)
        this.setState({mode: e.target.name})
    }

    handleInput = e => {
        const {name, value} = e.target;

        this.setState({[name]: value})
    }

    handleRegisterModeChange() {
        this.setState({
            mode: 'sign-in'
        })
        // console.log(this.state.mode)
    }

    handleSubmit = () => {
        const {mode, email, password} = this.state;
        const path = mode === 'register' ? 'register' : 'login'

        if(path === 'register'){
            axios.post(`/api/auth/${path}`, {email, password})
        .then(async res => {
            
            // console.log(res.data)
            // this.props.loginUser(res.data)
            this.showToastRegister()
            this.handleRegisterModeChange()
        })
        .catch (err => console.error(err))
        }
        else if(path === 'login'){
            axios.post(`/api/auth/${path}`, {email, password})
        .then(async res => {
            
            console.log(res.data, 'LOGIN POST RAN')
            this.props.loginUser(res.data)
            // this.showToastLogin()
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.props.history.push('/');
        })
        .catch (err => console.error(err))
        }

        
    }
    showToastRegister() {
        // Get the snackbar DIV
        var x = document.getElementById("register-toast");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }



    render(){
        let {mode} = this.state;
        // console.log(reduxState)
        if(mode === 'register')
        return (
            <section className='auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                        Register
                    </button>
                    <button name='sign-in' onClick={this.handleMode} disabled={mode === 'sign-in'}>
                        Sign In
                    </button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div className='input-auth'>
                    <input placeholder='example: superCoolMe@gmail.com' name='email' onChange={this.handleInput} content="initial-scale=1, maximum-scale=1"/>
                    <input placeholder='password' name='password' onChange={this.handleInput}/> 
                    <button className='auth-button' onClick={this.handleSubmit}>Register</button>
                </div>
                <div id="register-toast">Successfully Registered!</div>
            </section>
        )
        else {
            return (
                <section className='auth'>
                <div className='auth-choice'>
                    <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                        Register
                    </button>
                    <button name='sign-in' onClick={this.handleMode} disabled={mode === 'sign-in'}>
                        Sign In
                    </button>
                </div>
                <h1>{mode.toUpperCase()}</h1>

                <div className='input-auth'>
                    <input placeholder='example: superCoolMe@gmail.com' name='email' onChange={this.handleInput}/>
                    <input placeholder='password' name='password' onChange={this.handleInput}/>
                    
                    <button className='auth-button' onClick={this.handleSubmit}>Sign In</button>
                </div>
                <div id="register-toast">Successfully Registered!</div>
            </section>
            )
        }
    }
}

const mapStateToProps = reduxState => {
    return reduxState;
}

export default connect(mapStateToProps, {loginUser})(Auth);

