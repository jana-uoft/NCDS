import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loading from '../../components/global/Loading';


class Obituary extends Component {

  render() {
    return (
      <div>
        Obituary
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Obituary)