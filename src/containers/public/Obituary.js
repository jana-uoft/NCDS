import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { toggleTodo } from '../../actions'
import Button from '@material-ui/core/Button';
import Header from '../../components/public/Header';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit,
  },
});

class Obituary extends Component {

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.activePage!==this.props.activePage)
      this.props.history.push(this.props.activePage);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header/>
        <Button variant="contained" color="primary">Hello</Button>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  activePage: state.general.activePage
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Obituary))

