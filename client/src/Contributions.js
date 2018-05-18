import React, { Component } from 'react'
import Loading from './Loading';
import { isMobile } from 'react-device-detect';
import ImageGallery from 'react-image-gallery';
import Modal from 'react-responsive-modal';

const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Contributions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      type: null,
      open: false,
      images: []
    };
  }

  componentDidMount = () => {
    fetch('/api/contributions')
      .then(response => response.json())
      .then(events => this.setState({ events }))
  }


  renderItem = (item, idx) => {
    if (this.state.type && this.state.type !== item.details.type) return null;
    return (
      <div key={idx} className="col-lg-3 bottommargin">
        <div className="ipost clearfix">
          <div className="entry-image">
            <a style={{ cursor: 'pointer' }} onClick={() => this.viewItem(item.event)}><img className="image_fade" src={baseURL + 'h_200,w_300/' + item.images[0] + '.jpg'} alt="Thumbnail" /></a>
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
    this.setState({ type: type })
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  viewItem = (event) => {
    let singleItem = this.state.events.find(ev => ev.event === event);
    let images = singleItem.images.map(pub => {
      return {
        original: baseURL + 'h_1080,w_1920/' + pub + '.jpg',
        thumbnail: baseURL + 'h_150,w_200/' + pub + '.jpg'
      }
    });
    this.setState({ images }, () => this.onOpenModal());
  }

  render() {
    if (Object.values(this.state.events).length === 0) return <Loading />;
    if (this.state.events[Object.keys(this.state.events)[0]].images.length === 0) return <Loading />;


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
        <div className="row">
          {Object.values(this.state.events).map(this.renderItem)}
        </div>
        {modal}
      </div>
    )
  }
}
