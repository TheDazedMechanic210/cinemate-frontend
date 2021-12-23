import React from "react"
import AuthServ from "../services/authservice"
import { Link, Redirect } from "react-router-dom"
import logo from "../assets/logo-cinemate.png"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)

        this.state = {
            username: "",
            password: "",
            message: "",
            success: false
        }
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSignIn(e) {
        e.preventDefault()

        this.setState({
            message: "",
            successful: false
        });

        AuthServ.login(this.state.username, this.state.password).then(
            res => {
                this.setState({
                    message: res.message,
                    success: true
                })
            }, err => {
                const resMessage = err.response.data.errorMessage;

                this.setState({
                    message: resMessage,
                    success: false
                })
            }
        )
    }

    render() {
        if (this.state.success == true) {
            return (
                <Redirect to="/dashboard" />
            )
        }
        return (
            <div>
                {!this.state.success && (
                    <div>
                        <div className="header" >
                            <Link to="/"> <img className="logo-off" src={logo} /> </Link>
                            <div className="navbar">
                                <div>  <Link to="/signup"> Sign Up </Link> </div>
                                <div className="selectedNav">  <Link to="/login"> <strong> Sign In </strong> </Link> </div>
                            </div>
                        </div>

                        <div className="Center">
                            <div className="form">
                                <div className="heading-red">   CINEMATE </div>
                                <div className="heading">  Login into your account <br></br> </div>
                                <div className="left-bold">Username</div>
                                <input type="text" className="input-box" value={this.state.username} onChange={this.onUsernameChange} placeholder="Enter your username"></input>
                                <div className="left-bold">Password</div>

                                <input type="password" className="input-box" value={this.state.password} onChange={this.onPasswordChange} placeholder="Enter your password"></input>
                                <button className="Button-signup" type="submit" onClick={this.handleSignIn}> Log In</button>
                            </div>
                        </div>
                    </div>
                )}
                {this.state.message && (
                    <div className={this.state.success ? "error" : "success"}> {this.state.message} </div>
                )}
            </div>
        )
    }
}


export default Login;