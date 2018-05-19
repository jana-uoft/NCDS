import React, { Component } from 'react';
// import { isMobile } from 'react-device-detect';

class Header extends Component {
  render() {
    let bannerStyle = { maxWidth: '100vw', padding: 0, position: 'fixed', zIndex: 50, background: '#0D2B31' };

    let menuStyle = { top: 100, background: '#0D2B31' };

    let menus = [
      {
        link: "/contributions",
        icon: "icon-users",
        label: this.props.contributions ? <strong style={{ color: 'MediumSeaGreen' }}>Contributions</strong> : "அபிவிருத்திகள்",
      },
      {
        link: "/publications",
        icon: "icon-book3",
        label: this.props.publications ? <strong style={{ color: 'MediumSeaGreen' }}>Publications</strong> : "வெளியீடுகள்",
      },
      {
        link: "/news",
        icon: "icon-newspaper",
        label: this.props.news ? <strong style={{ color: 'MediumSeaGreen' }}>News</strong> : "செய்திகள்",
      },
      {
        link: "/gallery",
        icon: "icon-line-camera",
        label: this.props.gallery ? <strong style={{ color: 'MediumSeaGreen' }}>Gallery</strong> : "புகைப்படங்கள்",
      },
      {
        link: "/events",
        icon: "icon-line-location",
        label: this.props.events ? <strong style={{ color: 'MediumSeaGreen' }}>Events</strong> : "நிகழ்வுகள்",
      },
      {
        link: "/obituary",
        icon: "icon-eye-close",
        label: this.props.obituary ? <strong style={{ color: 'MediumSeaGreen' }}>Obituary</strong> : "துயர்வுகள்",
      },
      {
        link: "/contact",
        icon: "icon-line-mail",
        label: this.props.contact ? <strong style={{ color: 'MediumSeaGreen' }}>Contact Us</strong> : "தொடர்புகள்",
      },
      {
        link: "/donate",
        icon: "icon-dollar",
        label: this.props.donate ? <strong style={{ color: 'MediumSeaGreen' }}>Donate</strong> : "நிதி",
        // class: "donate"
      }
    ];

    let logos = [
      { class: "standard-logo", image: "/images/banner.jpg" },
      { class: "retina-logo", image: "/images/banner_mobile.jpg", style:{width: '100vw'}, imgStyle: {left: '-40px'} }
    ];

    return (
      <header id="header" className="sticky-style-2 dark">

        <div className="container clearfix" style={bannerStyle}>
          <div id="logo" className="divcenter">
            {logos.map((logo, idx)=>
              <a key={idx} href="/" className={logo.class} data-dark-logo={logo.image} style={logo.style}><img style={logo.imgStyle} className="divcenter" src={logo.image} alt="Nainativu CDS Logo" /></a>              
            )}
				  </div>
			  </div>

        <div id="header-wrap" style={menuStyle}>
          <nav id="primary-menu" className="style-2">
            <div className="container clearfix">
              <div id="primary-menu-trigger" style={{ left: '42%' }}><i className="icon-arrow-down2"></i></div>
              <ul>
                {menus.map((menu, idx)=>
                  <li key={idx}><a href={menu.link} style={{fontSize: 12}}><div className={menu.class}><i className={menu.icon}></i>{menu.label}</div></a></li>               
                )}
              </ul>       
            </div>
          </nav>
        </div>

		  </header>
    );
  }
}
        
export default Header;
