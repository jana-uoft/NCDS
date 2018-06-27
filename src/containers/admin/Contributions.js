import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { logout } from '../../actions/auth';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
// import Loading from '../../components/global/Loading';


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar,
});


class Contribution extends Component {

  componentDidMount = () => {
    if (!this.props.token) this.props.history.push('/admin/login');
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.token) this.props.history.push('/admin/login');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header logout={this.props.logout}/>
        <Sidebar activePage={this.props.match.path} gotoLink={(link)=>this.props.history.push(link)}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          Contributions
        </main>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Contribution))

