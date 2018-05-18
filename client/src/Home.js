import React, { Component } from 'react'
import { isMobile } from 'react-device-detect';


export default class Home extends Component {
  render() {

    let leftSideBar, rightSideBar;

    if (!isMobile) leftSideBar = (
      <div className="sidebar sticky-sidebar-wrap nobottommargin clearfix">
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            {/* <div className="widget clearfix"></div> */}
            <div className="widget clearfix">
              <img src="/images/ad001.png" alt="Advertisement 1"/>
            </div>
            <div className="widget clearfix">
              <img src="/images/ad02.png" alt="Advertisement 2" />
            </div>
          </div>
        </div>
      </div>
    );
    
    let content = (
      <div className="postcontent bothsidebar nobottommargin clearfix" style={{textAlign: 'center'}}>
        <img src="/images/home_page_pic.PNG" alt="Cover" />
        <blockquote className="topmargin bottommargin">
          <p>BLA BLA BLA BLA BLA BLA </p>
        </blockquote>
        <div className="col_full clearfix">
          <div className="masonry-thumbs grid-3" data-big="2" data-lightbox="gallery">
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615527/gallery/007/FB_IMG_1526562702293.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615527/gallery/007/FB_IMG_1526562702293.jpg" alt="Gallery Thumb 2"/></a>
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615527/gallery/007/FB_IMG_1526563170721.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615527/gallery/007/FB_IMG_1526563170721.jpg" alt="Gallery Thumb 1"/></a>
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615529/gallery/007/FB_IMG_1526564924127.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615529/gallery/007/FB_IMG_1526564924127.jpg" alt="Gallery Thumb 3"/></a>
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615528/gallery/007/FB_IMG_1526564407691.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615528/gallery/007/FB_IMG_1526564407691.jpg" alt="Gallery Thumb 4"/></a>
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615536/gallery/007/IMG-20180412-WA0015_1.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615536/gallery/007/IMG-20180412-WA0015_1.jpg" alt="Gallery Thumb 5"/></a>
            <a href="https://res.cloudinary.com/nainativucds/image/upload/v1526615536/gallery/007/IMG-20180427-WA0008.jpg" data-lightbox="gallery-item"><img className="image_fade" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615536/gallery/007/IMG-20180427-WA0008.jpg" alt="Gallery Thumb 6"/></a>
          </div>
        </div>
        <p><span className="dropcap">F</span>oster best practices effectiveness inspire breakthroughs solve immunize turmoil. Policy dialogue peaceful The Elders rural global support. Process inclusive innovate readiness, public sector complexity. Lifting people up cornerstone partner, technology working families civic engagement activist recognize potential global network. Countries tackling solution respond change-makers tackle. Assistance, giving; fight against malnutrition experience in the field lasting change scalable. Empowerment long-term, fairness policy community progress social responsibility; Cesar Chavez recognition. Expanding community ownership visionary indicator pursue these aspirations accessibility. Achieve; worldwide, life-saving initiative facilitate. New approaches, John Lennon humanitarian relief fundraise vaccine Jane Jacobs community health workers Oxfam. Our ambitions informal economies.</p>
      </div>
    );

    if (!isMobile) rightSideBar = (
      <div className="sidebar sticky-sidebar-wrap col_last nobottommargin clearfix">
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            {/* <div className="widget clearfix"></div> */}
            <div className="widget clearfix">
              <img src="/images/ad03.png" alt="Advertisement 3" />
            </div>
            <div className="widget clearfix">
              <img src="/images/ad04.jpg" alt="Advertisement 4" />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container-fullwidth clearfix">
        {leftSideBar}  
        {content}  
        {rightSideBar}
      </div>
    )
  }
}
