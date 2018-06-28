import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import { getEvents } from '../../actions/events';


class Event extends Component {

  componentDidMount = () => {
    this.props.getEvents();
  }

  renderEvent = (event, idx) => {
    return <div key={idx}>{event.title}</div>
  }

  render() {
    if (this.props.loading) return <Loading />
    return (
      <div>
          Events
          {this.props.events.map(this.renderEvent)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents())
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)