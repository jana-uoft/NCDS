import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import 'react-image-lightbox/style.css';

export default class componentName extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photoIndex: props.photoIndex,
      slideShow: false
    }
  }

  startSlideShow = () => {
    if (this.state.slideShow)
      clearInterval(this.interval);
    else
      this.interval = setInterval(this.showNextSlide, 5000);
    this.setState({ slideShow: !this.state.slideShow })
  }

  showNextSlide = () => {
    document.getElementsByClassName("ril-next-button ril__navButtons ril__navButtonNext")[0].click();
  }

  onCloseModal = () => {
    clearInterval(this.interval);
    this.setState({ photoIndex: 0, slideShow: false }, ()=>this.props.onCloseModal());
  };


  render() {
    let slideShowIcon = (
      <IconButton aria-label="Play" onClick={this.startSlideShow} style={{color: 'white'}}>
        <PlayArrowIcon style={{height: 35, width: 35}}/>
      </IconButton>
    )
    if (this.state.slideShow)
      slideShowIcon = (
        <IconButton aria-label="Pause" onClick={this.startSlideShow} style={{color: 'white'}}>
          <PauseIcon style={{height: 35, width: 35}}/>
        </IconButton>
      )

    return (
      <Lightbox
        mainSrc={this.props.images[this.state.photoIndex]}
        nextSrc={this.props.images[(this.state.photoIndex + 1) % this.props.images.length]}
        prevSrc={this.props.images[(this.state.photoIndex + this.props.images.length - 1) % this.props.images.length]}
        onCloseRequest={this.onCloseModal}
        onMovePrevRequest={() => this.setState({
          photoIndex: (this.state.photoIndex + this.props.images.length - 1) % this.props.images.length,
        })}
        onMoveNextRequest={() => this.setState({
          photoIndex: (this.state.photoIndex + 1) % this.props.images.length,
        })}
        toolbarButtons={[slideShowIcon]}
        style={{position: 'fixed', zIndex: 505}}
      />
    )
  }
}
