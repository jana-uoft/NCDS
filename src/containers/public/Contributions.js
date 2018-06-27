import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Header from '../../components/public/Header';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit,
  },
});

class Contributions extends Component {


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header activePage={this.props.match.path} gotoPage={(link)=>this.props.history.push(link)}/>
        <Button variant="contained" color="primary">Hello</Button>
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
)(withStyles(styles)(Contributions))

