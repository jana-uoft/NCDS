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
