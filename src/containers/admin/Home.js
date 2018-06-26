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
  drawerPaper: {
    // position: 'relative',
    top: 150,
    width: '20%',
  },
  card: {
  },
  media: {
    height: 500,
    // paddingTop: '150%', // 16:9
  },
});

class Home extends Component {

  componentDidMount = () => {

  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.activePage!==this.props.activePage)
      this.props.history.push(this.props.activePage);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        ADMIN INTERFACE
        <Loading/>
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
)(withStyles(styles)(Home))

