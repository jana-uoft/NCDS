import React, { Component } from 'react'
import Loading from './Loading';
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-image-gallery';

import { isMobile } from 'react-device-detect';


export default class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: null
    };
  }

  componentDidMount = () => {
    fetch('/api/publications')
      .then(response => response.json())
      .then(publications => this.setState({ publications }));
  }

  render() {


    if (!this.state.publications) return <Loading/>;

    const images = this.state.publications[0].images.map(pub=>{
      return {
        original: pub,
        thumbnail: pub
      }
    });

    console.log(images);

    return (
      <div className="container-fullwidth clearfix">
        <h4>Publications</h4>
        <ImageGallery items={images} thumbnailPosition='top' autoPlay={true} />
      </div>
    )
  }
}
