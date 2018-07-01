import React, { Component } from 'react'
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { getImages } from '../../actions/imageManager';

const tabs = [
  'Contributions',
  'Publications',
  'Gallery',
  'Events',
  'Obituary',
  'Un-Assigned'
];


class ImageGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeFilter: "Contributions",
      activeSubFilter: "Show All",
      openUploadModal: false,
      files: [],
    }
  }

  componentDidMount() {
    // this.props.getImages();
  }

  handleFileSelected = (files) => {
    this.setState({files})
    // let files = files;

    // let reader = new FileReader();
    // reader.readAsText(file);
    // reader.onloadend = ()=>this.setState({importData: reader.result, importFormat})
  }


  switchFilter = (activeFilter) => this.setState({activeFilter})

  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <div>
            Upload New Image(s):&nbsp;&nbsp;
            <input
              type="file"
              aria-label="Upload Image(s)"
              onChange={(event)=>this.handleFileSelected(event.target.files)}
              multiple
              accept="image/*"
            />
            <Button variant="contained" color="primary" style={{margin: 15}} disabled={this.state.files.length===0}>Upload</Button>
        </div>
        <div style={{
          display: 'grid',
          girdGap: 10,
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          justifyItems: 'center'
        }}>
          {tabs.map((tab, idx)=>
            <Chip
              key={idx}
              label={tab}
              onClick={()=>this.switchFilter((tab))}
              style={{background: this.state.activeFilter===tab ? 'darkseagreen' : 'gainsboro'}}
            />
          )}
        </div>
        FANCY IMAGE ADMIN
      </div>
    )
  }
}


const mapStateToProps = state => ({
  images: state.imageManager.images,
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(getImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery)