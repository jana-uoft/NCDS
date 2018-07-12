import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { DatePicker, TimePicker } from 'material-ui-pickers';
import Loading from '../../components/global/Loading';
import UnsavedConfirmation from '../../components/admin/UnsavedConfirmation';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/events';
import { uploadImagesByTags, deleteImagesByTag } from '../../actions/imageManager';


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
    .then(()=>{
      if (this.props.events.length===0)
        this.setState({selectedEvent: {...newEvent}, editMode: true})
      else
        this.setState({selectedEvent: this.props.events[0]})
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.events, this.props.events)) {
      if (prevState.selectedEvent && prevState.selectedEvent.hasOwnProperty('_id')) {
        const selectedEventID = prevState.selectedEvent._id
        const updatedSelectedEvent = this.props.events.find(event=>event._id===selectedEventID)
        this.setState({selectedEvent: {...updatedSelectedEvent}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedEvent: {...this.state.selectedEvent, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedEvent: {...this.state.selectedEvent, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectEvent = (selectedEvent) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.saveEvent()
        this.setState({selectedEvent, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedEvent, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedEvent, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewEvent = () => {
    if (this.state.editMode && this.state.lastEditedField){
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
    const editMode = this.props.events.length===0
    const selectedEvent = this.props.events.length===0 ? {...newEvent} : this.props.events[0]
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedEvent, editMode, unsavedConfirmation: false, lastEditedField: null}, ()=>this.saveEvent())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedEvent, editMode, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedEvent, editMode, lastEditedField: null})
    }
  }


  deleteEvent = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteEvent(this.state.selectedEvent._id)
        .then(()=>{
          if (this.props.events.length===0)
            this.setState({selectedEvent: {...newEvent}, lastEditedField: null, editMode: true})
          else
            this.setState({selectedEvent: this.props.events[0], lastEditedField: null, editMode: false})
        })
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = (event) => {
    if (this.state.editMode){
      if (this.state.lastEditedField)
        this.saveEvent();
      this.setState({editMode: false})
    } else {
      if (!isEqual(this.state.selectedEvent, event))
        this.setState({editMode: true, selectedEvent: {...event}})
      else
        this.setState({editMode: true})
    }
  }

  saveEvent = () => {
    if (this.state.selectedEvent.hasOwnProperty('_id')){
      this.props.updateEvent({...this.state.selectedEvent})
      .then(()=>this.setState({editMode: false, lastEditedField: null}))
    } else {
      this.props.createEvent(this.state.selectedEvent)
      .then(()=>this.setState({editMode: false, selectedEvent: this.props.events[0], lastEditedField: null}))
    }
  }

  checkValidation = () => {
    const dateEmpty = this.state.selectedEvent.date==="";
    const titleEmpty = this.state.selectedEvent.title==="";
    const startTimeEmpty = this.state.selectedEvent.startTime==="";
    const endTimeEmpty = this.state.selectedEvent.endTime==="";
    const locationEmpty = this.state.selectedEvent.location==="";
    const addressEmpty = this.state.selectedEvent.address==="";
    return dateEmpty || titleEmpty || startTimeEmpty || endTimeEmpty || locationEmpty || addressEmpty
  }

  addNewImage = (files) => {
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.props.uploadImagesByTags([{file: reader.result, tags: [this.state.selectedEvent._id, 'event']}])
      .then(data=>{
        let coverImage = data.payload.data[0].secure_url;
        let selectedEvent = {...this.state.selectedEvent, coverImage}
        this.props.updateEvent(selectedEvent)
      })
    }
  }

  deleteImage = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteImagesByTag(this.state.selectedEvent._id)
        this.props.updateEvent({...this.state.selectedEvent, coverImage: defaultCoverImage})
      })
    }
    this.setState({deleteConfirmation: true})
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
              helperText={this.state.selectedEvent.title==="" ? "Required" : null}
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
              value={Date.parse(this.state.selectedEvent.startTime)}
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
              value={Date.parse(this.state.selectedEvent.endTime)}
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
              error={this.state.selectedEvent.location===""}
              helperText={this.state.selectedEvent.location==="" ? "Required" : null}
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
              error={this.state.selectedEvent.address===""}
              helperText={this.state.selectedEvent.address==="" ? "Required" : null}
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
                    onValueChange={(values) => this.handleTextChange('contactNumber', values.formattedValue)}
                    value={this.state.selectedEvent.contactNumber}
                  />
                )
              }}
              autoFocus={this.state.lastEditedField==='contactNumber'}
              disabled={!this.state.editMode || this.props.loading}
              style={{paddingRight: 20}}
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
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedEvent.coverImage!==defaultCoverImage || (this.state.selectedEvent && !this.state.selectedEvent.hasOwnProperty('_id'))}
                onClick={()=>{document.getElementById('selectedFile').click()}}
              >
                Add New Image
              </Button>
              <input id="selectedFile" type="file" accept="image/*" style={{display: 'none'}} onChange={(event)=>this.addNewImage(event.target.files)}></input>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="secondary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedEvent.coverImage===defaultCoverImage}
                onClick={this.deleteImage}
              >
                Delete Image
              </Button>
            </div>
          </div>
          <br/>
      </Paper>
    )
  }

  checkIfCurrentEvent = event => this.state.selectedEvent && this.state.selectedEvent._id===event._id
  checkIfNotCurrentEvent = event => this.state.selectedEvent && this.state.selectedEvent._id!==event._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <div>
            {this.state.selectedEvent && this.state.selectedEvent.hasOwnProperty('_id') &&
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || (this.state.selectedEvent && !this.state.selectedEvent.hasOwnProperty('_id'))}
                onClick={this.addNewEvent}
                fullWidth
              >
                Create New Event
              </Button>
            }
            {this.state.selectedEvent && !this.state.selectedEvent.hasOwnProperty('_id') &&
              <div style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                alignItems: 'center'
              }}>
                <Button
                  color="secondary"
                  disabled={this.props.loading}
                  onClick={this.cancelNewEvent}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.loading || this.checkValidation()}
                  onClick={this.saveEvent}
                >
                  Save
                </Button>
              </div>
            }
              <br/>
              <br/>
              <List style={{height: '82vh', overflowY: 'scroll'}}>
              {this.props.events.map((event, idx)=>
                <ListItem
                  key={idx}
                  button
                  onClick={()=>!this.checkIfCurrentEvent(event) && this.selectEvent(event)}
                  style={this.checkIfCurrentEvent(event) ? {background: '#a18be6'} : {}}
                  disabled={this.props.loading}
                >
                  <ListItemText
                    secondary={
                      <Typography
                      variant="body2"
                      style={this.checkIfCurrentEvent(event) ? {color: 'white'} : {}}
                    >
                      {event.date.slice(0, 10)}
                    </Typography>
                    }
                    primary={
                      <Typography
                        variant="subheading"
                        style={this.checkIfCurrentEvent(event) ? {color: 'white'} : {}}
                      >
                        {event.title.length > 30 ? event.title.slice(0, 30)+'...' : event.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Toggle Edit/Save"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentEvent(event) || (this.checkIfCurrentEvent(event) && this.checkValidation()))}
                      onClick={()=>this.toggleEditMode(event)}
                      color='primary'
                    >
                      {this.state.editMode && this.checkIfCurrentEvent(event) ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentEvent(event))}
                      onClick={this.deleteEvent}
                      color='secondary'
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
          {this.state.selectedEvent && Object.keys(this.state.selectedEvent).length !== 0 && this.renderEvent()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedEvent && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedEvent && this.checkValidation()}
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
  deleteEvent: eventID => dispatch(deleteEvent(eventID)).then(()=>dispatch(deleteImagesByTag(eventID))),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByTag: eventID => dispatch(deleteImagesByTag(eventID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Event)