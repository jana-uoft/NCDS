import React, { Component } from 'react'
import { isMobile } from 'react-device-detect';

export default class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="dark">
  			<div id="copyrights" style={{padding: 0, paddingTop: 10}}>
          <div className="container clearfix">
            <div className="col_half">
              <img src="images/footer_logo.jpg" alt="" className="footer-logo"/>          
            </div>

            <div className="col_half col_last tright">
              {!isMobile ? <br /> : null}
              <div className="fright clearfix">
                <span style={{ color: 'white' }}>Copyrights &copy; 2018 All Rights Reserved by NainativuCDS.org</span>
              </div>
              {!isMobile ? <br/> : null}
              <div className="fright clearfix">
                <span style={{ color: 'white' }}> <a href="https://jana19.org/" rel="noopener noreferrer" target="_blank">Designed by Jana</a></span>
              </div>
            </div>
          </div>
        </div>  
		  </footer>
    )
  }
}
