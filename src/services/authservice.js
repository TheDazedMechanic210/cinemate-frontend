import axios from "axios";
const config = require("../config/config")


class AuthServ  {
    login(username,password){
        return axios.post(config.API_URL+"signin",{username:username,password:password})
        .then(res => {
            if(res.data.token){
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("username",res.data.username)
            }
            return res.data;
        });
    }

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    signup(username,password){
        return axios.post(config.API_URL+"signup",{username:username,password:password})
    }

    getUser(){
       return localStorage.getItem("username");
    }
}

export default new AuthServ();