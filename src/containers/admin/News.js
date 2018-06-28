import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Loading from '../../components/global/Loading';


class News extends Component {

  render() {
    return (
      <div>
        News
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(News)