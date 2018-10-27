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
    if (new Date(obituary.expiryDate) < new Date()) return null

    const Obituary = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(55,55,55,1) 38%);
      & img {
        width: 100%;
        max-height: 250px;
      }
      text-align: center;
      &:hover {
        background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(19,20,19,1) 54%);
      }
      & > * {
        color: white !important;
        text-align: center;
      }
    `
    return (
      <Obituary key={idx} elevation={24}>
        <Typography variant="title">{obituary.name}</Typography>
        <img src={obituary.coverImage} alt={obituary.name}/>
        <Typography variant="title">
         &nbsp;&nbsp;மலர்வு &nbsp;: {obituary.birthDate ? format(Date.parse(obituary.birthDate), 'DD-MM-YYYY') : 'Unknown'}
          <br/>
          நினைவு : {obituary.deathDate ? format(Date.parse(obituary.deathDate), 'DD-MM-YYYY') : 'Unknown'}
        </Typography>
        <Typography>{obituary.contactName}&nbsp;&nbsp;{obituary.contactNumber}</Typography>
        <Typography>{obituary.description}</Typography>
      </Obituary>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    let obituariesToRender = this.props.obituaries.map(this.renderObituary)
    obituariesToRender = obituariesToRender.filter(obituary=>obituary)
    return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 400px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center'}}>
        {obituariesToRender}
        {obituariesToRender.length===0 &&
          <Typography variant='title' style={{textAlign: 'center'}}>There are no Obituaries to display</Typography>
        }
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

