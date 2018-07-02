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

import { getContributions, createContribution, updateContribution, deleteContribution } from '../../actions/contributions';
import { uploadImagesByTags, deleteImagesByTag, deleteImagesByURLs } from '../../actions/imageManager';


const defaultCoverImage = "https://res.cloudinary.com/nainativucds/image/upload/v1530461653/website/No-image-available.jpg"
const newContribution = {
  "title": "",
  "description": "",
  "date": new Date(Date.now()).toISOString(),
  "coverImage": defaultCoverImage,
  "location": "",
  "address": "",
  "images": []
}

class Contribution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContribution: null,
      editMode: false,
      unsavedConfirmation: false,
      deleteConfirmation: false,
      lastEditedField: null,
      openManageImages: false
    }
  }

  componentDidMount = () => {
    this.props.getContributions()
    .then(()=>this.setState({selectedContribution: this.props.contributions[0]}))
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps.contributions, this.props.contributions)) {
      if (prevState.selectedContribution && prevState.selectedContribution.hasOwnProperty('_id')) {
        const selectedContributionID = prevState.selectedContribution._id
        const updatedSelectedContribution = this.props.contributions.find(contribution=>contribution._id===selectedContributionID)
        this.setState({selectedContribution: {...updatedSelectedContribution}})
      }
    }
  }

  handleTextChange = (field, value) => {
    this.setState({selectedContribution: {...this.state.selectedContribution, [field]: value }, lastEditedField: field})
  }

  handleDateChange = (field, date) => {
    this.setState({selectedContribution: {...this.state.selectedContribution, [field]: date.toISOString() }, lastEditedField: field})
  }

  selectContribution = (selectedContribution) => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.saveContribution()
        this.setState({selectedContribution, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedContribution, editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedContribution, editMode: false, lastEditedField: null})
    }
  }


  unsavedConfirmationSave = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationDiscard = () => this.setState({unsavedConfirmation: false})
  unsavedConfirmationCancel = () => this.setState({unsavedConfirmation: false})

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  addNewContribution = () => {
    if (this.state.editMode && this.state.lastEditedField){
      this.unsavedConfirmationSave = () => {
        this.setState({selectedContribution: {...newContribution}, editMode: true, unsavedConfirmation: false}, ()=>this.saveContribution())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedContribution: {...newContribution}, editMode: true, unsavedConfirmation: false})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedContribution: {...newContribution}, editMode: true})
    }
  }

  cancelNewContribution = () => {
    if (this.state.editMode && this.state.lastEditedField) {
      this.unsavedConfirmationSave = () => {
        this.setState({selectedContribution: this.props.contributions[0], editMode: false, unsavedConfirmation: false, lastEditedField: null}, ()=>this.saveContribution())
      }
      this.unsavedConfirmationDiscard = () => {
        this.setState({selectedContribution: this.props.contributions[0], editMode: false, unsavedConfirmation: false, lastEditedField: null})
      }
      this.setState({unsavedConfirmation: true})
    } else {
      this.setState({selectedContribution: this.props.contributions[0], editMode: false, lastEditedField: null})
    }
  }


  deleteContribution = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteContribution(this.state.selectedContribution._id)
        .then(()=>this.setState({selectedContribution: this.props.contributions[0], lastEditedField: null}))
      })
    }
    this.setState({deleteConfirmation: true})
  }

  toggleEditMode = () => {
    if (this.state.editMode){
      if (this.state.lastEditedField)
        this.saveContribution();
      this.setState({editMode: false})
    } else {
      this.setState({editMode: true})
    }
  }

  saveContribution = () => {
    if (this.state.selectedContribution.hasOwnProperty('_id')){
      this.props.updateContribution({...this.state.selectedContribution})
      .then(()=>this.setState({editMode: false, lastEditedField: null}))
    } else {
      this.props.createContribution(this.state.selectedContribution)
      .then(()=>this.setState({editMode: false, selectedContribution: this.props.contributions[0], lastEditedField: null}))
    }
  }

  checkValidation = () => {
    const dateEmpty = this.state.selectedContribution.date==="";
    const titleEmpty = this.state.selectedContribution.title==="";
    const descriptionEmpty = this.state.selectedContribution.description==="";
    const startTimeEmpty = this.state.selectedContribution.startTime==="";
    const endTimeEmpty = this.state.selectedContribution.endTime==="";
    const contactNameEmpty = this.state.selectedContribution.contactName==="";
    const contactNumberEmpty = this.state.selectedContribution.contactNumber==="";
    return dateEmpty || titleEmpty || descriptionEmpty || startTimeEmpty || endTimeEmpty || contactNameEmpty || contactNumberEmpty
  }

  addNewImages = (files, imageManager=false) => {
    let filesToUpload = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filesToUpload.push({file: reader.result, tags: [this.state.selectedContribution._id, 'contribution']});
        if (files.length===filesToUpload.length){
          this.props.uploadImagesByTags(filesToUpload)
          .then(data=>{
            if (!imageManager) {
              let coverImage = data.payload.data[0].secure_url;
              let selectedContribution = {...this.state.selectedContribution, coverImage}
              this.props.updateContribution(selectedContribution)
            } else {
              let newImages = data.payload.data.map(img=>img.secure_url);
              let selectedContribution = {...this.state.selectedContribution, images: [...this.state.selectedContribution.images, ...newImages]}
              this.props.updateContribution(selectedContribution)
            }
          })
        }
      }
    }
  }

  deleteImagesByTag = () => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false, selectedContribution: {...this.state.selectedContribution, coverImage: defaultCoverImage}}, ()=>{
        this.props.deleteImagesByTag(this.state.selectedContribution._id)
        this.props.updateContribution({...this.state.selectedContribution})
      })
    }
    this.setState({deleteConfirmation: true})
  }

  deleteImagesByURLs = (images) => {
    this.deleteConfirmationProceed = () => {
      let updatedImages = this.state.selectedContribution.images.filter(img=>!images.includes(img))
      let selectedContribution = {...this.state.selectedContribution, images: updatedImages}
      this.setState({deleteConfirmation: false, selectedContribution}, ()=>{
        this.props.deleteImagesByURLs(images)
        this.props.updateContribution({...selectedContribution})
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


  renderContribution = () => {
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
              value={new Date(this.state.selectedContribution.date)}
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
              id={this.state.selectedContribution._id}
              onChange={(e)=>this.handleTextChange('title', e.target.value)}
              value={this.state.selectedContribution.title}
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedContribution.title===""}
              helperText={this.state.selectedContribution.title==="" ? "Required" : null}
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
              id={this.state.selectedContribution._id}
              onChange={(e)=>this.handleTextChange('description', e.target.value)}
              value={this.state.selectedContribution.description}
              multiline
              rowsMax="15"
              style={{paddingRight: 20}}
              disabled={!this.state.editMode || this.props.loading}
              required
              error={this.state.selectedContribution.description===""}
              helperText={this.state.selectedContribution.description==="" ? "Required" : null}
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
              id={this.state.selectedContribution._id}
              onChange={(e)=>this.handleTextChange('location', e.target.value)}
              value={this.state.selectedContribution.location}
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
              id={this.state.selectedContribution._id}
              onChange={(e)=>this.handleTextChange('address', e.target.value)}
              value={this.state.selectedContribution.address}
              multiline
              rowsMax="15"
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
              alignItems: 'center'
            }}>
              <img src={this.state.selectedContribution.coverImage} alt={this.state.selectedContribution.title} style={{width: '50%', maxHeight: 150}}/>
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedContribution.coverImage!==defaultCoverImage || (this.state.selectedContribution && !this.state.selectedContribution.hasOwnProperty('_id'))}
                onClick={()=>{document.getElementById('selectedFile').click()}}
              >
                Add New Image
              </Button>
              <input id="selectedFile" type="file" accept="image/*" style={{display: 'none'}} onChange={(contribution)=>this.addNewImages(contribution.target.files)}></input>
              <Button
                variant="contained"
                style={{marginRight: 20}}
                color="secondary"
                disabled={this.props.loading || !this.state.editMode || this.state.selectedContribution.coverImage===defaultCoverImage}
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
              disabled={!this.state.editMode || (this.state.selectedContribution && !this.state.selectedContribution.hasOwnProperty('_id'))}
              onClick={this.openManageImages}
            >
              Manage Images
            </Button>
          </div>
          <br/>
      </Paper>
    )
  }

  checkIfCurrentContribution = contribution => this.state.selectedContribution && this.state.selectedContribution._id===contribution._id
  checkIfNotCurrentContribution = contribution => this.state.selectedContribution && this.state.selectedContribution._id!==contribution._id

  render() {

    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 3fr'}}>
          <List>
          {this.state.selectedContribution && this.state.selectedContribution.hasOwnProperty('_id') &&
            <Button
              variant="contained"
              color="primary"
              disabled={this.props.loading || (this.state.selectedContribution && !this.state.selectedContribution.hasOwnProperty('_id'))}
              onClick={this.addNewContribution}
              fullWidth
            >
              Create New Contribution
            </Button>
          }
          {this.state.selectedContribution && !this.state.selectedContribution.hasOwnProperty('_id') &&
            <div style={{
              display: 'grid',
              gridGap: 20,
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              alignItems: 'center'
            }}>
              <Button
                color="secondary"
                disabled={this.props.loading}
                onClick={this.cancelNewContribution}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={this.props.loading || this.checkValidation()}
                onClick={this.saveContribution}
              >
                Save
              </Button>
            </div>
          }
            <br/>
            <br/>
            {this.props.contributions.map((contribution, idx)=>
              <ListItem
                key={idx}
                button
                onClick={()=>!this.checkIfCurrentContribution(contribution) && this.selectContribution(contribution)}
                style={this.checkIfCurrentContribution(contribution) ? {background: '#a18be6'} : {}}
                disabled={this.props.loading}
              >
                <ListItemText
                  secondary={
                    <Typography
                    variant="body2"
                    style={this.checkIfCurrentContribution(contribution) ? {color: 'white'} : {}}
                  >
                    {contribution.date.slice(0, 10)}
                  </Typography>
                  }
                  primary={
                    <Typography
                      variant="subheading"
                      style={this.checkIfCurrentContribution(contribution) ? {color: 'white'} : {}}
                    >
                      {contribution.title.length > 30 ? contribution.title.slice(0, 30)+'...' : contribution.title}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Toggle Edit/Save"
                    disabled={this.props.loading || this.checkIfNotCurrentContribution(contribution) || (this.checkIfCurrentContribution(contribution) && this.checkValidation())}
                    onClick={this.toggleEditMode}
                    color='primary'
                  >
                    {this.state.editMode && this.checkIfCurrentContribution(contribution) ? <SaveIcon/> : <EditIcon/>}
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    disabled={this.props.loading || this.checkIfNotCurrentContribution(contribution)}
                    onClick={this.deleteContribution}
                    color='secondary'
                  >
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
          {this.state.selectedContribution && this.renderContribution()}
        </div>
        <UnsavedConfirmation
          open={this.state.unsavedConfirmation}
          confirmationSave={this.unsavedConfirmationSave}
          confirmationCancel={this.unsavedConfirmationCancel}
          confirmationDiscard={this.unsavedConfirmationDiscard}
          disabled={this.state.selectedContribution && this.checkValidation()}
        />
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
          disabled={this.state.selectedContribution && this.checkValidation()}
        />
        {this.state.selectedContribution &&
          <ManageImages
            open={this.state.openManageImages}
            handleClickOpen={this.openManageImages}
            handleClose={this.closeManageImages}
            selected={this.state.selectedContribution}
            updateSelected={this.props.updateContribution}
            title={this.state.selectedContribution && `Managing Images for ${this.state.selectedContribution.title}`}
            tags={this.state.selectedContribution && [this.state.selectedContribution._id, 'contribution']}
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
  contributions: state.contributions
})

const mapDispatchToProps = dispatch => ({
  getContributions: () => dispatch(getContributions()),
  createContribution: contribution => dispatch(createContribution(contribution)),
  updateContribution: contribution => dispatch(updateContribution(contribution)),
  deleteContribution: contributionID => dispatch(deleteContribution(contributionID)),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByTag: contributionID => dispatch(deleteImagesByTag(contributionID)),
  deleteImagesByURLs : urls => dispatch(deleteImagesByURLs(urls))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contribution)