import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getObituaries } from '../../actions/obituaries';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Loading from '../../components/global/Loading';
import { format } from 'date-fns'

class Obituaries extends Component {

  componentDidMount() {
    this.props.getObituaries()
  }

  renderObituary = (obituary, idx) => {
    const Obituary = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(55,55,55,1) 38%);
      & img {
        max-height: 250px;
      }
      text-align: center;
      &:hover {
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(19,20,19,1) 54%);
      }
    `
    return (
      <Obituary key={idx} elevation={24}>
        <Typography variant="title" style={{textAlign: 'center', color: 'white'}}>{obituary.name}</Typography>
        <img src={obituary.coverImage} alt={obituary.name}/>
        <div>
          <Typography variant="title" style={{textAlign: 'center', color: 'white'}}>
            {format(Date.parse(obituary.birthDate), 'DD-MM-YYYY')}&nbsp;&nbsp;to&nbsp;&nbsp;{format(Date.parse(obituary.deathDate), 'DD-MM-YYYY')}
          </Typography>
          <Typography style={{textAlign: 'center', color: 'white'}}>Contact {obituary.contactName} @ {obituary.contactNumber}</Typography>
          <Typography style={{textAlign: 'center', color: 'white', marginTop: 10}}>{obituary.description}</Typography>
        </div>
      </Obituary>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    let obituariesToRender = this.props.obituaries.map(this.renderObituary)
    obituariesToRender = obituariesToRender.filter(obituary=>obituary)
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 400px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center', gridAutoRows: 450}}>
        {obituariesToRender.length===0 ? <Typography variant="title">There are no {this.state.activeFilter} to Display</Typography> : obituariesToRender}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  obituaries: state.obituaries,
  loading: state.general.loading

})

const mapDispatchToProps = dispatch => ({
  getObituaries: () => dispatch(getObituaries())
})

export default connect(mapStateToProps, mapDispatchToProps)(Obituaries)

