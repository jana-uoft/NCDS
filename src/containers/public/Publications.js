import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPublications } from '../../actions/publications';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import LightBox from '../../components/global/LightBox';
import Loading from '../../components/global/Loading';

class Publications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      images: []
    }
  }

  componentDidMount() {
    this.props.getPublications()
  }

  viewPublicationImages = (images) => {
    this.setState({ images }, () => this.setState({ open: true }));
  }

  renderPublication = (publication, idx) => {
    const Publication = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
      cursor: pointer;
      height: 350px;
      & img {
        width: 100%;
        height: 85%;
      }
      &:hover {
        & img {
          content: url(${publication.images[0] ? publication.images[0] : publication.coverImage});
        }
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(23,50,29,1) 38%);
      }
    `
    return (
      <Publication key={idx} elevation={24} onClick={()=>this.viewPublicationImages(publication.images)}>
        <Typography noWrap variant='title' style={{textAlign: 'center', color: 'white'}}>{publication.title}</Typography>
        <img src={publication.coverImage} alt={publication.title}/>
        <Typography variant='subheading' style={{textAlign: 'center', color: 'white'}}>{publication.date.slice(0,10)}</Typography>
      </Publication>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    return (
      <div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 250px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center'}}>
          {this.props.publications.map(this.renderPublication)}
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
  publications: state.publications,
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  getPublications: () => dispatch(getPublications())
})

export default connect(mapStateToProps, mapDispatchToProps)(Publications)

