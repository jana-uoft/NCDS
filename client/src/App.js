import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary">Hello</Button>
      </div>
    )
  }
}



const theme = createMuiTheme();

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


export default withRoot(withStyles(styles)(App));
