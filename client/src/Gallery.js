import React, { Component } from 'react'
import Loading from './Loading';
import Lightbox from 'react-image-lightbox';


const baseURL = 'https://res.cloudinary.com/nainativucds/image/upload/';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      uniqueFilters: [],
      type: null,
      open: false,
      images: [],
      photoIndex: 0,
      slideShow: false
    };
  }

  componentDidMount = () => {
    fetch('/api/gallery')
      .then(response => response.json())
      .then(events => {
        let uniqueFilters = [];
        events.forEach(event => {
          if (!uniqueFilters.includes(event.details.type)) uniqueFilters.push(event.details.type);
        });
        this.setState({ events, uniqueFilters})
      })
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


  renderItem = (item, idx) => {
    if (this.state.type && this.state.type!==item.details.type) return null;
    return (
      <div key={idx} className="col-lg-3 bottommargin">
        <div className="ipost clearfix">
          <div className="entry-image">
            <a style={{ cursor: 'pointer' }} onClick={() => this.viewItem(item.event)}><img className="image_fade" src={baseURL + 'w_400,h_250,c_scale/' +item.images[0] + '.jpg'} alt="Thumbnail" /></a>
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

  renderFilter = (filter, idx) => {
    return (
      <li key={idx} style={{ cursor: 'pointer' }} className={this.state.type === filter ? "activeFilter" : ""}><a onClick={()=>this.filterItems(filter)}>{filter}</a></li>
    );
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    clearInterval(this.interval);
    this.setState({ open: false, photoIndex: 0, slideShow: false });
  };

  viewItem = (event) => {
    let singleItem = this.state.events.find(ev=>ev.event===event);
    let images = singleItem.images.map(pub => baseURL + pub + '.jpg');
    this.setState({ images }, () => this.onOpenModal());
  }

  render() {
    if (Object.values(this.state.events).length === 0) return <Loading />;
    if (this.state.events[Object.keys(this.state.events)[0]].images.length === 0) return <Loading />;


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
        <ul id="portfolio-filter" className="portfolio-filter clearfix">
          <li style={{ cursor: 'pointer' }} key={0} className={this.state.type ? "" : "activeFilter"}><a onClick={() => this.filterItems(null)}>Show All</a></li>
          {Object.values(this.state.uniqueFilters).map(this.renderFilter)}
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
