import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { DatePicker } from 'material-ui-pickers';
import Loading from '../../components/global/Loading';
import UnsavedConfirmation from '../../components/admin/UnsavedConfirmation';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import ManageImages from '../../components/admin/ManageImages';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { getPublications, createPublication, updatePublication, deletePublication } from '../../actions/publications';
import { uploadImagesByTags, deleteImagesByTag, deleteImagesByURLs } from '../../actions/imageManager';


const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
const newPublication = {
  "title": "",
  "description": "",
  "date": new Date(Date.now()).toISOString(),
  "coverImage": defaultCoverImage,
  "images": []
}

class Publication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPublication: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null,
      openManageImages: false
    }
  }

  componentDidMount = () => {
    this.props.getPublications()
    .then(()=>{
      if (this.props.publications.length===0)
        this.setState({selectedPublication: {...newPublication}, editMode: false})
      else
        this.setState({selectedPublication: this.props.publications[0]})
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.publications, this.props.publications)) {
      if (prevState.selectedPublication && prevState.selectedPublication.hasOwnProperty('_id')) {
        const selectedPublicationID = prevState.selectedPublication._id
        const updatedSelectedPublication = this.props.publications.find(publication=>publication._id===selectedPublicationID)
        this.setState({selectedPublication: {...updatedSelectedPublication}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedPublication: {...this.state.selectedPublication, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedPublication: {...this.state.selectedPublication, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectPublication = (selectedPublication) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.savePublication()
        this.setState({selectedPublication, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedPublication, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedPublication, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewPublication = () => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedPublication: {...newPublication}, editMode: true, unsavedConfirmation: false}, ()=>this.savePublication())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedPublication: {...newPublication}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedPublication: {...newPublication}, editMode: true})
    }
  }

  cancelNewPublication = () => {
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedPublication: this.props.publications[0], editMode: false, unsavedConfirmation: false, lastEditedField: null}, ()=>this.savePublication())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedPublication: this.props.publications[0], editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedPublication: this.props.publications[0], editMode: false, lastEditedField: null})
    }
  }


  deletePublication = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deletePublication(this.state.selectedPublication._id)
        .then(()=>{
          if (this.props.publications.length===0)
            this.setState({selectedPublication: {...newPublication}, lastEditedField: null, editMode: true})
          else
            this.setState({selectedPublication: this.props.publications[0], lastEditedField: null, editMode: false})
        })
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = (publication) => {
    if (this.state.editMode){
      if (this.state.lastEditedField)
        this.savePublication();
      this.setState({editMode: false})
    } else {
      if (!isEqual(this.state.selectedPublication, publication))
        this.setState({editMode: true, selectedPublication: {...publication}})
      else
        this.setState({editMode: true})
    }
  }

  savePublication = () => {
    if (this.state.selectedPublication.hasOwnProperty('_id')){
      this.props.updatePublication({...this.state.selectedPublication})
      .then(()=>this.setState({editMode: false, lastEditedField: null}))
    } else {
      this.props.createPublication(this.state.selectedPublication)
      .then(()=>this.setState({editMode: false, selectedPublication: this.props.publications[0], lastEditedField: null}))
    }
  }

  checkValidation = () => {
    const dateEmpty = this.state.selectedPublication.date==="";
    const titleEmpty = this.state.selectedPublication.title==="";
    const descriptionEmpty = this.state.selectedPublication.description==="";
    return dateEmpty || titleEmpty || descriptionEmpty
  }

  addNewImages = (files, imageManager=false) => {
    let filesToUpload = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filesToUpload.push({file: reader.result, tags: [this.state.selectedPublication._id, 'publication']});
        if (files.length===filesToUpload.length){
          this.props.uploadImagesByTags(filesToUpload)
          .then(data=>{
            if (!imageManager) {
              let coverImage = data.payload.data[0].secure_url;
              let selectedPublication = {...this.state.selectedPublication, coverImage}
              this.props.updatePublication(selectedPublication)
            } else {
              let newImages = data.payload.data.map(img=>img.secure_url);
              let selectedPublication = {...this.state.selectedPublication, images: [...this.state.selectedPublication.images, ...newImages]}
              this.props.updatePublication(selectedPublication)
            }
          })
        }
      }
    }
  }

  deleteImagesByTag = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false, selectedPublication: {...this.state.selectedPublication, coverImage: defaultCoverImage}}, ()=>{
        this.props.deleteImagesByTag(this.state.selectedPublication._id)
        this.props.updatePublication({...this.state.selectedPublication})
      })
    }
    this.setState({deleteConfirmation: true})
  }

  deleteImagesByURLs = (images) => {
    this.deleteConfirmationProceed = () => {
      let updatedImages = this.state.selectedPublication.images.filter(img=>!images.includes(img))
      let selectedPublication = {...this.state.selectedPublication, images: updatedImages}
      this.setState({deleteConfirmation: false, selectedPublication}, ()=>{
        this.props.deleteImagesByURLs(images)
        this.props.updatePublication({...selectedPublication})
      })
    }
    this.setState({deleteConfirmation: true})
  }

  openManageImages = () => {
    this.setState({ openManageImages: true });
  };

  closeManageImages = () => {
    this.setState({ openManageImages: false });
  };


  renderPublication = () => {
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
              value={new Date(this.state.selectedPublication.date)}
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
              id={this.state.selectedPublication._id}
              onChange={(e)=>this.handleTextChange('title', e.target.value)}
              value={this.state.selectedPublication.title}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedPublication.title===""}
              helperText={this.state.selectedPublication.title==="" ? "Required" : null}
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
              id={this.state.selectedPublication._id}
              onChange={(e)=>this.handleTextChange('description', e.target.value)}
              value={this.state.selectedPublication.description}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedPublication.description===""}
              helperText={this.state.selectedPublication.description==="" ? "Required" : null}
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
              alignItems: 'center',
              justifyItems: 'center'
            }}>
              <img src={this.state.selectedPublication.coverImage} alt={this.state.selectedPublication.title} style={{width: '50%', maxHeight: 150}}/>
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedPublication.coverImage!==defaultCoverImage || (this.state.selectedPublication && !this.state.selectedPublication.hasOwnProperty('_id'))}
                onClick={()=>{document.getElementById('selectedFile').click()}}
              >
                Add New Image
              </Button>
              <input id="selectedFile" type="file" accept="image/*" style={{display: 'none'}} onChange={(publication)=>this.addNewImages(publication.target.files)}></input>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="secondary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedPublication.coverImage===defaultCoverImage}
                onClick={this.deleteImagesByTag}
              >
                Delete Image
              </Button>
            </div>
          </div>
          <br/><br/>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{justifySelf: 'center'}}>
              <Typography variant='subheading'>Images</Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{marginRight: 20}}
              disabled={!this.state.editMode || (this.state.selectedPublication && !this.state.selectedPublication.hasOwnProperty('_id'))}
              onClick={this.openManageImages}
            >
              Manage Images
            </Button>
          </div>
          <br/>
      </Paper>
    )
  }

  checkIfCurrentPublication = publication => this.state.selectedPublication && this.state.selectedPublication._id===publication._id
  checkIfNotCurrentPublication = publication => this.state.selectedPublication && this.state.selectedPublication._id!==publication._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <div>
            {this.state.selectedPublication && this.state.selectedPublication.hasOwnProperty('_id') &&
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || (this.state.selectedPublication && !this.state.selectedPublication.hasOwnProperty('_id'))}
                onClick={this.addNewPublication}
                fullWidth
              >
                Create New Publication
              </Button>
            }
            {this.state.selectedPublication && !this.state.selectedPublication.hasOwnProperty('_id') &&
              <div style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                alignItems: 'center'
              }}>
                <Button
                  color="secondary"
                  disabled={this.props.loading}
                  onClick={this.cancelNewPublication}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.loading || this.checkValidation()}
                  onClick={this.savePublication}
                >
                  Save
                </Button>
              </div>
            }
              <br/>
              <br/>
              <List style={{height: '82vh', overflowY: 'scroll'}}>
              {this.props.publications.map((publication, idx)=>
                <ListItem
                  key={idx}
                  button
                  onClick={()=>!this.checkIfCurrentPublication(publication) && this.selectPublication(publication)}
                  style={this.checkIfCurrentPublication(publication) ? {background: '#a18be6'} : {}}
                  disabled={this.props.loading}
                >
                  <ListItemText
                    secondary={
                      <Typography
                      variant="body2"
                      style={this.checkIfCurrentPublication(publication) ? {color: 'white'} : {}}
                    >
                      {publication.date.slice(0, 10)}
                    </Typography>
                    }
                    primary={
                      <Typography
                        variant="subheading"
                        style={this.checkIfCurrentPublication(publication) ? {color: 'white'} : {}}
                      >
                        {publication.title.length > 30 ? publication.title.slice(0, 30)+'...' : publication.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Toggle Edit/Save"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentPublication(publication) || (this.checkIfCurrentPublication(publication) && this.checkValidation()))}
                      onClick={()=>this.toggleEditMode(publication)}
                      color='primary'
                    >
                      {this.state.editMode && this.checkIfCurrentPublication(publication) ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentPublication(publication))}
                      onClick={this.deletePublication}
                      color='secondary'
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
          {this.state.selectedPublication && Object.keys(this.state.selectedPublication).length !== 0 && this.renderPublication()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedPublication && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedPublication && this.checkValidation()}
        />
        {this.state.selectedPublication && Object.keys(this.state.selectedPublication).length !== 0 &&
          <ManageImages
            open={this.state.openManageImages}
            handleClickOpen={this.openManageImages}
            handleClose={this.closeManageImages}
            selected={this.state.selectedPublication}
            updateSelected={this.props.updatePublication}
            title={this.state.selectedPublication && `Managing Images for ${this.state.selectedPublication.title}`}
            tags={this.state.selectedPublication && [this.state.selectedPublication._id, 'publication']}
            loading={this.props.loading}
            addNewImages={this.addNewImages}
            deleteImages={this.deleteImagesByURLs}
          />
        }

      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  publications: state.publications
})

const mapDispatchToProps = dispatch => ({
  getPublications: () => dispatch(getPublications()),
  createPublication: publication => dispatch(createPublication(publication)),
  updatePublication: publication => dispatch(updatePublication(publication)),
  deletePublication: publicationID => dispatch(deletePublication(publicationID)),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByTag: publicationID => dispatch(deleteImagesByTag(publicationID)),
  deleteImagesByURLs : urls => dispatch(deleteImagesByURLs(urls))
})

export default connect(mapStateToProps, mapDispatchToProps)(Publication)