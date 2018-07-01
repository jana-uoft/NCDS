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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { isEqual } from 'lodash';

const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: null
    }
  }

  componentDidMount = () => {
    this.props.getEvents()
    .then(()=>this.setState({selectedEvent: this.props.events[0]}))
  }

  handleTextChange = (event, field, value) => {
    // this.props.updateEvent({...event, [field]: value})
  }

  handleDateChange = (event, field, date) => {
    // this.props.updateEvent({...event, [field]: date.toISOString()})
  }

  selectImage = (event) => {
    console.log('SELECT MDEIA');

  }

  renderEvent = () => {
    let event = {...this.state.selectedEvent}
    if (!event){
      event = {
        "startTime": Date.now(),
        "endTime": Date.now(),
        "title": "",
        "description": "",
        "date": Date.now(),
        "coverImage": defaultCoverImage,
        "contactName": "",
        "contactNumber": "",
        "location": "",
        "address": "",
      }
    }
    return (
      <Paper
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center'
        }}
      >
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Date</Typography>
          </div>
          <DatePicker
            autoOk
            showTodayButton
            value={new Date(event.date)}
            onChange={date => this.handleDateChange(event, 'date', date)}
            animateYearScrolling={true}
            format="DD/MM/YYYY"
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Title</Typography>
          </div>
          <TextField
            id={event._id}
            onChange={(e)=>this.handleTextChange(event, 'title', e.target.value)}
            defaultValue={event.title}
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Description</Typography>
          </div>
          <TextField
            id={event._id}
            onChange={(e)=>this.handleTextChange(event, 'description', e.target.value)}
            defaultValue={event.description}
            multiline
            rowsMax="15"
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Start Time</Typography>
          </div>
          <TimePicker
            autoOk
            showTodayButton
            todayLabel="now"
            value={new Date(event.startTime)}
            onChange={time => this.handleDateChange(event, 'startTime', time)}
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>End Time</Typography>
          </div>
          <TimePicker
            autoOk
            showTodayButton
            todayLabel="now"
            value={new Date(event.endTime)}
            onChange={time => this.handleDateChange(event, 'endTime', time)}
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Cover Image</Typography>
          </div>
          <div style={{
            display: 'grid',
            gridGap: 10,
            gridTemplateColumns: '2fr 1fr 1fr',
            alignItems: 'center'
          }}>
            <img src={event.coverImage} alt={event.title} style={{width: '50%'}}/>
            <Button variant="contained" style={{marginLeft: 20}} color="primary" disabled={event.coverImage!==defaultCoverImage}>Add New Image</Button>
            <Button variant="contained" style={{marginRight: 20}} color="primary" disabled={event.coverImage===defaultCoverImage}>Delete Image</Button>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Location</Typography>
          </div>
          <TextField
            id={event._id}
            onChange={(e)=>this.handleTextChange(event, 'location', e.target.value)}
            defaultValue={event.location}
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Address</Typography>
          </div>
          <TextField
            id={event._id}
            onChange={(e)=>this.handleTextChange(event, 'address', e.target.value)}
            defaultValue={event.address}
            multiline
            rowsMax="15"
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Contact Name</Typography>
          </div>
          <TextField
            id={event._id}
            onChange={(e)=>this.handleTextChange(event, 'contactName', e.target.value)}
            defaultValue={event.contactName}
            style={{paddingRight: 20}}
          />
        </div>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 3fr',
          alignItems: 'center'
        }}>
          <div style={{padding: 20, justifySelf: 'center'}}>
            <Typography variant='subheading'>Contact Number</Typography>
          </div>
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
            style={{paddingRight: 20}}
          />
        </div>
        <br/>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          alignItems: 'center'
        }}>
          <Button variant="contained" style={{marginLeft: 20}} color="primary" disabled={this.state.loading}>Update</Button>
          <Button variant="contained" style={{marginRight: 20}} color="secondary" disabled={this.state.loading}>Delete</Button>
        </div>
        <br/>
      </Paper>
    )
  }

  selectEvent = (selectedEvent) => this.setState({selectedEvent})

  handleSearch = (value) => {

  }

  render() {
    if (this.props.loading) return <Loading />

    return (
      <div>
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <List component="nav">
            <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '2fr 2fr'}}>
              <Button variant="contained" style={{marginRight: 20}} color="primary" disabled={this.state.loading}>Add New</Button>
              <TextField
                onChange={(e)=>this.handleSearch(e.target.value)}
                placeholder="Search Events"
              />
            </div>
            <br/>
            {this.props.events.map((event, idx)=>
              <ListItem
                key={idx}
                button
                divider
                onClick={()=>this.selectEvent(event)}
                style={{background: this.state.selectedEvent && this.state.selectedEvent._id===event._id ? 'mediumseagreen' : ''}}>
                <ListItemText primary={event.title} secondary={event.description} />
              </ListItem>
            )}
          </List>
          {this.renderEvent()}
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