import React, { Component } from 'react';

class Header extends Component {
  render() {
    let bannerStyle = { maxWidth: '100vw', padding: 0, position: 'fixed', zIndex: 50, background: '#0D2B31' };

    let menuStyle = { top: 100, background: '#0D2B31' };

    let menus = [
      {
        link: "/contributions",
        icon: "icon-users",
        label: this.props.contributions ? <strong style={{ color: 'MediumSeaGreen' }}>Contributions</strong> : "Contributions",
      },
      {
        link: "/publications",
        icon: "icon-book3",
        label: this.props.publications ? <strong style={{ color: 'MediumSeaGreen' }}>Publications</strong> : "Publications",
      },
      {
        link: "/news",
        icon: "icon-newspaper",
        label: this.props.news ? <strong style={{ color: 'MediumSeaGreen' }}>News</strong> : "News",
      },
      {
        link: "/gallery",
        icon: "icon-line-camera",
        label: this.props.gallery ? <strong style={{ color: 'MediumSeaGreen' }}>Gallery</strong> : "Gallery",
      },
      {
        link: "/events",
        icon: "icon-line-location",
        label: this.props.events ? <strong style={{ color: 'MediumSeaGreen' }}>Events</strong> : "Events",
      },
      {
        link: "/obituary",
        icon: "icon-eye-close",
        label: this.props.obituary ? <strong style={{ color: 'MediumSeaGreen' }}>Obituary</strong> : "Obituary",
      },
      {
        link: "/contact",
        icon: "icon-line-mail",
        label: this.props.contact ? <strong style={{ color: 'MediumSeaGreen' }}>Contact Us</strong> : "Contact Us",
      },
      {
        link: "/donate",
        icon: "icon-dollar",
        label: this.props.donate ? <strong style={{ color: 'MediumSeaGreen' }}>Donate</strong> : "Donate",
      }
    ];

    let logos = [
      { class: "standard-logo", image: "/images/banner.jpg" },
      { class: "retina-logo", image: "/images/banner_mobile.jpg" }
    ];

    return (
      <header id="header" className="sticky-style-2 dark">

        <div className="container clearfix" style={bannerStyle}>
          <div id="logo" className="divcenter">
            {logos.map((logo, idx)=>
              <a key={idx} href="/" className={logo.class} data-dark-logo={logo.image}><img style={{ width: '100vw' }} className="divcenter" src={logo.image} alt="Nainativu CDS Logo" /></a>              
            )}
				  </div>
			  </div>

        <div id="header-wrap" style={menuStyle}>
          <nav id="primary-menu" className="style-2">
            <div className="container clearfix">
              <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
              <ul>
                {menus.map((menu, idx)=>
                  <li key={idx}><a href={menu.link}><div><i className={menu.icon}></i>{menu.label}</div></a></li>               
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
