import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './Header';
import HomeComponent from './Home';
import ContributionsComponent from './Contributions';
import PublicationsComponent from './Publications';
import NewsComponent from './News';
import GalleryComponent from './Gallery';
import EventsComponent from './Events';
import ObituaryComponent from './Obituary';
import ContactComponent from './Contact';
import DonateComponent from './Donate';
import FourOhFourComponent from './FourOhFour';
import 'react-image-lightbox/style.css';

const Home = () => (
  <div className="clearfix">
    <Header />
    <section id="content">
      <div className="content-wrap">
        <HomeComponent />
      </div>
    </section>
  </div>
);

const Contributions = () => (
  <div className="clearfix">
    <Header contributions />
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Contributions</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <ContributionsComponent />
      </div>
    </section>
  </div>
);

const Publications = () => (
  <div className="clearfix">
    <Header publications/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{textAlign: 'center'}}>Theepam Publications</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <PublicationsComponent />
      </div>
    </section>
  </div>
);

const News = () => (
  <div className="clearfix">
    <Header news/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Latest News</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <NewsComponent />
      </div>
    </section>
  </div>
);

const Gallery = () => (
  <div className="clearfix">
    <Header gallery/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Gallery</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <GalleryComponent />
      </div>
    </section>
  </div>
);

const Events = () => (
  <div className="clearfix">
    <Header events/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Events</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <EventsComponent />
      </div>
    </section>
  </div>
);

const Obituary = () => (
  <div className="clearfix">
    <Header obituary/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Obituary</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <ObituaryComponent />
      </div>
    </section>
  </div>
);


const Contact = () => (
  <div className="clearfix">
    <Header contact/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <ContactComponent />
      </div>
    </section>
  </div>
);

const Donate = () => (
  <div className="clearfix">
    <Header donate/>
    <section id="page-title" className="page-title-mini page-title-dark">
      <div className="container clearfix">
        <h1 style={{ textAlign: 'center' }}>Donate</h1>
      </div>
    </section>
    <section id="content">
      <div className="content-wrap">
        <DonateComponent />
      </div>
    </section>
  </div>
);

const FourOhFour = () => (
  <div className="clearfix">
    <Header />
    <FourOhFourComponent />
  </div>
);


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contributions" component={Contributions} />
            <Route path="/publications" component={Publications} />
            <Route path="/news" component={News} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/events" component={Events} />
            <Route path="/obituary" component={Obituary} />
            <Route path="/contact" component={Contact} />
            <Route path="/donate" component={Donate} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
    );
  }
}

export default App;
