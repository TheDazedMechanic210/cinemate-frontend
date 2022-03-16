import axios from "axios";
import authHeader from "./auth-header";
const config = require("../config/config")


const posterApi_URL = "https://www.omdbapi.com/?apikey=991c188b&t=";
const movie_URL = "//www.omdbapi.com/?apikey=991c188b&s="
const movie_URL_Abs = "//www.omdbapi.com/?apikey=991c188b&t="
class userServ{
    async getUserContent() {

        let list = [];
    
        let res = await axios.get(config.API_URL + "user-content", { headers: authHeader() })
        if(res.data.movieList==null){
          return null;
        }
        for(let movie of res.data.movieList){
          const title = movie.movie;
          await axios.get(posterApi_URL + title).then((resp) => {
            let item = {};
            item.rating = movie.rating;
            item.poster = resp.data.Poster;
            list.push(item);
          });
        }
    
        return list;
      }


      async getMovies(term){
          let list =[];
          let res;

          
          if(term.length<4){
               await axios.get(movie_URL_Abs+term).then(res=>{
                let item = {}
              item.title = res.data.Title
              item.poster = res.data.Poster
              list.push(item)
               })
              
          }
          else{
             await axios.get(movie_URL+term).then(res=>{
               if(res.data.Response !="False" ){
                for(let movie of res.data.Search){
                  let item = {}
                  item.title = movie.Title;
                  item.poster = movie.Poster;
                  list.push(item);
                }
               }
              
             })
            
          }
          
          return list;
      }
      

      async sendMovie(movie,rating){

        let res = await axios.post(config.API_URL + "user", {rating:rating,movie:movie},{ headers: authHeader() })
        return res
      }

      async getMatches (){
        let res = await axios.get(config.API_URL+"matchmaker",{ headers: authHeader() })
        return res.data
      }


      async sendChat(sender,reciever,message){
        const timeLogged = new Date()
        console.log(timeLogged+":"+message)
        let res = await axios.post(config.API_URL+"chat",{sender:sender,reciever:reciever,message:message},{ headers: authHeader() })
        return res.data

      }

      async fetchChat(){
        let res = await axios.get(config.API_URL+"chat",{headers:authHeader()})
        return res.data.chats;
      }
}
 


export default new userServ;