import React, { Component } from 'react'
import Loading from './Loading';
import { isMobile } from 'react-device-detect';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-responsive-modal';

const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: {},
      type: null,
      open: false,
      images: []
    };
  }

  componentDidMount = () => {
    fetch('/api/gallery')
      .then(response => response.json())
      .then(gallery => {
        gallery.forEach(event => {
          this.setState({ events: { ...this.state.events, [event.event]: { images: event.images, event: event.event, details: {}}}})
        });
        gallery.forEach(event => {
          fetch('/api/gallery/'+event.event)
            .then(response => response.json())
            .then(details => this.setState({ events: {...this.state.events, [event.event]: {...this.state.events[event.event], details}}}))
        });
      });
  }


  renderItem = (item, idx) => {
    if (this.state.type && this.state.type!==item.details.type) return null;
    return (
      <div key={idx} className="col-lg-3 bottommargin">
        <div className="ipost clearfix">
          <div className="entry-image">
            <a style={{ cursor: 'pointer' }} onClick={() => this.viewItem(item.event)}><img className="image_fade" src={baseURL + item.images[0] + '.jpg'} alt="Thumbnail" /></a>
          </div>
          <div className="entry-title">
            <h3 style={{ cursor: 'pointer' }}>{item.details.title}</h3>
          </div>
          <ul className="entry-meta clearfix">
            <li><i className="icon-location" onClick={() => this.viewItem(item.event)}></i>{item.details.location}</li>
          </ul>
        </div>
      </div>
    );
  }

  filterItems = (type) => {
    this.setState({type: type})
  }

  renderFilter = (item, idx) => {
    return (
      <li key={idx} style={{ cursor: 'pointer' }} className={this.state.type == item.details.type ? "activeFilter" : ""}><a onClick={()=>this.filterItems(item.details.type)}>{item.details.type}</a></li>
    );
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  viewItem = (event) => {
    let singleItem = this.state.events[event];
    let images = singleItem.images.map(pub => {
      return {
        original: baseURL + 'h_1080,w_1920/' + pub + '.jpg',
        thumbnail: baseURL + 'h_150,w_200/' + pub + '.jpg'
      }
    });
    this.setState({ images }, () => this.onOpenModal());
  }

  render() {
    if (Object.values(this.state.events).length == 0) return <Loading />;
    if (this.state.events[Object.keys(this.state.events)[0]].images.length == 0) return <Loading />;


    let additionalProperties;
    isMobile ? additionalProperties = {} : additionalProperties = { thumbnailPosition: 'bottom' };

    let modal = (
      <Modal
        open={this.state.open}
        onClose={this.onCloseModal}
        center
        classNames={{
          transitionEnter: 'transition-enter',
          transitionEnterActive: 'transition-enter-active',
          transitionExit: 'transition-exit-active',
          transitionExitActive: 'transition-exit-active',
        }}
        animationDuration={1000}
      >
        <ImageGallery items={this.state.images} showThumbnails={!isMobile} autoPlay={true} slideInterval={5000} {...additionalProperties} />
      </Modal>
    );

    return (
      <div className="container-fullwidth clearfix">
        <ul id="portfolio-filter" className="portfolio-filter clearfix">
          <li key={0} className={this.state.type ? "" : "activeFilter"}><a onClick={() => this.filterItems(null)}>Show All</a></li>
          {Object.values(this.state.events).map(this.renderFilter)}
        </ul>
        <div className="clear"></div>
        <div className="row">
          {Object.values(this.state.events).map(this.renderItem)}
        </div>
        {modal}
      </div>
    )
  }
}
