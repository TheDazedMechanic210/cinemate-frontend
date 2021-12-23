import React from "react"
import AuthServ from "../services/authservice"
import userServ from "../services/dataService"
import "../views/dashboard_styles.css"
import logo from "../assets/logo-cinemate.png"
import { Link } from "react-router-dom"
import {AiOutlineStar} from "react-icons/ai"
import { IconContext } from "react-icons";

class MovieList extends React.Component {

    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this);
        this.changePlaceholder = this.changePlaceholder.bind(this);
        this.addMovie = this.addMovie.bind(this);
        this.state = {
            username: AuthServ.getUser(),
            movieList: null,
            searchTerm:"",
            searchList:null
        }
    }

    componentDidMount() {
        userServ.getUserContent().then(res => {
            this.setState({
                movieList: res
            })
        })
        document.body.style = 'overflow: scroll;';

    }

    addMovie(e){
        const movie = e.target.id;
        const rating =  parseInt(e.target.value)
        if(e.key === "Enter"){
            userServ.sendMovie(movie,rating).then(res=>{
                if(res.status =="201"){
                    e.target.value = "Added";
                    e.target.disabled = true;
                }
            })
        }
    }

    changePlaceholder(e){
        e.target.placeholder ="Enter your Rating";
    }


    handleSearch(e){
        if(e.target.value==""){
            this.setState({
                searchList:null
            })
        }
        else{
            this.setState({
                searchTerm:e.target.value
            })
            userServ.getMovies(e.target.value).then(res=>{
                this.setState({
                    searchList: res
                })
            })
        }
        
    }


    render() {
        const listM = this.state.movieList;
        let listMovies;
        if(this.state.searchList!=null){
            listMovies = this.state.searchList.map(elem => {
                return (
                    <div className="center-card">
                        <img src={elem.poster}></img>
                        <input id={elem.title} className="add-button" placeholder="Add" onClick = {this.changePlaceholder} onKeyUp={this.addMovie}>

                        </input>
                    </div>
                )
            }
            )
        }
       else if (this.state.movieList != null) {
            listMovies = this.state.movieList.map(elem => {
                return (
                    <div >
                        <img src={elem.poster}></img>
                      <IconContext.Provider value={{size:"1.5em"}}>  <div className="star">{Array(elem.rating).fill(<AiOutlineStar />)}</div>
                      </IconContext.Provider>
                    </div>
                )
            }
            )
        }
        else {

        }



        return (
            <div >
                <div className="header">
                    <div class="header-content">
                        <div className="text-logo">
                            <Link to="/"><img className="logo" src={logo} /></Link>
                        </div>
                        <div className="navbar">
                            <div>  <Link to="/chat"> Chat </Link> </div>
                            <div className="selectedNav">  <Link to="/dashboard"> <strong> My Movies </strong> </Link> </div>
                            <div> <Link to="/mates"> Find Mates</Link> </div>
                        </div>
                        <div className="user"><div>{this.state.username[0].toUpperCase()}</div></div>
                    </div>
                    <div className="section-border"></div>
                </div>
                <div className="row">
                    <ul className="list">{listMovies}</ul>
                </div>
                <div className="center" ><input type="text" placeholder="+ Movie" className="button" onChange={this.handleSearch}></input></div>
            </div>
        )
        /* return(
             <div className="row">
                 <Sidebar/>
                 <div className="Content">
                     Something
                 </div>
             </div>
         )*/
    }
}
export default MovieList;