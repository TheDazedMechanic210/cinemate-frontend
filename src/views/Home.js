import React from "react"
import logo from "../assets/logo-cinemate.png"
import "./styles.css"
import { Link, Redirect } from "react-router-dom"

export default class Home extends React.Component {

        constructor(props){
            super(props)

            this.state ={
                loggedIn : false
            }
        }

       
    componentDidMount(){
        const item = localStorage.getItem("username");
        if(item!=null){
            this.setState({
                loggedIn:true
            })
        }
    }

    render() {
        if(this.state.loggedIn){
           return ( 
           <Redirect to="/dashboard"/>
               )
        }
        else{

        return (
            <div>
                        <div className="header" >
                            <Link to="/"> <img className="logo-off" src={logo} /> </Link>
                            <div className="navbar">
                                <div>  <Link to="/signup"> Sign Up </Link> </div>
                                <div >  <Link to="/login">  Sign In  </Link> </div>
                            </div>
                        </div>
                <div className="Center">
                <div className = "Row">
                <img className="center-logo" src={logo} />
                   <pre> <font face="Open Sans">CINEMATE</font></pre>
                </div>
                <div className="sub-heading">
               EXPLORE THE MOVIES WITH A MATE.
                </div>
                <div>
                <Link to="/signup"> <button className="Button">SIGN UP</button> </Link>
                </div>
                </div>
            </div>
        )
        }
    }
}