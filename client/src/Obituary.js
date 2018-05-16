import React, { Component } from 'react'
import Loading from './Loading';
import ContactUsComponent from './ContactUsComponent';

const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Obituary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
    };
  }

  componentDidMount = () => {
    fetch('/api/obituary')
      .then(response => response.json())
      .then(event => {
        event.forEach(event => {
          this.setState({ events: { ...this.state.events, [event.event]: { images: event.images, event: event.event, details: {} } } })
        });
        event.forEach(event => {
          fetch('/api/obituary/' + event.event)
            .then(response => response.json())
            .then(details => this.setState({ events: { ...this.state.events, [event.event]: { ...this.state.events[event.event], details } } }))
        });
      });
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


    if (Object.values(this.state.events).length === 0) return <Loading />;
    if (this.state.events[Object.keys(this.state.events)[0]].images.length === 0) return <Loading />;

    return (
      <div className="container-fullwidth clearfix">
        <div className="postcontent nobottommargin clearfix">
          <div id="posts" className="events small-thumbs">
            <div className="row">
              {Object.values(this.state.events).map(this.renderItem)}
            </div>
          </div>
        </div>

        <div className="sidebar sticky-sidebar-wrap nobottommargin col_last clearfix">
          <div className="sidebar-widgets-wrap">
            <div className="widget clearfix"></div>
            <ContactUsComponent />
          </div>
        </div>
      </div>
    )
  }
}
