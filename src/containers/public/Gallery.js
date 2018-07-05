import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGalleries } from '../../actions/galleries';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import LightBox from '../../components/global/LightBox';
import Loading from '../../components/global/Loading';
import Chip from '@material-ui/core/Chip';


class Galleries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      images: [],
      activeFilter: 'Show All'
    }
  }

  componentDidMount() {
    this.props.getGalleries()
  }

  viewGalleryImages = (images) => {
    this.setState({ images }, () => this.setState({ open: true }));
  }

  renderGallery = (gallery, idx) => {
    if (this.state.activeFilter !== "Show All" && this.state.activeFilter!==gallery.type) return
    const Gallery = styled(Paper)`
      background: linear-gradient(to left, #33ccff -39%, #003300 61%);
      cursor: pointer;
      height: 350px;
      & img {
        width: 100%;
        height: 60%;
      }
      &:hover {
        background: linear-gradient(to right, #33ccff -39%, #003300 44%);
      }
    `
    return (
      <Gallery key={idx} elevation={24} onClick={()=>this.viewGalleryImages(gallery.images)}>
        <Typography noWrap variant='title' style={{textAlign: 'center', color: 'white'}}>{gallery.title}</Typography>
        <img src={gallery.coverImage} alt={gallery.title}/>
        <Typography variant='subheading' style={{textAlign: 'center', color: 'white'}}>{gallery.date.slice(0,10)}</Typography>
        <Typography style={{textAlign: 'justify', color: 'white', margin: '0 10px'}}>{gallery.description}</Typography>
      </Gallery>
    )
  }

  getUniqueTypes = () => {
    let allTypes = this.props.galleries.map(gallery=>gallery.type)
    allTypes = [ ...new Set(allTypes) ]
    allTypes.unshift("Show All")
    return allTypes
  }

  render() {
    if (this.props.loading) return <Loading />
    const allUniqueTypes = this.getUniqueTypes();
    return (
      <div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 100px)', gridGap: 20, margin: '20px 20px', justifyContent: 'left'}}>
          {allUniqueTypes.map((type, idx)=>
            <Chip
              key={idx}
              label={type}
              clickable
              onClick={()=>this.setState({activeFilter: type})}
              style={this.state.activeFilter===type ? {background: 'linear-gradient(to bottom left, #33ccff -12%, #006600 33%)', color: 'white'} : {}}
            />
          )}
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 350px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center'}}>
          {this.props.galleries.map(this.renderGallery)}
        </div>
        {this.state.open && this.state.images.length > 0 &&
        <LightBox
          images={this.state.images}
          photoIndex={0}
          onCloseModal={()=>this.setState({ open: false})}
        />}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  galleries: state.galleries,
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  getGalleries: () => dispatch(getGalleries())
})

export default connect(mapStateToProps, mapDispatchToProps)(Galleries)

