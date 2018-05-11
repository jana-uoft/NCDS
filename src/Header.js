import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header" className="sticky-style-2 dark" style={{ background: '#0D2B31' }}>

        <div className="container clearfix" style={{ maxWidth: '100vw', padding: 0 }}>
          <div id="logo" className="divcenter">
            <a href="" className="standard-logo" data-dark-logo="/images/banner.jpg"><img style={{ width: '100vw' }}className="divcenter" src="/images/banner.jpg" alt="Nainativu CDS Logo"/></a>
            <a href="" className="retina-logo" data-dark-logo="/images/banner_mobile.jpg"><img style={{ width: '100vw' }} className="divcenter" src="/images/banner_mobile.jpg" alt="Nainativu CDS Logo"/></a>
				  </div>
			  </div>

        <div id="header-wrap">
          <nav id="primary-menu" className="style-2">
            <div className="container clearfix">
              <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
              <ul>
                <li className=""><a href="/contributions"><div><i className="icon-user"></i>Contributions</div></a></li>
                <li className=""><a href="/publications"><div><i className="icon-book3"></i>Publications</div></a></li>
                <li className=""><a href="/news"><div><i className="icon-book3"></i>News</div></a></li>
                <li className=""><a href="/gallery"><div><i className="icon-book3"></i>Gallery</div></a></li>
                <li><a href="/events"><div><i className="icon-news"></i>Events</div></a></li>
                <li><a href="/obituary"><div><i className="icon-news"></i>Obituary</div></a></li>
                {/* <li className=""><a style={{cursor: 'pointer'}}><div><i className="icon-book3"></i>Events</div></a>
                  <ul>
                    <li><a href="/events/auspicious"><div><i className="icon-news"></i>Auspicious Events</div></a></li>
                    <li><a href="/events/obituary"><div><i className="icon-news"></i>Obituary Events</div></a></li>
                  </ul>
                </li> */}
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
