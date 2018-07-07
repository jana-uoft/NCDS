import React, { Component } from 'react';
import styled from 'styled-components';

class Home extends Component {

  render() {

    const Main = styled.div`
      display: grid;
      grid-gap: 10px;
      grid-template-areas: "adLeft content content content content adRight";
      grid-template-columns: 1fr 4fr 1fr;
      margin: 20px 20px;
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas: "content "
                             "adLeft"
                             "adRight";
      }
    `

    const Left = styled.div`
      grid-area: adLeft;
    `

    const Middle = styled.div`
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-areas:  "contentLeft contentMiddle contentRight";
      grid-area: content;
      text-align: center;
      margin: 0 30px;
      #anthem {
        height: 100%;
      }
      .thumb {
        width: 100%;
      }
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:  "contentMiddle"
                              "contentLeft"
                              "contentRight";
        #anthem {
          width: 100%;
        }
      }
    `

    const Right = styled.div`
      grid-area: adRight;
    `

    const Advertisement = styled.div`
      height: 350px;
      text-align: center;
    `
    return (
      <Main>
        <Left>
          <Advertisement><img src="https://nainativucds.org/images/ad001.png" alt="add01" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src="https://nainativucds.org/images/ad02.png" alt="add02" height="100%"/></Advertisement>
        </Left>
        <Middle>
          <div style={{gridArea: 'contentLeft'}}>
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1526689318/gallery/007/nainativu-nagapoosani-amman-temple-Sri-Lanka.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1526689318/gallery/007/5996999517_70365ea3e6_b.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/h_450,w_600/v1526615527/gallery/007/FB_IMG_1526562702293.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615296/gallery/007/IMG-20180517-WA0038.jpg" alt="anthem" />
          </div>
          <div style={{gridArea: 'contentMiddle'}}><img id="anthem" src="https://nainativucds.org/images/home_page_pic.PNG" alt="anthem" /></div>
          <div style={{gridArea: 'contentRight'}}>
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/h_450,w_600/v1526615536/gallery/007/IMG-20180412-WA0015_1.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/h_450,w_600/v1526615527/gallery/007/FB_IMG_1526563170721.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615531/gallery/007/FB_IMG_1526569387120.jpg" alt="anthem" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1526615529/gallery/007/FB_IMG_1526563977114.jpg" alt="anthem" />
          </div>
        </Middle>
        <Right>
          <Advertisement><img src="https://nainativucds.org/images/ad03.png" alt="add03" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src="https://nainativucds.org/images/ad04.jpg" alt="add04" height="100%"/></Advertisement>
        </Right>
      </Main>
    )
  }
}


export default Home

