import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import publicPage from './components/public/PublicPageWrap';
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
import AdminHomePage from './containers/admin/HomePage';
import AdminContributions from './containers/admin/Contributions';
import AdminPublications from './containers/admin/Publications';
import AdminNews from './containers/admin/News';
import AdminGallery from './containers/admin/Gallery';
import AdminEvents from './containers/admin/Events';
import AdminObituary from './containers/admin/Obituary';
import AdminMessage from './containers/admin/Message';
import AdminContact from './containers/admin/Contact';
import Login from './containers/admin/Login';


class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={publicPage(Home)} />
          <Route exact path="/contributions" component={publicPage(Contributions)} />
          <Route exact path="/publications" component={publicPage(Publications)} />
          <Route exact path="/news" component={publicPage(News)} />
          <Route exact path="/gallery" component={publicPage(Gallery)} />
          <Route exact path="/events" component={publicPage(Events)} />
          <Route exact path="/obituary" component={publicPage(Obituary)} />
          <Route exact path="/contact" component={publicPage(Contact)} />
          <Route exact path="/donate" component={publicPage(Donate)} />
          <Route exact path="/admin/login" component={Login} />
          <Route exact path="/admin/homepage" component={adminPage(AdminHomePage)} />
          <Route exact path="/admin/contributions" component={adminPage(AdminContributions)} />
          <Route exact path="/admin/publications" component={adminPage(AdminPublications)} />
          <Route exact path="/admin/news" component={adminPage(AdminNews)} />
          <Route exact path="/admin/galleries" component={adminPage(AdminGallery)} />
          <Route exact path="/admin/events" component={adminPage(AdminEvents)} />
          <Route exact path="/admin/obituaries" component={adminPage(AdminObituary)} />
          <Route exact path="/admin/messages" component={adminPage(AdminMessage)} />
          <Route exact path="/admin/contacts" component={adminPage(AdminContact)} />
          <Redirect from='/admin' to='/admin/homepage'/>
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
