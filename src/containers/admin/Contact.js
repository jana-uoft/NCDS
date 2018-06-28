import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loading from '../../components/global/Loading';


class Contact extends Component {

  render() {
    return (
      <div>
        Contact
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)