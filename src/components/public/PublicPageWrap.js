import React, { Component } from 'react';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';


export default function (ComposedComponent) {
  class PublicPageWrap extends Component {
    render() {
      return (
        <div>
          <Header activePage={this.props.match.path} gotoPage={(link)=>this.props.history.push(link)}/>
          <div style={{paddingTop: 150, minHeight: '100vh'}}><ComposedComponent {...this.props}/></div>
          <Footer/>
        </div>
      )
    }
  }
  return PublicPageWrap
}