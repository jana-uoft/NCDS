import React, { Component } from 'react';
import Header from '../../components/public/Header';


export default function (ComposedComponent) {
  class PublicPageWrap extends Component {
    render() {
      return (
        <div>
          <Header activePage={this.props.match.path} gotoPage={(link)=>this.props.history.push(link)}/>
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }
  return PublicPageWrap
}