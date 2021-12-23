import React from "react"
import logo from "../assets/logo-cinemate.png"
import authservice from "../services/authservice";
import userServ from "../services/dataService"

import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import "./chat_styles.css"
import socket from "../controllers/socket"
const API_URL = "http://localhost:8080/api/";

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.configureSocket = this.configureSocket.bind(this)
        this.startChat = this.startChat.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.sendChat = this.sendChat.bind(this)
        this.selectChat = this.selectChat.bind(this)
        this.state = {
            chats: [],
            username: authservice.getUser(),
            currentChat: "",
            currentMessage: ""
        }


    }
    selectChat(val) {
        this.setState({
            currentChat: val
        })
    }



    configureSocket() {
        socket.emit("join", this.state.username);

        socket.on("recieveMsg", (sender, message) => {

            let chatExists = false;

            chatExists = this.state.chats.some(elem => {
                if (elem.participant == sender) {

                    return true;
                }
            })

            if (!chatExists) {
                let item = {};
                item.participant = sender;
                item.messages = [];
                let newChats = [...this.state.chats];
                newChats.push(item)
                this.setState({
                    chats: newChats
                })
            }



            let copy = [...this.state.chats]
            for (let obj of copy) {
                if (obj.participant == sender) {
                    let item = {}
                    item.sender = sender;
                    item.reciever = this.state.username
                    item.message = message
                    obj.messages.push(item);
                    this.setState({
                        chats: copy
                    })
                    break;
                }
            }
        })
    }


    sendChat() {
        const sender = this.state.username;
        const reciever = this.state.currentChat;
        const message = this.state.currentMessage;

        userServ.sendChat(sender,reciever,message).then(res=>{
            console.log(res)
        })
        this.setState({
            currentMessage:""
        })
        let copy = [...this.state.chats]
        for (let obj of copy) {
            if (obj.participant == this.state.currentChat) {
                let item = {}
                item.sender = sender
                item.reciever = reciever
                item.message = message
                obj.messages.push(item)
                this.setState({
                    chats: copy
                })
                break;

            }
        }
        socket.emit("sendMessage", sender, reciever, message)
    }

    startChat() {

        if (this.props.location.state != null) {

            const currentChat = this.props.location.state.currentChat

            let chatExists = false;
            if(this.state.chats !=null){
            chatExists = this.state.chats.some((elem) => {
                if (elem.participant == currentChat) {

                    return true;
                }
            })


            if (!chatExists) {
                let item = {};
                item.participant = this.props.location.state.currentChat;
                item.messages = [];
                let newChats = [...this.state.chats];
                newChats.push(item)
                this.setState({
                    chats: newChats
                },()=>{
                    this.setState({
                        currentChat: currentChat
                    })
                })

            }

        }
        else{
            let item = {};
                item.participant = this.props.location.state.currentChat;
                item.messages = [];
                let newChats = [];
                newChats.push(item)
                this.setState({
                    chats: newChats
                },()=>{
                    this.setState({
                        currentChat: currentChat
                    })
                })
        }
        }

    }


    handleInput(e) {
        e.preventDefault();
        this.setState({
            currentMessage: e.target.value
        })
    }

    componentDidMount() {
        this.configureSocket();
        userServ.fetchChat().then(res=>{
            this.setState({
                chats:res
            },()=>{
                this.startChat();

            })

        })

        document.body.style = 'overflow: hidden;';
      
    }

    render() {
        let mates;
        if(this.state.chats!=null){
             mates = this.state.chats.map(elem => {
                if (elem.participant == this.state.currentChat) {
                    return (
                        <div className="selected-chat" onClick={()=>this.selectChat(elem.participant)}>
                            {elem.participant}
                        </div>
                    )
                }
                else {
                    return (
                        <div value={elem.participant} onClick={() => this.selectChat(elem.participant)}>
                            {elem.participant}
                        </div>
                    )
                }
    
            })
        }
        
        let chatDisplay;
        if ((this.state.chats != null) && (this.state.currentChat != "")) {
            console.log(this.state.currentChat)
            const selectedChat = this.state.chats.filter(elem => {
                if (elem.participant == this.state.currentChat) {
                    return true;
                }
            })
            chatDisplay = selectedChat[0].messages.map(elem => {
                if (elem.sender == this.state.username) {
                    return (
                        <div className="msg-container-right">
                            <div className="sendMsg">
                                {elem.message}
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="msg-container-left">
                            <div className="receiveMsg">
                                {elem.message}
                            </div>
                        </div>

                    )
                }

            })
        }


        return (
            <div className="page">
                <div className="header">
                    <div class="header-content">
                        <div className="text-logo">
                            <Link to="/"><img className="logo" src={logo} /></Link>
                        </div>
                        <div className="navbar">
                            <div className="selectedNav">  <Link to="/chat"><strong> Chat </strong></Link> </div>
                            <div>  <Link to="/dashboard">  My Movies</Link> </div>
                            <div> <Link to="/mates"> Find Mates</Link> </div>
                        </div>
                        <div className="user"><div>{this.state.username[0].toUpperCase()}</div></div>
                    </div>
                    <div className="section-border"></div>
                </div>
                <div className="chat-content">
                    <div className="chat-panel">
                        {mates}
                    </div>
                    <div className="chat-log">
                        <div className="messages">
                            {chatDisplay}
                        </div>
                        <div className="chat-box">
                            <textarea placeholder="send message..." className="chat-input" onChange={this.handleInput}value ={this.state.currentMessage}></textarea>
                            <button className="send-button" onClick={this.sendChat}> Send </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default Chat;