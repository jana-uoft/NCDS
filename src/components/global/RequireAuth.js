import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.token) this.props.history.push('/admin/login')
    }

    componentDidUpdate = () => {
      if (!this.props.token) this.props.history.push('/admin/login')
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token
  })

  return connect(mapStateToProps)(Authentication)
}