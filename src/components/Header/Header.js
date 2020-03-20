import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import covid from './../../assets/images/covid19.png';

function Header() {
  return (
    <nav className="Header navbar navbar-expand-md bg-light navbar-light">
      <a className="navbar-brand" href="#" style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <img src={covid} alt="covid19 logo" className="covid-logo" />
        <span>&nbsp;&nbsp;</span>
        <h6>COVID-19 Worldwide statistics <a href="#footer">*</a></h6>
      </a>
      <ul className="navbar-nav pull-right" style={{marginLeft: 'auto'}}>
        <li className="nav-item">
          <a className="nav-link" href="#"><Link to="/">Dashboard</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><Link to="/resources">Resources</Link></a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#"><Link to="/tweets">Tweets</Link></a>
        </li> */}
      </ul>
    </nav>
    // <div className="Header">
    //   <img src={covid} alt="covid19 logo" className="covid-logo" />
    //   <span>&nbsp;&nbsp;</span>
    //   <h6>COVID-19 Worldwide statistics <a href="#footer">*</a></h6>
    //   <ul className="navbar-nav">
    //     <li className="nav-item">
    //       <a className="nav-link" href="#"><Link to="/">Home</Link></a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#"><Link to="/about">About</Link></a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#"><Link to="/dashboard">Dashboard</Link></a>
    //     </li>
    //   </ul>
    // </div>
  );
}

export default Header;
