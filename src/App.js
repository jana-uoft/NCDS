import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './Header';
import HomeComponent from './Home';
import FourOhFour from './FourOhFour';

const Home = () => (
  <div className="clearfix">
    <Header />
    <HomeComponent />
  </div>
);

const Contributions = () => (
  <div className="clearfix">
    <Header />
    <h2>Contributions</h2>
  </div>
);

const Publications = () => (
  <div className="clearfix">
    <Header />
    <h2>Publications</h2>
  </div>
);

const News = () => (
  <div className="clearfix">
    <Header />
    <h2>News</h2>
  </div>
);

const Gallery = () => (
  <div className="clearfix">
    <Header />
    <h2>Gallery</h2>
  </div>
);

const Events = () => (
  <div className="clearfix">
    <Header />
    <h2>Events</h2>
  </div>
);

const Obituary = () => (
  <div className="clearfix">
    <Header />
    <h2>Obituary</h2>
  </div>
);


const Contact = () => (
  <div className="clearfix">
    <Header />
    <h2>Contact</h2>
  </div>
);

const Donate = () => (
  <div className="clearfix">
    <Header />
    <h2>Donate</h2>
  </div>
);

const NoMatch = () => (
  <div className="clearfix">
    <Header />
    <FourOhFour />
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
            <Route component={NoMatch} />
          </Switch>
        </Router>
    );
  }
}

export default App;
