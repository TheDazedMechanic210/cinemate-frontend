import React from "react"
import logo from "../assets/logo-cinemate.png"
import "./styles.css"
import { Link, withRouter } from "react-router-dom"
import AuthServ from "../services/authservice"
export default class Signup extends React.Component {

    constructor(props) {

        super(props)

        this.handleSignUp = this.handleSignUp.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.switchToSignIn = this.switchToSignIn.bind(this)

        this.state = {
            username: "",
            password: "",
            message: "",
            success: false,
            showPopUp: false
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

    handleSignUp(e) {
        e.preventDefault()

        this.setState({
            message: "",
            successful: false
        });

        AuthServ.signup(this.state.username, this.state.password).then(
            res => {
                this.setState({
                    message: res.data.message,
                    success: true
                })
            }, err => {
                const resMessage = err.response.data.errorMessage
                this.setState({
                    message: resMessage,
                    success: false
                })
            }
        )
    }

    switchToSignIn(e) {
        this.props.history.push("/login")
    }

    render() {
        return (
            <div>
                <div>
                    <div className="header" >
                        <Link to="/"> <img className="logo-off" src={logo} /> </Link>
                        <div className="navbar">
                            <div className="selectedNav">  <Link to="/signup"> <strong>Sign Up</strong> </Link> </div>
                            <div >  <Link to="/login">  Sign In </Link> </div>
                        </div>
                    </div>

                    <div className="Center">
                        <div className="form">
                            <div className="heading-red">   CINEMATE </div>
                            <div className="heading">  Register your account <br></br> </div>
                            <div className="left-bold">Username</div>
                            <input type="text" className="input-box" value={this.state.username} onChange={this.onUsernameChange} placeholder="Enter your username"></input>
                            <div className="left-bold">Password</div>

                            <input type="password" className="input-box" value={this.state.password} onChange={this.onPasswordChange} placeholder="Enter your password"></input>
                            <button className="Button-signup" type="submit" onClick={this.handleSignUp}> Sign Up</button>

                        </div>
                    </div>
                </div>

                {this.state.success && <div className="overlay">
                    <div className="col-center">sign up was successful
                        <button className="overlay-button" onClick={() => { this.switchToSignIn() }}>login</button>
                    </div>
                </div>}
            </div>

        )
    }

}