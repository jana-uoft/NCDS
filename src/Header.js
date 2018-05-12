import React, { Component } from 'react';

class Header extends Component {
  render() {
    let bannerStyle = { maxWidth: '100vw', padding: 0, position: 'fixed', zIndex: 50, background: '#0D2B31' };

    let menuStyle = { top: 100, background: '#0D2B31' };

    return (
      <header id="header" className="sticky-style-2 dark">

        <div className="container clearfix" style={bannerStyle}>
          <div id="logo" className="divcenter">
            <a href="/" className="standard-logo" data-dark-logo="/images/banner.jpg"><img style={{ width: '100vw' }}className="divcenter" src="/images/banner.jpg" alt="Nainativu CDS Logo"/></a>
            <a href="/" className="retina-logo" data-dark-logo="/images/banner_mobile.jpg"><img style={{ width: '100vw' }} className="divcenter" src="/images/banner_mobile.jpg" alt="Nainativu CDS Logo"/></a>
				  </div>
			  </div>

        <div id="header-wrap" style={menuStyle}>
          <nav id="primary-menu" className="style-2">
            <div className="container clearfix">
              <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
              <ul>
                <li className=""><a href="/contributions"><div><i className="icon-users"></i>Contributions</div></a></li>
                <li className=""><a href="/publications"><div><i className="icon-book3"></i>Publications</div></a></li>
                <li className=""><a href="/news"><div><i className="icon-newspaper"></i>News</div></a></li>
                <li className=""><a href="/gallery"><div><i className="icon-line-camera"></i>Gallery</div></a></li>
                <li><a href="/events"><div><i className="icon-line-location"></i>Events</div></a></li>
                <li><a href="/obituary"><div><i className="icon-eye-close"></i>Obituary</div></a></li>
                <li className=""><a href="/contact"><div><i className="icon-line-mail"></i>Contact Us</div></a></li>
                <li><a href="/donate"><div><i className="icon-dollar" ></i>Donate</div></a></li>
              </ul>       
            </div>
          </nav>
        </div>

		  </header>
    );
  }
}
        
export default Header;
