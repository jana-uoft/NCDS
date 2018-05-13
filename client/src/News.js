import React, { Component } from 'react'
import Loading from './Loading';
import { isMobile } from 'react-device-detect';


const news_channels = [
  {
    name: 'jvpnews',
    url: 'http://www.jvpnews.com/rss.xml'
  },
  {
    name: 'lankasri',
    url: 'http://news.lankasri.com/rss.xml'
  },
  {
    name: 'canadamirror',
    url: 'http://www.canadamirror.com/rss.xml'
  },
  {
    name: 'tamilwin',
    url: 'http://www.tamilwin.com/rss.xml'
  },
  {
    name: 'cineulagam',
    url: 'http://www.cineulagam.com/rss.xml'
  },
  {
    name: 'manithan',
    url: 'http://www.manithan.com/rss.xml'
  }
];


export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentDidMount = () => {
    fetch('/api/news')
      .then(response => response.json())
      .then(news => this.setState({ news }));
  }


  render() {

    let leftSideBar, rightSideBar;

    if (!isMobile) leftSideBar = (
      <div className="sidebar sticky-sidebar-wrap nobottommargin clearfix" style={{marginRight: 0}}>
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            <div className="widget widget_links clearfix">
              <h4>Sri Lankan News</h4>
              <ul>
                <li><a href="http://www.lankasri.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்காசிறி</a></li>
                <li><a href="http://www.jvpnews.com/links?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">2000 இணையத்தளங்கள்</a></li>
                <li><a href="http://www.tamilwin.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ்வின்</a></li>
                <li><a href="http://news.lankasri.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்காசிறி நியூஸ்</a></li>
                <li><a href="http://www.canadamirror.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கனடா மிரர்</a></li>
                <li><a href="http://www.manithan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">மனிதன்</a></li>
                <li><a href="http://www.bbc.com/tamil/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">BBC தமிழ்</a></li>
                <li><a href="http://asrilanka.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஏ சிறிலங்கா</a></li>
                <li><a href="http://www.lankaroad.net/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்கா ரோடு</a></li>
                <li><a href="http://www.athirvu.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">அதிர்வு</a></li>
                <li><a href="http://www.tamilwin.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஈழவின்</a></li>
                <li><a href="http://www.oamma.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஓ அம்மா</a></li>
                <li><a href="http://www.pathivu.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">பதிவு</a></li>
                <li><a href="http://tamil.adaderana.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">அததெரண தமிழ்</a></li>
                <li><a href="http://www.hirunews.lk/tamil/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஹிரு நியூஸ்</a></li>
                <li><a href="http://www.ibctamil.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">IBC தமிழ்</a></li>
                <li><a href="http://globaltamilnews.net/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">குளோபல் தமிழ் நியுஸ்</a></li>
                <li><a href="http://www.puthinappalakai.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">புதினப்பலகை</a></li>
                <li><a href="http://www.battinews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">பற்றி நியூஸ்</a></li>
                <li><a href="http://www.tamilmirror.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் மிரர்</a></li>
                <li><a href="http://www.ttnnews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">TTN நியூஸ்</a></li>
                <li><a href="http://www.athavannews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஆதவன் நியூஸ்</a></li>
                <li><a href="http://www.tamilcnnlk.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் சிஎன் என்</a></li>
                <li><a href="http://newsfirst.lk/tamil/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நியூஸ் ஃபஸ்ட்</a></li>
                <li><a href="http://www.sankathi24.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சங்கதி 24</a></li>
                <li><a href="http://tamil.news.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நியூஸ்.lk</a></li>
                <li><a href="http://www.4tamilmedia.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">4 தமிழ் மீடியா</a></li>
                <li><a href="http://www.dailyceylon.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டெய்லி சிலோன்</a></li>
                <li><a href="http://newjaffna.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நியூ ஜவ்னா</a></li>
                <li><a href="http://www.seithy.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">செய்தி</a></li>
                <li><a href="http://www.shritharan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சிறிதரன்</a></li>
                <li><a href="http://ceylonmuslim.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சிலோன் முஸ்லிம்</a></li>
                <li><a href="http://www.supeedsam.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சுபீட்சம்</a></li>
                <li><a href="http://www.enkalthesam.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">எங்கள் தேசம்</a></li>
                <li><a href="http://www.jaffnamuslim.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஜஃப்னா முஸ்லீம்</a></li>
                <li><a href="http://www.vivasaayi.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">விவசாயி</a></li>
                <li><a href="http://kathiravan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கதிரவன்</a></li>
                <li><a href="http://www.puthinamnews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">புதினம் நியூஸ்</a></li>
                <li><a href="http://www.yarl.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">யாழ்</a></li>
                <li><a href="http://www.athirady.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">அதிரடி</a></li>
                <li><a href="http://www.elukathir.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">எழுகதிர்</a></li>
                <li><a href="http://www.epdpnews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஈபிடிபி நியூஸ்</a></li>
                <li><a href="http://kilinochchimedia.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கிளிநொச்சி  மீடியா</a></li>
                <li><a href="http://www.vannionline.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">வன்னி ஒன்லைன்</a></li>
                <li><a href="http://www.telonews.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ரெலோ நியூஸ்</a></li>
                <li><a href="http://thinakkathir.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினக்கதிர்</a></li>
                <li><a href="http://www.lankaone.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்கா வன்</a></li>
                <li><a href="http://www.importmirror.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இம்போர்டண்ட் மிரர்</a></li>
                <li><a href="http://ekuruvi.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஈ குருவி</a></li>
                <li><a href="http://eeladhesam.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஈழதேசம்</a></li>
              </ul>
            </div>
            <div className="widget widget_links clearfix">
              <h4>News Paper</h4>
              <ul>
                <li><a href="http://www.virakesari.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">வீரகேசரி</a></li>
                <li><a href="http://onlineuthayan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">உதயன்</a></li>
                <li><a href="http://www.thinakaran.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினகரன்</a></li>
                <li><a href="http://www.thinakkural.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினக்குரல்</a></li>
                <li><a href="http://www.valampurii.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">வலம்புரி</a></li>
                <li><a href="https://www.kumudam.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">குமுதம்</a></li>
                <li><a href="http://www.maalaisudar.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">மாலை சுடர்</a></li>
                <li><a href="http://www.kungumam.co.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">குங்குமம்</a></li>
                <li><a href="http://www.viduthalai.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">விடுதலை</a></li>
                <li><a href="http://www.sooriyakanthi.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சூரியகாந்தி</a></li>
                <li><a href="http://www.kalkionline.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கல்கி</a></li>
              </ul>
            </div>
            <div className="widget widget_links clearfix">
              <h4>World News</h4>
              <ul>
                <li><a href="http://www.bbc.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">பி.பி.சி</a></li>
                <li><a href="http://www.reuters.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">றொய்ரேர்ஸ்</a></li>
                <li><a href="http://edition.cnn.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சி என் என் ஆங்கிலம்</a></li>
                <li><a href="https://www.theguardian.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தி கார்டியன்</a></li>
                <li><a href="http://news.sky.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நியூஸ் ஸ்கை</a></li>
                <li><a href="http://www.dailymail.co.uk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டெய்லி மெயில்</a></li>
                <li><a href="http://timesofindia.indiatimes.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டைம்ஸ் ஆப் இந்தியா</a></li>
                <li><a href="http://indiatoday.intoday.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இந்தியா டுடே</a></li>
                <li><a href="http://www.ndtv.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">NDTV செய்திகள்</a></li>
                <li><a href="http://www.indianexpress.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இந்தியன் எக்ஸ்பிரஸ்</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );

    let content = <Loading />;

    if (this.state.news.length>0) content = (
      <div className="postcontent bothsidebar nobottommargin clearfix">
        <div className="row">
        {this.state.news.map((news, idx) =>
          <div key={idx} className="col-lg-3 bottommargin">
            <div className="ipost clearfix">
              <div className="entry-image">
                <a href={news.guid} rel="noopener noreferrer" target="_blank"><img className="image_fade" src={news.image.url} alt="Thumbnail"/></a>
              </div>
              <div className="entry-title">
                <h3><a href={news.guid} rel="noopener noreferrer" target="_blank">{news.title}</a></h3>
              </div>
              <ul className="entry-meta clearfix">
                  <li><i className="icon-calendar3"></i>{new Date(news.date).toLocaleString()}</li>
              </ul>
            </div>
          </div>
        )}
        </div>
      </div>
    );

    if (!isMobile) rightSideBar = (
      <div className="sidebar sticky-sidebar-wrap col_last nobottommargin clearfix">
        <div className="sidebar-widgets-wrap">
          <div className="sticky-sidebar">
            <div className="widget widget_links clearfix">
              <h4>English News</h4>
              <ul>
                <li><a href="http://www.tamilfocus.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்காசிறி செய்திகள்</a></li>
                <li><a href="http://www.tamilnet.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் நெற்</a></li>
                <li><a href="http://www.bbc.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">பி.பி.சி</a></li>
                <li><a href="http://www.dailymirror.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டெய்லி மிரர்</a></li>
                <li><a href="http://www.island.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தி ஐலண்ட்</a></li>
                <li><a href="http://www.dailynews.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டெய்லி நியூஸ்</a></li>
                <li><a href="http://www.hi.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஹை</a></li>
                <li><a href="http://www.lankanewsweb.net/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்கா நியூஸ் வெப்</a></li>
                <li><a href="http://www.sundaytimes.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சண்டே டைம்ஸ்</a></li>
                <li><a href="http://www.lankapage.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்கா பேஜ்</a></li>
                <li><a href="http://www.tamilguardian.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் கார்டியன்</a></li>
                <li><a href="http://www.thesundayleader.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தி சண்டே லீடர்</a></li>
                <li><a href="http://www.slguardian.org/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சிறிலங்கா காடியன்</a></li>
                <li><a href="http://www.adaderana.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">அததெரண</a></li>
                <li><a href="http://www.asianmirror.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஏசியன் மிரர்</a></li>
                <li><a href="http://www.colombopage.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கொழும்பு பேஜ்</a></li>
                <li><a href="http://www.colombogazette.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கொழும்பு கெசட்</a></li>
                <li><a href="http://www.theacademic.org/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">த அக்கடமிக்</a></li>
                <li><a href="http://www.news.lk/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நியூஸ் LK</a></li>
                <li><a href="http://www.economynext.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">எக்கானமி நெக்ஸ்ட்</a></li>
              </ul>
            </div>
            <div className="widget widget_links clearfix">
              <h4>Indian News</h4>
              <ul>
                <li><a href="http://india.lankasri.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">லங்காசிறி நியூஸ்</a></li>
                <li><a href="http://tamil.oneindia.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஒன் இந்தியா தமிழ்</a></li>
                <li><a href="http://www.nakkheeran.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நக்கீரன்</a></li>
                <li><a href="http://www.dinamalar.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினமலர்</a></li>
                <li><a href="http://www.dinakaran.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினகரன்</a></li>
                <li><a href="http://www.maalaimalar.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">மாலைமலர்</a></li>
                <li><a href="http://www.dinamani.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினமணி</a></li>
                <li><a href="http://www.dailythanthi.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினத்தந்தி</a></li>
                <li><a href="http://www.vikatan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">விகடன்</a></li>
                <li><a href="http://tamil.thehindu.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தி இந்து</a></li>
                <li><a href="http://tamil.webdunia.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் வெப்துனியா</a></li>
                <li><a href="http://www.thinaboomi.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தினபூமி</a></li>
                <li><a href="http://www.kungumam.co.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">குங்குமம்</a></li>
                <li><a href="http://timesofindia.indiatimes.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">டைம்ஸ் ஆப் இந்தியா</a></li>
                <li><a href="http://www.thehindu.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தி இந்து ஆங்கிலம்</a></li>
                <li><a href="http://indiatoday.intoday.in/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இந்தியா டுடே</a></li>
                <li><a href="http://www.ndtv.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">NDTV செய்திகள்</a></li>
                <li><a href="http://www.indianexpress.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இந்தியன் எக்ஸ்பிரஸ்</a></li>
              </ul>
            </div>
            <div className="widget widget_links clearfix">
              <h4>Cinema News</h4>
              <ul>
                <li><a href="http://www.cineulagam.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">சினிஉலகம்</a></li>
                <li><a href="http://www.behindwoods.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">பிகைன்ட் வுட்ஸ்</a></li>
                <li><a href="http://www.manithan.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">மனிதன்</a></li>
                <li><a href="http://www.cineulagam.com/celebs?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">நடிகர் தளங்கள்</a></li>
                <li><a href="http://www.indiaglitz.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">இந்தியா கிளிட்ஸ்</a></li>
                <li><a href="http://www.cineulagam.com/reviews?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">திரை விமர்சனம்</a></li>
                <li><a href="http://www.tamilcinema.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">தமிழ் சினிமா</a></li>
                <li><a href="http://www.filmibeat.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">ஃபிலிம் பீட்</a></li>
                <li><a href="http://www.album2000.com?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">Album 2000</a></li>
                <li><a href="http://www.galatta.com/?ref=home-nainativucds" rel="noopener noreferrer" target="_blank">கலாட்டா</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );


    return (
      <div className="container-fullwidth clearfix">
        {leftSideBar}
        {content}
        {rightSideBar}
      </div>
    )
  }
}
