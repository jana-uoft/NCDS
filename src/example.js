import React, { Component } from 'react';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import { toggleTodo } from '../../actions'
import Loading from '../../components/global/Loading';

const Desktop = props => <Responsive {...props} minWidth={768} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit,
  },
});

class Home extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        BLA
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
)(withStyles(styles)(Home))

