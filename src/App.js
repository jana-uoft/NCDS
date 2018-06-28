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
import adminPage from './components/admin/AdminPageWrap';

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
          <Route exact path="/admin/contributions" component={adminPage(AdminContributions)} />
          <Route exact path="/admin/publications" component={adminPage(AdminPublications)} />
          <Route exact path="/admin/news" component={adminPage(AdminNews)} />
          <Route exact path="/admin/gallery" component={adminPage(AdminGallery)} />
          <Route exact path="/admin/events" component={adminPage(AdminEvents)} />
          <Route exact path="/admin/obituary" component={adminPage(AdminObituary)} />
          <Route exact path="/admin/contact" component={adminPage(AdminContact)} />
          <Route exact path="/admin/donate" component={adminPage(AdminDonate)} />
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
