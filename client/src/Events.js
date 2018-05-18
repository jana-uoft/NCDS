import React, { Component } from 'react'
import Loading from './Loading';
import ContactUsComponent from './ContactUsComponent';

const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount = () => {
    fetch('/api/events')
      .then(response => response.json())
      .then(events => this.setState({ events }))
  }


  renderItem = (item, idx) => {
    const date = new Date(item.details.date);
    return (
      <div key={idx} className="col-lg-6 nobottommargin">
        <div className="entry" style={{ margin: 0, marginBottom: 20, padding: 10 }}>
          <div className="entry-image">
            <a>
              <img src={baseURL + item.images[0] + '.jpg'} alt={item.details.title} />
              <div className="entry-date">{date.getDate()}<span>{date.toLocaleString("en-US", { month: "long" })}</span></div>
            </a>
          </div>
          <div className="entry-c">
            <div className="entry-title">
              <h4>{item.details.title}</h4>
              <p>{item.details.description}</p>
            </div>
            <ul className="entry-meta clearfix">
              <li><a><i className="icon-time"></i> {item.details.start_time} - {item.details.end_time}</a></li>
              {/* <li><a><i className="icon-map-marker2"></i>{item.details.location}</a></li> */}
              <li><a><i className="icon-map-marker2"></i>{item.details.address}</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {

    let noEvents;
    if (!this.state.events) return <Loading />;
    if (this.state.events.length === 0) noEvents = <h1> No Events to display </h1>;

    return (
      <div className="container-fullwidth clearfix">
        <div className="postcontent nobottommargin clearfix">
          {noEvents}
          <div id="posts" className="events small-thumbs">
            <div className="row">
              {Object.values(this.state.events).map(this.renderItem)}
            </div>
          </div>
        </div>
  
        <div className="sidebar sticky-sidebar-wrap nobottommargin col_last clearfix">
          <div className="sidebar-widgets-wrap">
            <div className="widget clearfix"></div>
            <ContactUsComponent type="Events" />
          </div>
        </div>
      </div>
    )
  }
}
