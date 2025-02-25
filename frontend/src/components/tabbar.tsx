import React from "react"
import { NavLink } from 'react-router-dom';
import '../assets/css/tabbar.css'



function TabBar(){
    return (
        <div className="tab-bar-container">
          <NavLink to="/outreach-search" className="tab-link">Outreach Search</NavLink>
          <NavLink to="/saved-mentors" className="tab-link">Saved Mentors</NavLink>
          <NavLink to="/history" className="tab-link">History</NavLink>
        </div>
      );
};
    
export default TabBar;