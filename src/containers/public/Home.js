import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHome } from '../../actions/homePage';
import styled from 'styled-components';
import Loading from '../../components/global/Loading';


class Home extends Component {

  componentDidMount() {
    this.props.getHome()
  }

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
    if (this.props.loading) return <Loading />
    return (
      <Main>
        <Left>
          <Advertisement><img src={this.props.advertisements[0]} alt="add01" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src={this.props.advertisements[1]} alt="add02" height="100%"/></Advertisement>
        </Left>
        <Middle>
          <div style={{gridArea: 'contentLeft'}}>
            <img className="thumb" src={this.props.images[0]} alt="001" />
            <img className="thumb" src={this.props.images[2]} alt="002" />
            <img className="thumb" src={this.props.images[4]} alt="003" />
            <img className="thumb" src={this.props.images[6]} alt="004" />
          </div>
          <div style={{gridArea: 'contentMiddle'}}><img id="anthem" src="https://res.cloudinary.com/nainativucds/image/upload/v1531104094/homepage/anthem.png" alt="anthem" /></div>
          <div style={{gridArea: 'contentRight'}}>
            <img className="thumb" src={this.props.images[1]} alt="005" />
            <img className="thumb" src={this.props.images[3]} alt="006" />
            <img className="thumb" src={this.props.images[5]} alt="007" />
            <img className="thumb" src={this.props.images[7]} alt="008" />
          </div>
        </Middle>
        <Right>
          <Advertisement><img src={this.props.advertisements[2]} alt="add03" height="100%"/></Advertisement>
          <br/>
          <Advertisement><img src={this.props.advertisements[3]} alt="add04" height="100%"/></Advertisement>
        </Right>
      </Main>
    )
  }
}





const mapStateToProps = state => ({
  advertisements: state.homepage.advertisements,
  images: state.homepage.images,
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  getHome: () => dispatch(getHome())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)