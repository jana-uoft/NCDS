import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import Loading from '../../components/global/Loading';
import { getEvents } from '../../actions/events';

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


class Event extends Component {

  componentDidMount = () => {
    this.props.getEvents();
  }

  renderEvent = (event, idx) => {
    return <div key={idx}>{event.title}</div>
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header logout={this.props.logout}/>
        <Sidebar activePage={this.props.match.path} gotoLink={(link)=>this.props.history.push(link)}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          Events
          {this.props.events.map(this.renderEvent)}
        </main>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(getEvents())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Event))

