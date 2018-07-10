import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { DatePicker } from 'material-ui-pickers';
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

import { getObituaries, createObituary, updateObituary, deleteObituary } from '../../actions/obituaries';
import { uploadImagesByTags, deleteImagesByTag } from '../../actions/imageManager';


const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
const newObituary = {
  "name": "",
  "description": "",
  "birthDate": new Date(Date.now()).toISOString(),
  "deathDate": new Date(Date.now()).toISOString(),
  "coverImage": defaultCoverImage,
  "contactName": "",
  "contactNumber": "",
}

class Obituary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedObituary: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null
    }
  }

  componentDidMount = () => {
    this.props.getObituaries()
    .then(()=>{
      if (this.props.obituaries.length===0)
        this.setState({selectedObituary: {...newObituary}, editMode: true})
      else
        this.setState({selectedObituary: this.props.obituaries[0]})
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.obituaries, this.props.obituaries)) {
      if (prevState.selectedObituary && prevState.selectedObituary.hasOwnProperty('_id')) {
        const selectedObituaryID = prevState.selectedObituary._id
        const updatedSelectedObituary = this.props.obituaries.find(obituary=>obituary._id===selectedObituaryID)
        this.setState({selectedObituary: {...updatedSelectedObituary}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedObituary: {...this.state.selectedObituary, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedObituary: {...this.state.selectedObituary, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectObituary = (selectedObituary) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.saveObituary()
        this.setState({selectedObituary, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedObituary, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedObituary, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewObituary = () => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedObituary: {...newObituary}, editMode: true, unsavedConfirmation: false}, ()=>this.saveObituary())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedObituary: {...newObituary}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedObituary: {...newObituary}, editMode: true})
    }
  }

  cancelNewObituary = () => {
    const editMode = this.props.obituaries.length===0
    const selectedObituary = this.props.obituaries.length===0 ? {...newObituary} : this.props.obituaries[0]
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedObituary, editMode, unsavedConfirmation: false, lastEditedField: null}, ()=>this.saveObituary())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedObituary, editMode, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedObituary, editMode, lastEditedField: null})
    }
  }


  deleteObituary = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteObituary(this.state.selectedObituary._id)
        .then(()=>{
          if (this.props.obituaries.length===0)
            this.setState({selectedObituary: {...newObituary}, lastEditedField: null, editMode: true})
          else
            this.setState({selectedObituary: this.props.obituaries[0], lastEditedField: null, editMode: false})
        })
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = (obituary) => {
    if (this.state.editMode){
      if (this.state.lastEditedField)
        this.saveObituary();
      this.setState({editMode: false})
    } else {
      if (!isEqual(this.state.selectedObituary, obituary))
        this.setState({editMode: true, selectedObituary: {...obituary}})
      else
        this.setState({editMode: true})
    }
  }

  saveObituary = () => {
    if (this.state.selectedObituary.hasOwnProperty('_id')){
      this.props.updateObituary({...this.state.selectedObituary})
      .then(()=>this.setState({editMode: false, lastEditedField: null}))
    } else {
      this.props.createObituary(this.state.selectedObituary)
      .then(()=>this.setState({editMode: false, selectedObituary: this.props.obituaries[0], lastEditedField: null}))
    }
  }

  checkValidation = () => {
    const nameEmpty = this.state.selectedObituary.name==="";
    const descriptionEmpty = this.state.selectedObituary.description==="";
    const contactNameEmpty = this.state.selectedObituary.contactName==="";
    const contactNumberEmpty = this.state.selectedObituary.contactNumber==="";
    return nameEmpty || descriptionEmpty || contactNameEmpty || contactNumberEmpty
  }

  addNewImage = (files) => {
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.props.uploadImagesByTags([{file: reader.result, tags: [this.state.selectedObituary._id, 'obituary']}])
      .then(data=>{
        let coverImage = data.payload.data[0].secure_url;
        let selectedObituary = {...this.state.selectedObituary, coverImage}
        this.props.updateObituary(selectedObituary)
      })
    }
  }

  deleteImage = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteImagesByTag(this.state.selectedObituary._id)
        this.props.updateObituary({...this.state.selectedObituary, coverImage: defaultCoverImage})
      })
    }
    this.setState({deleteConfirmation: true})
  }

  renderObituary = () => {
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
              <Typography variant='subheading'>Name</Typography>
            </div>
            <TextField
              id={this.state.selectedObituary._id}
              onChange={(e)=>this.handleTextChange('name', e.target.value)}
              value={this.state.selectedObituary.name}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedObituary.name===""}
              helperText={this.state.selectedObituary.name==="" ? "Required" : null}
            />
          </div>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>Birth Date</Typography>
            </div>
            <DatePicker
              autoOk
              showTodayButton
              value={new Date(this.state.selectedObituary.birthDate)}
              onChange={birthDate => this.handleDateChange('birthDate', birthDate)}
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
              <Typography variant='subheading'>Death Date</Typography>
            </div>
            <DatePicker
              autoOk
              showTodayButton
              value={new Date(this.state.selectedObituary.deathDate)}
              onChange={deathDate => this.handleDateChange('deathDate', deathDate)}
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
              <Typography variant='subheading'>Description</Typography>
            </div>
            <TextField
              id={this.state.selectedObituary._id}
              onChange={(e)=>this.handleTextChange('description', e.target.value)}
              value={this.state.selectedObituary.description}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedObituary.description===""}
              helperText={this.state.selectedObituary.description==="" ? "Required" : null}
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
              id={this.state.selectedObituary._id}
              onChange={(e)=>this.handleTextChange('contactName', e.target.value)}
              value={this.state.selectedObituary.contactName}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedObituary.contactName===""}
              helperText={this.state.selectedObituary.contactName==="" ? "Required" : null}
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
              id={this.state.selectedObituary._id+"contactNumber"}
              InputProps={{
                inputComponent: ({inputRef, ...other}) => (
                  <NumberFormat
                    {...other}
                    ref={inputRef}
                    format="+1 (###) ###-####"
                    mask="_"
                    onValueChange={(values) => this.handleTextChange('contactNumber', values.formattedValue)}
                    value={this.state.selectedObituary.contactNumber}
                  />
                )
              }}
              autoFocus={this.state.lastEditedField==='contactNumber'}
              disabled={!this.state.editMode || this.props.loading}
              style={{paddingRight: 20}}
              error={this.state.selectedObituary.contactNumber===""}
              helperText={this.state.selectedObituary.contactNumber==="" ? "Required" : null}
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
              <img src={this.state.selectedObituary.coverImage} alt={this.state.selectedObituary.title} style={{width: '50%', maxHeight: 150}}/>
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedObituary.coverImage!==defaultCoverImage || (this.state.selectedObituary && !this.state.selectedObituary.hasOwnProperty('_id'))}
                onClick={()=>{document.getElementById('selectedFile').click()}}
              >
                Add New Image
              </Button>
              <input id="selectedFile" type="file" accept="image/*" style={{display: 'none'}} onChange={(e)=>this.addNewImage(e.target.files)}></input>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="secondary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedObituary.coverImage===defaultCoverImage}
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

  checkIfCurrentObituary = obituary => this.state.selectedObituary && this.state.selectedObituary._id===obituary._id
  checkIfNotCurrentObituary = obituary => this.state.selectedObituary && this.state.selectedObituary._id!==obituary._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <div>
            {this.state.selectedObituary && this.state.selectedObituary.hasOwnProperty('_id') &&
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || (this.state.selectedObituary && !this.state.selectedObituary.hasOwnProperty('_id'))}
                onClick={this.addNewObituary}
                fullWidth
              >
                Create New Obituary
              </Button>
            }
            {this.state.selectedObituary && !this.state.selectedObituary.hasOwnProperty('_id') &&
              <div style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                alignItems: 'center'
              }}>
                <Button
                  color="secondary"
                  disabled={this.props.loading}
                  onClick={this.cancelNewObituary}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.loading || this.checkValidation()}
                  onClick={this.saveObituary}
                >
                  Save
                </Button>
              </div>
            }
              <br/>
              <br/>
              <List style={{height: '82vh', overflowY: 'scroll'}}>
              {this.props.obituaries.map((obituary, idx)=>
                <ListItem
                  key={idx}
                  button
                  onClick={()=>!this.checkIfCurrentObituary(obituary) && this.selectObituary(obituary)}
                  style={this.checkIfCurrentObituary(obituary) ? {background: '#a18be6'} : {}}
                  disabled={this.props.loading}
                >
                  <ListItemText
                    secondary={
                      <Typography
                      variant="body2"
                      style={this.checkIfCurrentObituary(obituary) ? {color: 'white'} : {}}
                    >
                      {obituary.birthDate.slice(0, 10)} to {obituary.deathDate.slice(0, 10)}
                    </Typography>
                    }
                    primary={
                      <Typography
                        variant="subheading"
                        style={this.checkIfCurrentObituary(obituary) ? {color: 'white'} : {}}
                      >
                        {obituary.name.length > 30 ? obituary.name.slice(0, 30)+'...' : obituary.name}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Toggle Edit/Save"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentObituary(obituary) || (this.checkIfCurrentObituary(obituary) && this.checkValidation()))}
                      onClick={()=>this.toggleEditMode(obituary)}
                      color='primary'
                    >
                      {this.state.editMode && this.checkIfCurrentObituary(obituary) ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentObituary(obituary))}
                      onClick={this.deleteObituary}
                      color='secondary'
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
          {this.state.selectedObituary && Object.keys(this.state.selectedObituary).length !== 0 && this.renderObituary()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedObituary && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedObituary && this.checkValidation()}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  obituaries: state.obituaries
})

const mapDispatchToProps = dispatch => ({
  getObituaries: () => dispatch(getObituaries()),
  createObituary: obituary => dispatch(createObituary(obituary)),
  updateObituary: obituary => dispatch(updateObituary(obituary)),
  deleteObituary: obituaryID => dispatch(deleteObituary(obituaryID)).then(()=>dispatch(deleteImagesByTag(obituaryID))),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByTag: obituaryID => dispatch(deleteImagesByTag(obituaryID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Obituary)