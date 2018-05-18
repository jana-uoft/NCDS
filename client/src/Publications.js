import React, { Component } from 'react'
import Loading from './Loading';
import "react-image-gallery/styles/css/image-gallery.css";
import { isMobile } from 'react-device-detect';
import Lightbox from 'react-image-lightbox';


const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: null,
      open: false,
      images: [],
      photoIndex: 0,
      slideShow: false
    };
  }

  componentDidMount = () => {
    fetch('/api/publications')
      .then(response => response.json())
      .then(publications => this.setState({ publications }));
  }


  startSlideShow = () => {
    if (this.state.slideShow)
      clearInterval(this.interval);
    else
      this.interval = setInterval(this.showNextSlide, 5000);
    this.setState({ slideShow: !this.state.slideShow })
  }

  showNextSlide = (nextButton) => {
    document.getElementsByClassName("ril-next-button ril__navButtons ril__navButtonNext")[0].click();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    clearInterval(this.interval);
    this.setState({ open: false, photoIndex: 0, slideShow: false });
  };

  viewPublication = (date) => {
    let publication = this.state.publications.find(pub=>pub.publication===date);
    let images = publication.images.map(pub => baseURL + pub + '.jpg');
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


    let modal;
    if (this.state.open) modal = (
      <Lightbox
        mainSrc={this.state.images[this.state.photoIndex]}
        nextSrc={this.state.images[(this.state.photoIndex + 1) % this.state.images.length]}
        prevSrc={this.state.images[(this.state.photoIndex + this.state.images.length - 1) % this.state.images.length]}
        onCloseRequest={this.onCloseModal}
        onMovePrevRequest={() => this.setState({
          photoIndex: (this.state.photoIndex + this.state.images.length - 1) % this.state.images.length,
        })}
        onMoveNextRequest={() => this.setState({
          photoIndex: (this.state.photoIndex + 1) % this.state.images.length,
        })}
        toolbarButtons={[<i className={this.state.slideShow ? "icon-pause" : "icon-googleplay"} onClick={this.startSlideShow}></i>]}
      />
    );

    return (
      <div className="container-fullwidth clearfix">
        {listingsGrid}
        {modal}
      </div>
    )
  }
}
