import React, { Component } from 'react'
import Loading from './Loading';
import ContactUsComponent from './ContactUsComponent';

const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Obituary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  componentDidMount = () => {
    fetch('/api/obituary')
      .then(response => response.json())
      .then(events => this.setState({ events }))
  }


  renderItem = (item, idx) => {
    return (
      <div key={idx} className="col-lg-6 nobottommargin">
        <div className="entry" style={{ margin: 0, marginBottom: 20, padding: 10 }}>
          <div className="entry-image">
            <a>
              <img src={baseURL + 'h_150,w_200/' +item.images[0] + '.jpg'} alt={item.details.name} />
            </a>
          </div>
          <div className="entry-c">
            <div className="entry-title">
              <h4>{item.details.name}</h4>
              <p>{item.details.birth_date} - {item.details.death_date}</p>
            </div>
            <ul className="entry-meta clearfix">
              <li><a><i className="icon-time"></i> {item.details.start_time} - {item.details.end_time}</a></li>
              <li><a><i className="icon-map-marker2"></i>{item.details.location}</a></li>
              <li><a><i className="icon-map-marker2"></i>{item.details.address}</a></li>
              <li><a><i className="icon-call"></i>{item.details.contact_name}: {item.details.contact_number}</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {

    let noEvents;
    if (!this.state.events) return <Loading />;
    if (this.state.events.length === 0) noEvents = <h1> No Obituary notices to display </h1>;

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
            <ContactUsComponent type="Obituary"/>
          </div>
        </div>
      </div>
    )
  }
}
