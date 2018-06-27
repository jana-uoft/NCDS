import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});


class Header extends Component {

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            Nainativu Canadian Development Society
          </Typography>
          <Button color="inherit" onClick={this.props.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
  }
}


export default withStyles(styles)(Header)

