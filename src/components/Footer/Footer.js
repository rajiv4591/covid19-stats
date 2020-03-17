import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer" id="footer">
      <span style={{fontSize: '11px'}}>Powered by: <a href="https://newsapi.org" target="_blank">News API</a></span>
      <br/>
      <span style={{fontSize: '11px', color: '#555'}}>* This application gets data from open source APIs that use publicly available data. App developer is not responsible for the accuracy of the data</span>
    </div>
  );
}

export default Footer;
