import React from "react"
import AuthServ from "../services/authservice"
import userServ from "../services/dataService"
import "../views/dashboard_styles.css"
import "../views/match_styles.css"
import logo from "../assets/logo-cinemate.png"
import { Link } from "react-router-dom"


class FindMatch extends React.Component {

    constructor(props) {

        super(props);

        this.logout = this.logout.bind(this)
        this.compare = this.compare.bind(this)
        this.state = {
            matchlist: [],
            username: AuthServ.getUser(),
            open: false
        }
    }


    componentDidMount() {
        userServ.getMatches().then(res => {
            this.setState({
                matchlist: res
            })
        })
        document.body.style = 'overflow: scroll;';


    }

    compare(a,b){
        if(a.percentage < b.percentage){
            return 1;
        }
        if(a.percentage>b.percentage){
            return -1;
        }
        return 0;
    }

    logout() {
        this.setState(
            {
                open: true
            })
    }

    render() {
        let sortedMatches;
        let matches;
        if (this.state.matchlist != null) {
            sortedMatches = this.state.matchlist.sort(this.compare);
            matches = sortedMatches.map(elem => {
                return (
                    <div value={elem.username} className="user-match">
                        <div className="username">
                            {elem.user}
                        </div>
                        <div className="progress-bar">

                            <div style={{ width: elem.percentage + "%" }}>
                            </div>
                            <div></div>
                            {elem.percentage.toFixed(2)} %
                        </div>
                        <div className="chat-button">
                            <button><Link to={{ pathname: "/chat", state: { currentChat: elem.user } }}>Chat</Link></button>
                        </div>
                    </div>
                )
            })
        }



        return (
            <div>
                <div className="header">
                    <div class="header-content">
                        <div className="text-logo">
                            <Link to="/"><img className="logo" src={logo} /></Link>
                        </div>
                        <div className="navbar">
                            <div>  <Link to="/chat"> Chat </Link> </div>
                            <div>  <Link to="/dashboard">  My Movies</Link> </div>
                            <div className="selectedNav"> <Link to="/mates"><strong> Find Mates </strong></Link> </div>
                        </div>
                        <div className="user" onClick={this.logout}><div>{this.state.username[0].toUpperCase()}</div></div>
                    </div>
                    <div className="section-border"></div>
                </div>
                <div className="matchList">

                    {matches}
                </div>

            </div>
        )
    }


}

export default FindMatch;