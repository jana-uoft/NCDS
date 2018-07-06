import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContributions } from '../../actions/contributions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import LightBox from '../../components/global/LightBox';
import Loading from '../../components/global/Loading';


class Contributions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      images: []
    }
  }

  componentDidMount() {
    this.props.getContributions()
  }

  viewContributionImages = (images) => {
    this.setState({ images }, () => this.setState({ open: true }));
  }

  renderContribution = (contribution, idx) => {
    const Contribution = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
      cursor: pointer;
      height: 350px;
      & img {
        width: 100%;
        height: 60%;
      }
      &:hover {
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(23,50,29,1) 38%);
      }
    `
    return (
      <Contribution key={idx} elevation={24} onClick={()=>this.viewContributionImages(contribution.images)}>
        <Typography noWrap variant='title' style={{textAlign: 'center', color: 'white'}}>{contribution.title}</Typography>
        <img src={contribution.coverImage} alt={contribution.title}/>
        <Typography variant='subheading' style={{textAlign: 'center', color: 'white'}}>{contribution.date.slice(0,10)}</Typography>
        <Typography style={{textAlign: 'justify', color: 'white', margin: '0 10px'}}>{contribution.description}</Typography>
      </Contribution>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    return (
      <div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 350px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center'}}>
          {this.props.contributions.map(this.renderContribution)}
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
  contributions: state.contributions,
  loading: state.general.loading

})

const mapDispatchToProps = dispatch => ({
  getContributions: () => dispatch(getContributions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Contributions)

