import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Home from './containers/public/Home';
import Contributions from './containers/public/Contributions';
import Publications from './containers/public/Publications';
import News from './containers/public/News';
import Gallery from './containers/public/Gallery';
import Events from './containers/public/Events';
import Obituary from './containers/public/Obituary';
import Contact from './containers/public/Contact';
import Donate from './containers/public/Donate';
import FourOhFour from './components/public/FourOhFour';

import AdminContributions from './containers/admin/Contributions';
import AdminPublications from './containers/admin/Publications';
import AdminNews from './containers/admin/News';
import AdminGallery from './containers/admin/Gallery';
import AdminEvents from './containers/admin/Events';
import AdminObituary from './containers/admin/Obituary';
import AdminContact from './containers/admin/Contact';
import AdminDonate from './containers/admin/Donate';

import Login from './containers/admin/Login';


class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contributions" component={Contributions} />
          <Route exact path="/publications" component={Publications} />
          <Route exact path="/news" component={News} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/obituary" component={Obituary} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/admin/login" component={Login} />
          <Route exact path="/admin/contributions" component={AdminContributions} />
          <Route exact path="/admin/publications" component={AdminPublications} />
          <Route exact path="/admin/news" component={AdminNews} />
          <Route exact path="/admin/gallery" component={AdminGallery} />
          <Route exact path="/admin/events" component={AdminEvents} />
          <Route exact path="/admin/obituary" component={AdminObituary} />
          <Route exact path="/admin/contact" component={AdminContact} />
          <Route exact path="/admin/donate" component={AdminDonate} />
          <Route component={FourOhFour} />
        </Switch>
      </Router>

    )
  }
}

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ff0000',
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}




export default withRoot(App);
