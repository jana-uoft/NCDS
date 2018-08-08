import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/events';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Loading from '../../components/global/Loading';
import Chip from '@material-ui/core/Chip';
import { format } from 'date-fns'

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeFilter: 'Upcoming Events',
      expanded: false
    }
  }

  componentDidMount() {
    this.props.getEvents()
  }


  renderEvent = (event, idx) => {
    if (this.state.activeFilter !== "Show All") {
      if ((this.state.activeFilter === "Upcoming Events") && new Date(event.date).getDate() < new Date().getDate()) return
      if ((this.state.activeFilter === "Past Events") && new Date(event.date).getDate() >= new Date().getDate())return
    }
    const Event = styled(Paper)`
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
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
      <Event key={idx} elevation={24}>
        <Typography variant="title">{format(Date.parse(event.date), 'dddd, Do MMMM YYYY')}</Typography>
        <img src={event.coverImage} alt={event.title}/>
        <Typography variant="title">{event.title}</Typography>
        <Typography>{format(Date.parse(event.startTime), 'hh:mm A')} to {format(Date.parse(event.endTime), 'hh:mm A')}</Typography>
        <Typography>{event.location}</Typography>
        <Typography>{event.address}</Typography>
        <Typography>Contact {event.contactName} @ {event.contactNumber}</Typography>
        <Typography>{event.description}</Typography>
      </Event>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    let eventsToRender = this.props.events.map(this.renderEvent)
    eventsToRender = eventsToRender.filter(event=>event)
    return (
      <div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 150px)', gridGap: 10, margin: '20px 20px', justifyContent: 'center'}}>
          {["Upcoming Events", "Past Events", "Show All"].map((type, idx)=>
            <Chip
              key={idx}
              label={type}
              clickable
              onClick={()=>this.setState({activeFilter: type})}
              style={this.state.activeFilter===type ? {background: 'linear-gradient(to bottom left, #33ccff -12%, #006600 33%)', color: 'white', width: '100%'} : {width: '100%'}}
            />
          )}
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 350px)', gridGap: 30, margin: '20px 20px', justifyContent: 'center'}}>
          {eventsToRender}
        </div>
        {eventsToRender.length===0 &&
          <Typography variant='title' style={{textAlign: 'center'}}>There are no {this.state.activeFilter==="Show All" ? "Events" : this.state.activeFilter} to display</Typography>
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  events: state.events,
  loading: state.general.loading

})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(Events)

