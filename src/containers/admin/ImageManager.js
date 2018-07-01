import React, { Component } from 'react'
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getImages } from '../../actions/imageManager';

const tabs = [
  'Contributions',
  'Publications',
  'News',
  'Gallery',
  'Events',
  'Obituary',
  'Contact',
  'Donate',
  'UnAssigned'
];


class ImageGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "Contributions"
    }
  }

  componentDidMount() {
    this.props.getImages();
  }

  switchTab = (activeTab) => {
    this.setState({activeTab})
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.activeTab}
          onChange={(event, value)=>this.switchTab(value)}
          centered
        >
          {tabs.map((tab, idx)=>
            <Tab key={idx} label={<div>{tab}</div>} value={tab} />
          )}
        </Tabs>
        FANCY IMAGE ADMIN
      </div>
    )
  }
}


const mapStateToProps = state => ({
  images: state.imageManager.images
})

const mapDispatchToProps = dispatch => ({
  getImages: () => dispatch(getImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery)