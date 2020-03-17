import React from 'react';
import './Header.css';
import covid from './../../assets/images/covid19.png';

function Header() {
  return (
    <div className="Header">
      <img src={covid} alt="covid19 logo" className="covid-logo"/>
      <span>&nbsp;&nbsp;</span>
      <h6>COVID-19 Worldwide statistics <a href="#footer">*</a></h6>
    </div>
  );
}

export default Header;
