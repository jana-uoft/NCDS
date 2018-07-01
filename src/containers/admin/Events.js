import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import NumberFormat from 'react-number-format';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UnsavedConfirmation from '../../components/admin/UnsavedConfirmation';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import Button from '@material-ui/core/Button';

import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/events';



const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
const newEvent = {
  "startTime": new Date(Date.now()).toISOString(),
  "endTime": new Date(Date.now()).toISOString(),
  "title": "",
  "description": "",
  "date": new Date(Date.now()).toISOString(),
  "coverImage": defaultCoverImage,
  "contactName": "",
  "contactNumber": "",
  "location": "",
  "address": ""
}

class Event extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null
    }
  }

  componentDidMount = () => {
    this.props.getEvents()
    .then(()=>this.setState({selectedEvent: this.props.events[0]}))
  }

  handleTextChange = (field, value) => {
    this.setState({selectedEvent: {...this.state.selectedEvent, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedEvent: {...this.state.selectedEvent, [field]: date.toISOString() }})
  }

  selectEvent = (selectedEvent) => {
    if (this.state.editMode){
      this.unsavedConfirmationSave = () => {
        this.saveEvent()
        this.setState({selectedEvent, editMode: false, unsavedConfirmation: false})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedEvent,  editMode: false, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedEvent})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewEvent = () => {
    if (this.state.editMode){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedEvent: {...newEvent}, editMode: true, unsavedConfirmation: false}, ()=>this.saveEvent())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedEvent: {...newEvent}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedEvent: {...newEvent}, editMode: true})
    }
  }

  cancelNewEvent = () => {
    this.unsavedConfirmationSave = () => {
      this.setState({selectedEvent: this.props.events[0], editMode: false, unsavedConfirmation: false}, ()=>this.saveEvent())
    }
    this.unsavedConfirmationDiscard = () => {
      this.setState({selectedEvent: this.props.events[0],  editMode: false, unsavedConfirmation: false})
    }
    this.setState({unsavedConfirmation: true})
  }

  handleSearch = (value) => {
  }

  deleteEvent = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteEvent(this.state.selectedEvent._id)
        .then(()=>this.setState({selectedEvent: this.props.events[0]}))
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = () => {
    if (this.state.editMode){
      this.saveEvent();
      this.setState({editMode: false})
    } else {
      this.setState({editMode: true})
    }
  }

  saveEvent = () => {
    if (this.state.selectedEvent.hasOwnProperty('_id')){
      this.props.updateEvent({...this.state.selectedEvent})
      .then(()=>this.setState({editMode: false}))
    } else {
      this.props.createEvent(this.state.selectedEvent)
      .then(()=>this.setState({editMode: false, selectedEvent: this.props.events[0]}))
    }
  }

  checkValidation = () => {
    const dateEmpty = this.state.selectedEvent.date==="";
    const titleEmpty = this.state.selectedEvent.title==="";
    const descriptionEmpty = this.state.selectedEvent.description==="";
    const startTimeEmpty = this.state.selectedEvent.startTime==="";
    const endTimeEmpty = this.state.selectedEvent.endTime==="";
    const contactNameEmpty = this.state.selectedEvent.contactName==="";
    const contactNumberEmpty = this.state.selectedEvent.contactNumber==="";
    return dateEmpty || titleEmpty || descriptionEmpty || startTimeEmpty || endTimeEmpty || contactNameEmpty || contactNumberEmpty
  }

  renderEvent = () => {
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
              value={new Date(this.state.selectedEvent.date)}
              onChange={date => this.handleDateChange('date', date)}
              animateYearScrolling={true}
              format="DD/MM/YYYY"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
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
              id={this.state.selectedEvent._id}
              onChange={(e)=>this.handleTextChange('title', e.target.value)}
              value={this.state.selectedEvent.title}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedEvent.title===""}
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
              id={this.state.selectedEvent._id}
              onChange={(e)=>this.handleTextChange('description', e.target.value)}
              value={this.state.selectedEvent.description}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedEvent.description===""}
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
              value={new Date(this.state.selectedEvent.startTime)}
              onChange={time => this.handleDateChange('startTime', time)}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
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
              value={new Date(this.state.selectedEvent.endTime)}
              onChange={time => this.handleDateChange('endTime', time)}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
            />
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
              id={this.state.selectedEvent._id}
              onChange={(e)=>this.handleTextChange('location', e.target.value)}
              value={this.state.selectedEvent.location}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
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
              id={this.state.selectedEvent._id}
              onChange={(e)=>this.handleTextChange('address', e.target.value)}
              value={this.state.selectedEvent.address}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
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
              id={this.state.selectedEvent._id}
              onChange={(e)=>this.handleTextChange('contactName', e.target.value)}
              value={this.state.selectedEvent.contactName}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedEvent.contactName===""}
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
              id={this.state.selectedEvent._id+"contactNumber"}
              InputProps={{
                inputComponent: ({inputRef, ...other}) => (
                  <NumberFormat
                    {...other}
                    ref={inputRef}
                    format="+1 (###) ###-####"
                    mask="_"
                    onValueChange={(values) => this.handleTextChange('contactNumber', values.value)}
                    value={this.state.selectedEvent.contactNumber}
                  />
                )
              }}
              autoFocus={this.state.lastEditedField==='contactNumber'}
              disabled={!this.state.editMode || this.props.loading}
              style={{paddingRight: 20}}
              error={this.state.selectedEvent.contactNumber===""}
            />
          </div>
          <br/>
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
              <img src={this.state.selectedEvent.coverImage} alt={this.state.selectedEvent.title} style={{width: '50%', maxHeight: 150}}/>
              <Button variant="contained" style={{marginLeft: 20}} color="primary" disabled={!this.state.editMode || this.state.selectedEvent.coverImage!==defaultCoverImage}>Add New Image</Button>
              <Button variant="contained" style={{marginRight: 20}} color="primary" disabled={!this.state.editMode || this.state.selectedEvent.coverImage===defaultCoverImage}>Delete Image</Button>
            </div>
          </div>
          <br/>
          {!this.state.selectedEvent.hasOwnProperty('_id') &&
            <div style={{
              display: 'grid',
              gridGap: 20,
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              alignItems: 'center'
            }}>
              <Button
                variant="contained"
                style={{marginLeft: 20}}
                color="secondary"
                disabled={this.state.loading}
                onClick={this.cancelNewEvent}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{marginLeft: 20}}
                color="primary"
                disabled={this.state.loading || this.checkValidation()}
                onClick={this.saveEvent}
              >
                Save
              </Button>
            </div>
          }
          <br/>
      </Paper>
    )
  }


  render() {
    if (this.props.loading) return <Loading />

    return (
      <div>
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <List component="nav">
            <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '2fr 2fr'}}>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="primary"
                disabled={this.state.loading}
                onClick={this.addNewEvent}
              >
                Add New
              </Button>
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
                style={{background: this.state.selectedEvent && this.state.selectedEvent._id===event._id ? 'mediumseagreen' : ''}}
                disabled={this.state.selectedEvent && this.state.selectedEvent._id===event._id}
              >
                <ListItemText primary={event.title} secondary={event.date.slice(0, 10)} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Toggle Edit/Save"
                    disabled={this.state.selectedEvent && this.state.selectedEvent._id!==event._id}
                    onClick={this.toggleEditMode}
                    color='primary'
                  >
                    {this.state.editMode && this.state.selectedEvent && this.state.selectedEvent._id===event._id ? <SaveIcon/> : <EditIcon/>}
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    disabled={this.state.selectedEvent && this.state.selectedEvent._id!==event._id}
                    onClick={this.deleteEvent}
                    color='secondary'
                  >
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
          {this.state.selectedEvent && this.renderEvent()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
        />
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
  createEvent: event => dispatch(createEvent(event)),
  updateEvent: event => dispatch(updateEvent(event)),
  deleteEvent: eventID => dispatch(deleteEvent(eventID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)