import React, { Component } from 'react'

export default class Home extends Component {
  render() {

    let leftSideBar = (
      <div className="sidebar sticky-sidebar-wrap nobottommargin clearfix">
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            <div className="widget clearfix">
              <img src="http://fpoimg.com/300x250" alt="Advertisement 1"/>
            </div>
            <div className="widget clearfix">
              <img src="http://fpoimg.com/300x250" alt="Advertisement 2" />
            </div>
          </div>
        </div>
      </div>
    );
    
    let content = (
      <div className="postcontent bothsidebar nobottommargin clearfix">
        <p><span className="dropcap">F</span>oster best practices effectiveness inspire breakthroughs solve immunize turmoil. Policy dialogue peaceful The Elders rural global support. Process inclusive innovate readiness, public sector complexity. Lifting people up cornerstone partner, technology working families civic engagement activist recognize potential global network. Countries tackling solution respond change-makers tackle. Assistance, giving; fight against malnutrition experience in the field lasting change scalable. Empowerment long-term, fairness policy community progress social responsibility; Cesar Chavez recognition. Expanding community ownership visionary indicator pursue these aspirations accessibility. Achieve; worldwide, life-saving initiative facilitate. New approaches, John Lennon humanitarian relief fundraise vaccine Jane Jacobs community health workers Oxfam. Our ambitions informal economies.</p>
        <blockquote className="topmargin bottommargin">
          <p>Human rights healthcare immunize; advancement grantees. Medical supplies; meaningful, truth technology catalytic effect. Promising development capacity building international enable poverty.</p>
        </blockquote>
        <img src="/images/cover.jpg" alt="Cover" />
      </div>
    );

    let rightSideBar = (
      <div className="sidebar sticky-sidebar-wrap col_last nobottommargin clearfix">
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            <div className="widget clearfix">
              <img src="http://fpoimg.com/300x250" alt="Advertisement 1" />
            </div>
            <div className="widget clearfix">
              <img src="http://fpoimg.com/300x250" alt="Advertisement 2" />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <section id="content">
        <div className="content-wrap">
          <div className="container-fullwidth clearfix">
            {leftSideBar}  
            {content}  
            {rightSideBar}
          </div>
        </div>
      </section>
    )
  }
}
