import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import { getHome, updateHome } from '../../actions/homePage';
import ManageImages from '../../components/admin/ManageImages';
import Button from '@material-ui/core/Button';
import { uploadImagesByTags, deleteImagesByURLs } from '../../actions/imageManager';


class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openManageImages: false,
      openManageAdImages: false
    }
  }

  componentDidMount() {
    this.props.getHome()
  }

  addNewAdvertisements = (files) => {
    let filesToUpload = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filesToUpload.push({file: reader.result, tags: ['advertisement', 'homepage']});
        if (files.length===filesToUpload.length){
          this.props.uploadImagesByTags(filesToUpload)
          .then(data=>{
            let newImages = data.payload.data.map(img=>img.secure_url);
            this.props.updateHome({...this.props.homepage, advertisements: [...this.props.homepage.advertisements, ...newImages]})
          })
        }
      }
    }
  }

  updateAdvertisements = (advertisements) => {
    this.props.updateHome({...this.props.homepage, advertisements: advertisements.images})
  }

  deleteAdvertisements = (images) => {
    this.props.deleteImagesByURLs(images)
    this.props.updateHome({...this.props.homepage, advertisements: this.props.homepage.advertisements.filter(ad=>!images.includes(ad))})
  }

  openManageAdImages = () => {
    this.setState({ openManageAdImages: true });
  };

  closeManageAdImages = () => {
    this.setState({ openManageAdImages: false });
  };

  addNewImages = (files) => {
    let filesToUpload = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filesToUpload.push({file: reader.result, tags: ['images', 'homepage']});
        if (files.length===filesToUpload.length){
          this.props.uploadImagesByTags(filesToUpload)
          .then(data=>{
            let newImages = data.payload.data.map(img=>img.secure_url);
            this.props.updateHome({...this.props.homepage, images: [...this.props.homepage.images, ...newImages]})
          })
        }
      }
    }
  }

  updateImages = (images) => {
    this.props.updateHome({...this.props.homepage, images: images.images})
  }

  deleteImages = (imagesDeleted) => {
    this.props.deleteImagesByURLs(imagesDeleted)
    this.props.updateHome({...this.props.homepage, images: this.props.homepage.images.filter(ad=>!imagesDeleted.includes(ad))})
  }

  openManageImages = () => {
    this.setState({ openManageImages: true });
  };

  closeManageImages = () => {
    this.setState({ openManageImages: false });
  };

  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <Button
          variant="contained"
          color="primary"
          style={{marginRight: 20}}
          disabled={this.props.loading}
          onClick={this.openManageAdImages}
        >
          Manage Advertisements
        </Button>

        <ManageImages
          open={this.state.openManageAdImages}
          handleClickOpen={this.openManageAdImages}
          handleClose={this.closeManageAdImages}
          selected={{images: this.props.homepage.advertisements}}
          updateSelected={this.updateAdvertisements}
          title={`Managing Images for advertisements`}
          loading={this.props.loading}
          addNewImages={this.addNewAdvertisements}
          deleteImages={this.deleteAdvertisements}
        />

        <Button
          variant="contained"
          color="primary"
          style={{marginRight: 20}}
          disabled={this.props.loading}
          onClick={this.openManageImages}
        >
          Manage Homepage Images
        </Button>

        <ManageImages
          open={this.state.openManageImages}
          handleClickOpen={this.openManageImages}
          handleClose={this.closeManageImages}
          selected={{images: this.props.homepage.images}}
          updateSelected={this.updateImages}
          title={`Managing Images for homepage`}
          loading={this.props.loading}
          addNewImages={this.addNewImages}
          deleteImages={this.deleteImages}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.general.loading,
  homepage: state.homepage
})

const mapDispatchToProps = dispatch => ({
  getHome: () => dispatch(getHome()),
  updateHome: homepage => dispatch(updateHome(homepage)),
  uploadImagesByTags: images => dispatch(uploadImagesByTags(images)),
  deleteImagesByURLs : urls => dispatch(deleteImagesByURLs(urls))
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)