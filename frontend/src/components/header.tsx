import React from "react"
import '../assets/css/header.css'
import TabBar from "./tabbar";


function Header(){
    return(
        <div className="header-container">
            <div className="header-top">
                <div className="logo">
                    <span className="mentor">Mentor</span>
                    <span className="list">List</span>
                    <span className="ai">ai</span>
                </div>
                <div className="user-info">
                    <span className="user-name">Akhil<br />Kamalesh</span>
                    <div className="user-avatar"></div>
                </div>
            </div>
            <TabBar/>
      </div>
    )
}

export default Header;