import React, { Component } from 'react'
import Loading from './Loading';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Modal from 'react-responsive-modal';
import { isMobile } from 'react-device-detect';


const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: null,
      open: false,
      images: []
    };
  }

  componentDidMount = () => {
    fetch('/api/publications')
      .then(response => response.json())
      .then(publications => this.setState({ publications }));
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  viewPublication = (date) => {
    let publication = this.state.publications.find(pub=>pub.publication==date);
    let images = publication.images.map(pub => {
      return {
        original: baseURL + 'h_1000,w_800/' + pub + '.jpg',
        thumbnail: baseURL + 'h_200,w_150/' + pub + '.jpg'
      }
    });
    this.setState({ images }, () => this.onOpenModal());
  }


  render() {

    if (!this.state.publications) return <Loading/>;

    const listingsGrid = (
      <div className="row">
        {this.state.publications.map((pub, idx)=>
          <div key={idx} className="col-lg-2 col-md-4 bottommargin" data-animate="fadeInLeft" data-delay="500">
            <div className="product-image">
              <a style={{cursor: 'pointer'}} onClick={()=>this.viewPublication(pub.publication)}><img src={baseURL + 'h_300,w_200/' + pub.images[0] + '.jpg'} alt={pub.images[0]} /></a>
              {!isMobile ? <a style={{cursor: 'pointer'}} onClick={()=>this.viewPublication(pub.publication)}><img src={baseURL + 'h_300,w_200/' + pub.images[1] + '.jpg'} alt={pub.images[1]} /></a> : null }
            </div>
            <div className="product-desc">
              <div className="product-title"><h3 style={{textAlign: 'center'}}><a style={{ color: '#1ABC9C', cursor: 'pointer'}} onClick={() => this.viewPublication(pub.publication)}>{new Date(pub.publication).toLocaleDateString("en-US", {month: 'long', day: 'numeric', year:'numeric'})}</a></h3></div>
            </div>
          </div>
        )}
      </div>
    );

    let additionalProperties;
    isMobile ? additionalProperties = {} : additionalProperties = {thumbnailPosition: 'left'};

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
        {listingsGrid}
        {modal}
      </div>
    )
  }
}
