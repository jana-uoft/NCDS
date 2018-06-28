import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loading from '../../components/global/Loading';


class Gallery extends Component {

  render() {
    return (
      <div>
        Gallery
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)