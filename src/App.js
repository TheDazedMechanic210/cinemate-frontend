import './App.css';
import Home from "./views/Home"
import Login from "./views/Login"
import MovieList from "./views/MovieList"
import React from "react"
import FindMatch from "./views/FindMatch"
import Chat from "./views/Chat"
import { io } from "socket.io-client"
import {  BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import Signup from './views/Signup'
const SERVER = "http://localhost:8080";

let socket = io(SERVER);

 class App extends React.Component {
  render(){
     return(
      <Router>
       <div>
        <Switch>
        <Route path="/dashboard">
          <MovieList/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/mates">
            <FindMatch/>
          </Route>
          <Route path="/chat" component={Chat}>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
      </Router>
     )
   
  };
  

}

export default App;

