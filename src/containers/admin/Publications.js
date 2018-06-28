import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loading from '../../components/global/Loading';


class Publication extends Component {

  render() {
    return (
      <div>
        Publication
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Publication)