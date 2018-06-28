import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit,
  },
});

class Publications extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary">Publications</Button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Publications))

