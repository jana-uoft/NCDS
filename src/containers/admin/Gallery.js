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

import { getGalleries, createGallery, updateGallery, deleteGallery } from '../../actions/galleries';
import { uploadImagesByTags, deleteImagesByTag, deleteImagesByURLs } from '../../actions/imageManager';


const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
const newGallery = {
  "title": "",
  "description": "",
  "date": new Date(Date.now()).toISOString(),
  "coverImage": defaultCoverImage,
  "location": "",
  "type": "",
  "images": []
}

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGallery: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null,
      openManageImages: false
    }
  }

  componentDidMount = () => {
    this.props.getGalleries()
    .then(()=>{
      if (this.props.galleries.length===0)
        this.setState({selectedGallery: {...newGallery}, editMode: true})
      else
        this.setState({selectedGallery: this.props.galleries[0]})
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.galleries, this.props.galleries)) {
      if (prevState.selectedGallery && prevState.selectedGallery.hasOwnProperty('_id')) {
        const selectedGalleryID = prevState.selectedGallery._id
        const updatedSelectedGallery = this.props.galleries.find(gallery=>gallery._id===selectedGalleryID)
        this.setState({selectedGallery: {...updatedSelectedGallery}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedGallery: {...this.state.selectedGallery, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedGallery: {...this.state.selectedGallery, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectGallery = (selectedGallery) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.saveGallery()
        this.setState({selectedGallery, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedGallery, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedGallery, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewGallery = () => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedGallery: {...newGallery}, editMode: true, unsavedConfirmation: false}, ()=>this.saveGallery())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedGallery: {...newGallery}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedGallery: {...newGallery}, editMode: true})
    }
  }

  cancelNewGallery = () => {
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedGallery: this.props.galleries[0], editMode: false, unsavedConfirmation: false, lastEditedField: null}, ()=>this.saveGallery())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedGallery: this.props.galleries[0], editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedGallery: this.props.galleries[0], editMode: false, lastEditedField: null})
    }
  }


  deleteGallery = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteGallery(this.state.selectedGallery._id)
        .then(()=>{
          if (this.props.galleries.length===0)
            this.setState({selectedGallery: {...newGallery}, lastEditedField: null, editMode: true})
          else
            this.setState({selectedGallery: this.props.galleries[0], lastEditedField: null, editMode: false})
        })
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = (gallery) => {
    if (this.state.editMode){
      if (this.state.lastEditedField) this.saveGallery()
      this.setState({editMode: false})
    } else {
      if (!isEqual(this.state.selectedGallery, gallery))
        this.setState({editMode: true, selectedGallery: {...gallery}})
      else
        this.setState({editMode: true})
    }
  }

  saveGallery = () => {
    if (this.state.selectedGallery.hasOwnProperty('_id')){
      this.props.updateGallery({...this.state.selectedGallery})
      .then(()=>this.setState({editMode: false, lastEditedField: null}))
    } else {
      this.props.createGallery(this.state.selectedGallery)
      .then(()=>this.setState({editMode: false, selectedGallery: this.props.galleries[0], lastEditedField: null}))
    }
  }

  checkValidation = () => {
    const dateEmpty = this.state.selectedGallery.date==="";
    const titleEmpty = this.state.selectedGallery.title==="";
    const descriptionEmpty = this.state.selectedGallery.description==="";
    const typeEmpty = this.state.selectedGallery.type==="";
    return dateEmpty || titleEmpty || descriptionEmpty || typeEmpty;
  }

  addNewImages = (files, imageManager=false) => {
    let filesToUpload = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filesToUpload.push({file: reader.result, tags: [this.state.selectedGallery._id, 'gallery']});
        if (files.length===filesToUpload.length){
          this.props.uploadImagesByTags(filesToUpload)
          .then(data=>{
            if (!imageManager) {
              let coverImage = data.payload.data[0].secure_url;
              let selectedGallery = {...this.state.selectedGallery, coverImage}
              this.props.updateGallery(selectedGallery)
            } else {
              let newImages = data.payload.data.map(img=>img.secure_url);
              let selectedGallery = {...this.state.selectedGallery, images: [...this.state.selectedGallery.images, ...newImages]}
              this.props.updateGallery(selectedGallery)
            }
          })
        }
      }
    }
  }

  deleteImagesByTag = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false, selectedGallery: {...this.state.selectedGallery, coverImage: defaultCoverImage}}, ()=>{
        this.props.deleteImagesByTag(this.state.selectedGallery._id)
        this.props.updateGallery({...this.state.selectedGallery})
      })
    }
    this.setState({deleteConfirmation: true})
  }

  deleteImagesByURLs = (images) => {
    this.deleteConfirmationProceed = () => {
      let updatedImages = this.state.selectedGallery.images.filter(img=>!images.includes(img))
      let selectedGallery = {...this.state.selectedGallery, images: updatedImages}
      this.setState({deleteConfirmation: false, selectedGallery}, ()=>{
        this.props.deleteImagesByURLs(images)
        this.props.updateGallery({...selectedGallery})
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


  renderGallery = () => {
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
              value={new Date(this.state.selectedGallery.date)}
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
              id={this.state.selectedGallery._id}
              onChange={(e)=>this.handleTextChange('title', e.target.value)}
              value={this.state.selectedGallery.title}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedGallery.title===""}
              helperText={this.state.selectedGallery.title==="" ? "Required" : null}
            />
          </div>
          <div style={{
            display: 'grid',
            gridGap: 20,
            gridTemplateColumns: '1fr 3fr',
            alignItems: 'center'
          }}>
            <div style={{padding: 20, justifySelf: 'center'}}>
              <Typography variant='subheading'>Type</Typography>
            </div>
            <TextField
              id={this.state.selectedGallery._id}
              onChange={(e)=>this.handleTextChange('type', e.target.value)}
              value={this.state.selectedGallery.type}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedGallery.type===""}
              helperText={this.state.selectedGallery.type==="" ? "Required" : null}
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
              id={this.state.selectedGallery._id}
              onChange={(e)=>this.handleTextChange('description', e.target.value)}
              value={this.state.selectedGallery.description}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedGallery.description===""}
              helperText={this.state.selectedGallery.description==="" ? "Required" : null}
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
              id={this.state.selectedGallery._id}
              onChange={(e)=>this.handleTextChange('location', e.target.value)}
              value={this.state.selectedGallery.location}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
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
              <img src={this.state.selectedGallery.coverImage} alt={this.state.selectedGallery.title} style={{width: '50%', maxHeight: 150}}/>
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedGallery.coverImage!==defaultCoverImage || (this.state.selectedGallery && !this.state.selectedGallery.hasOwnProperty('_id'))}
                onClick={()=>{document.getElementById('selectedFile').click()}}
              >
                Add New Image
              </Button>
              <input id="selectedFile" type="file" accept="image/*" style={{display: 'none'}} onChange={(gallery)=>this.addNewImages(gallery.target.files)}></input>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="secondary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedGallery.coverImage===defaultCoverImage}
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
              disabled={!this.state.editMode || (this.state.selectedGallery && !this.state.selectedGallery.hasOwnProperty('_id'))}
              onClick={this.openManageImages}
            >
              Manage Images
            </Button>
          </div>
          <br/>
      </Paper>
    )
  }

  checkIfCurrentGallery = gallery => this.state.selectedGallery && this.state.selectedGallery._id===gallery._id
  checkIfNotCurrentGallery = gallery => this.state.selectedGallery && this.state.selectedGallery._id!==gallery._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <div>
            {this.state.selectedGallery && this.state.selectedGallery.hasOwnProperty('_id') &&
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || (this.state.selectedGallery && !this.state.selectedGallery.hasOwnProperty('_id'))}
                onClick={this.addNewGallery}
                fullWidth
              >
                Create New Gallery
              </Button>
            }
            {this.state.selectedGallery && !this.state.selectedGallery.hasOwnProperty('_id') &&
              <div style={{
                display: 'grid',
                gridGap: 20,
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                alignItems: 'center'
              }}>
                <Button
                  color="secondary"
                  disabled={this.props.loading}
                  onClick={this.cancelNewGallery}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={this.props.loading || this.checkValidation()}
                  onClick={this.saveGallery}
                >
                  Save
                </Button>
              </div>
            }
              <br/>
              <br/>
              <List style={{height: '82vh', overflowY: 'scroll'}}>
              {this.props.galleries.map((gallery, idx)=>
                <ListItem
                  key={idx}
                  button
                  onClick={()=>!this.checkIfCurrentGallery(gallery) && this.selectGallery(gallery)}
                  style={this.checkIfCurrentGallery(gallery) ? {background: '#a18be6'} : {}}
                  disabled={this.props.loading}
                >
                  <ListItemText
                    secondary={
                      <Typography
                      variant="body2"
                      style={this.checkIfCurrentGallery(gallery) ? {color: 'white'} : {}}
                    >
                      {gallery.date.slice(0, 10)}
                    </Typography>
                    }
                    primary={
                      <Typography
                        variant="subheading"
                        style={this.checkIfCurrentGallery(gallery) ? {color: 'white'} : {}}
                      >
                        {gallery.title.length > 30 ? gallery.title.slice(0, 30)+'...' : gallery.title}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Toggle Edit/Save"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentGallery(gallery) || (this.checkIfCurrentGallery(gallery) && this.checkValidation()))}
                      onClick={()=>this.toggleEditMode(gallery)}
                      color='primary'
                    >
                      {this.state.editMode && this.checkIfCurrentGallery(gallery) ? <SaveIcon/> : <EditIcon/>}
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      disabled={(this.state.editMode || this.state.lastEditedField) && (this.props.loading || this.checkIfNotCurrentGallery(gallery))}
                      onClick={this.deleteGallery}
                      color='secondary'
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </div>
          {this.state.selectedGallery && Object.keys(this.state.selectedGallery).length !== 0 && this.renderGallery()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedGallery && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedGallery && this.checkValidation()}
        />
        {this.state.selectedGallery && Object.keys(this.state.selectedGallery).length !== 0 &&
          <ManageImages
            open={this.state.openManageImages}
            handleClickOpen={this.openManageImages}
            handleClose={this.closeManageImages}
            selected={this.state.selectedGallery}
            updateSelected={this.props.updateGallery}
            title={this.state.selectedGallery && `Managing Images for ${this.state.selectedGallery.title}`}
            tags={this.state.selectedGallery && [this.state.selectedGallery._id, 'gallery']}
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
  galleries: state.galleries
})

const mapDispatchToProps = dispatch => ({
  getGalleries: () => dispatch(getGalleries()),
  createGallery: gallery => dispatch(createGallery(gallery)),
  updateGallery: gallery => dispatch(updateGallery(gallery)),
  deleteGallery: galleryID => dispatch(deleteGallery(galleryID)),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByTag: galleryID => dispatch(deleteImagesByTag(galleryID)),
  deleteImagesByURLs : urls => dispatch(deleteImagesByURLs(urls))
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)