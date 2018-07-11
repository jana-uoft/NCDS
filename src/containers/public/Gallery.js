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
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
      cursor: pointer;
      & img {
        width: 100%;
        max-height: 200px;
      }
      &:hover {
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(23,50,29,1) 38%);
      }
      & > * {
        color: white !important;
        text-align: center;
      }
    `
    return (
      <Gallery key={idx} elevation={24}>
        <Typography noWrap variant='title'>{gallery.title}</Typography>
        <img src={gallery.coverImage} alt={gallery.title} onClick={()=>this.viewGalleryImages(gallery.images)}/>
        <Typography variant='subheading'>{gallery.date.slice(0,10)}</Typography>
        <Typography>{gallery.location}</Typography>
        <Typography>{gallery.description}</Typography>
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 150px)', gridGap: 10, margin: '20px 20px', justifyContent: 'center'}}>
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
        {this.props.galleries && this.props.galleries.length===0 &&
          <Typography variant='title' style={{textAlign: 'center'}}>There are no Galleries to display</Typography>
        }
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

