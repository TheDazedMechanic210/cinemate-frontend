import "../views/dashboard_styles.css"
import logo from "../assets/logo-cinemate.png"


export default function Sidebar(){
    return(
        <div className ="sidebar">
            <div className="sidebar-logo">
                <img src={logo}></img>
            </div>
            <div className="userprofile">
                
            </div>
            <div className="navlist">

            </div>
        </div>
    )
}