import React, { Component } from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';


class Footer extends Component {


  render() {

    const Footer = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      justify-items: center;
      align-items: center;
      background: #333333;
      grid-auto-rows: 80px;
      img {
        height: 80px;
      }
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        img {
          width: 100%;
        }
      }
    `

    return (
      <Footer>
        <img src="https://nainativucds.org/images/footer_logo.jpg" alt="Footer"/>
        <div style={{background: '#333333', textAlign: 'center'}}>
          <Typography style={{color: 'white'}} variant="subheading">Copyrights © 2018 All Rights Reserved by NainativuCDS.org</Typography>
          <Typography style={{color: 'white'}} variant="subheading"><a style={{color: 'inherit', textDecoration: 'none'}} href="https://jana19.org/" rel="noopener noreferrer" target="_blank">Website Developed by <b>Jana</b></a></Typography>
        </div>
      </Footer>
    )
  }
}


export default Footer

