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

import AdminHome from './containers/admin/Home';
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
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/login" component={Login} />
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
