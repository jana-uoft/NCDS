import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import { getEvents } from '../../actions/events';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import NumberFormat from 'react-number-format';


class Event extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  componentDidMount = () => {
    this.props.getEvents();
  }

  handleTextChange = (id, field, value) => {
    console.log({id, field, value})
  }

  handleDateChange = (date) => {
    console.log(date.toISOString())
  }

  handleTimeChange = (date) => {
    console.log(date.getTime()/1000)
  }

  renderEvent = (event, idx) => {
    return (
      <Paper
        key={idx}
        style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          alignItems: 'center'
        }}
        >
        <DatePicker
          autoOk
          showTodayButton
          value={new Date(event.date)}
          onChange={this.handleDateChange}
          animateYearScrolling={true}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'title', e.target.value)}
          defaultValue={event.title}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'description', e.target.value)}
          defaultValue={event.description}
          multiline
          rowsMax="15"
        />
        <TimePicker
          autoOk
          showTodayButton
          todayLabel="now"
          value={new Date(event.startTime*1000)}
          onChange={this.handleTimeChange}
        />
        <TimePicker
          autoOk
          showTodayButton
          todayLabel="now"
          value={new Date(event.endTime*1000)}
          onChange={this.handleTimeChange}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'coverImage', e.target.value)}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'location', e.target.value)}
          defaultValue={event.location}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'address', e.target.value)}
          defaultValue={event.address}
          multiline
          rowsMax="15"
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event._id, 'contactName', e.target.value)}
          defaultValue={event.contactName}
        />
        <TextField
          id={event._id}
          value={event.contactNumber}
          onChange={(e)=>this.handleTextChange(event._id, 'contactNumber', e.target.value)}
          InputProps={{
            inputComponent: ({inputRef, onChange, ...other}) => (
              <NumberFormat
                {...other}
                ref={inputRef}
                onValueChange={values => onChange({target: {value: values.value}})}
                format="+1 (###) ###-####"
                mask="_"
              />
            )
          }}
        />
      </Paper>
    )
  }

  render() {
    if (this.props.loading) return <Loading />

    return (
      <div>
          {/* <Typography variant='headline'>Events</Typography> */}
          <div style={{
            display: 'grid',
            gridGap: 20
          }}>
            <Paper
              style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                // justifyItems: 'center'
              }}
            >
              <Typography variant='subheading'>Date</Typography>
              <Typography variant='subheading'>Title</Typography>
              <Typography variant='subheading'>Description</Typography>
              <Typography variant='subheading'>Start Time</Typography>
              <Typography variant='subheading'>End Time</Typography>
              <Typography variant='subheading'>Cover Image</Typography>
              <Typography variant='subheading'>Location</Typography>
              <Typography variant='subheading'>Address</Typography>
              <Typography variant='subheading'>Contact Name</Typography>
              <Typography variant='subheading'>Contact Number</Typography>
            </Paper>
            {this.props.events.map(this.renderEvent)}
          </div>
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