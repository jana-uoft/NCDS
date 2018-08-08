import React, { Component } from 'react';
import styled from 'styled-components';
import LightBox from '../../components/global/LightBox';

class Home extends Component {
  state = {
    event_popup: true
  };

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
      grid-gap: 10px;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-areas:  "contentLeft contentMiddle contentRight";
      grid-area: content;
      text-align: center;
      align-items: center;
      margin: 0 30px;
      #anthem {
        width: 100%;
      }
      .thumb {
        width: 100%;
      }
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:  "contentMiddle"
                              "contentLeft"
                              "contentRight";
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
        {this.state.event_popup && 
        <LightBox images={['https://res.cloudinary.com/nainativucds/image/upload/v1533686633/website/event_popup.jpg']}
          photoIndex={0}
          onCloseModal={()=>this.setState({ event_popup: false})}
        />}
        <Left>
          <Advertisement><img src="https://res.cloudinary.com/nainativucds/image/upload/v1531102528/homepage/ad001.png" alt="add01" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src="https://res.cloudinary.com/nainativucds/image/upload/v1531102044/homepage/ad002.png" alt="add02" height="100%"/></Advertisement>
        </Left>
        <Middle>
          <div style={{gridArea: 'contentLeft'}}>
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/001.jpg" alt="001" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/002.jpg" alt="002" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/003.jpg" alt="003" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102926/homepage/008.jpg" alt="004" />
          </div>
          <div style={{gridArea: 'contentMiddle'}}><img id="anthem" src="https://res.cloudinary.com/nainativucds/image/upload/v1531104094/homepage/anthem.png" alt="anthem" /></div>
          <div style={{gridArea: 'contentRight'}}>
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/005.jpg" alt="005" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/006.jpg" alt="006" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102186/homepage/007.jpg" alt="007" />
            <img className="thumb" src="https://res.cloudinary.com/nainativucds/image/upload/v1531102821/homepage/004.jpg" alt="008" />
          </div>
        </Middle>
        <Right>
          <Advertisement><img src="https://res.cloudinary.com/nainativucds/image/upload/v1531102043/homepage/ad003.png" alt="add03" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src="https://res.cloudinary.com/nainativucds/image/upload/v1531102043/homepage/ad004.jpg" alt="add04" height="100%"/></Advertisement>
        </Right>
      </Main>
    )
  }
}


export default Home

