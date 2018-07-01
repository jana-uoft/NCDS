import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import { getEvents } from '../../actions/events';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import NumberFormat from 'react-number-format';
import { updateEvent } from '../../actions/events';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

class Event extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  componentDidMount = () => {
    this.props.getEvents();
  }

  handleTextChange = (event, field, value) => {
    this.props.updateEvent({...event, [field]: value})
  }

  handleDateChange = (event, field, date) => {
    this.props.updateEvent({...event, [field]: date.toISOString()})
  }

  selectImage = (event) => {
    console.log('SELECT MDEIA');

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
          onChange={date => this.handleDateChange(event, 'date', date)}
          animateYearScrolling={true}
          format="DD/MM/YYYY"
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event, 'title', e.target.value)}
          defaultValue={event.title}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event, 'description', e.target.value)}
          defaultValue={event.description}
          multiline
          rowsMax="15"
        />
        <TimePicker
          autoOk
          showTodayButton
          todayLabel="now"
          value={new Date(event.startTime)}
          onChange={time => this.handleDateChange(event, 'startTime', time)}
        />
        <TimePicker
          autoOk
          showTodayButton
          todayLabel="now"
          value={new Date(event.endTime)}
          onChange={time => this.handleDateChange(event, 'endTime', time)}
        />
        <Card>
          <CardMedia
            style={{ paddingTop: '56.25%', cursor: 'pointer' }}
            image={event.coverImage}
            title={event.title}
            onClick={()=>this.selectImage(event)}
          />
        </Card>
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event, 'location', e.target.value)}
          defaultValue={event.location}
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event, 'address', e.target.value)}
          defaultValue={event.address}
          multiline
          rowsMax="15"
        />
        <TextField
          id={event._id}
          onChange={(e)=>this.handleTextChange(event, 'contactName', e.target.value)}
          defaultValue={event.contactName}
        />
        <TextField
          id={event._id}
          value={event.contactNumber}
          onChange={(e)=>this.handleTextChange(event, 'contactNumber', e.target.value)}
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
                justifyItems: 'center'
              }}
            >
              <Typography variant='body1' gutterBottom={true}><b>Date</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Title</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Description</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Start Time</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>End Time</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Cover Image</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Location</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Address</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Contact Name</b></Typography>
              <Typography variant='body1' gutterBottom={true}><b>Contact Number</b></Typography>
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
  getEvents: () => dispatch(getEvents()),
  updateEvent: event => dispatch(updateEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)