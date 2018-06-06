import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { goToPage } from '../../actions';
import Responsive from 'react-responsive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

const Desktop = props => <Responsive {...props} minWidth={768} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    margin: '0 45%',
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    // height: 'calc(100% - 100px)',
    top: 100
  },
  padding: {
    margin: '0 20%'
  }
});

class Header extends Component {
  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
    this.setState({open});
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor:"#0D2B31"}}>
          <Desktop>
            <img 
              alt="logo"
              src="https://res.cloudinary.com/nainativucds/image/upload/v1528159926/website/banner.jpg" 
              height={100} 
              onClick={()=>this.props.goToPage(null, '')}
              style={{cursor: 'pointer'}}
            />
            <Tabs
              value={this.props.activePage}
              onChange={this.props.goToPage}
              centered
              style={{background: '#0D2B31'}}
            >
              <Tab label={<div><Icon style={{ fontSize: 15 }}>people</Icon>&nbsp;&nbsp;Contributions</div>} value="/contributions" style={{color: '#fff'}} />
              <Tab label={<div><Icon style={{ fontSize: 15 }}>book</Icon>&nbsp;&nbsp;Publications</div>} value="/publications" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>library_books</Icon>&nbsp;&nbsp;News</div>} value="/news" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>camera_alt</Icon>&nbsp;&nbsp;Gallery</div>} value="/gallery" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>event</Icon>&nbsp;&nbsp;Events</div>} value="/events" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>remove_red_eye</Icon>&nbsp;&nbsp;Obituary</div>} value="/obituary" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>contact_mail</Icon>&nbsp;&nbsp;Contact</div>} value="/contact" style={{color: '#fff'}}/>
              <Tab label={<div><Icon style={{ fontSize: 15 }}>attach_money</Icon>&nbsp;&nbsp;Donate</div>} value="/donate" style={{color: '#fff'}}/>
            </Tabs>
          </Desktop>
          <Mobile>
            <img 
              alt="logo"
              src="https://res.cloudinary.com/nainativucds/image/upload/v1528169496/website/banner_mobile.jpg" 
              height={100}
              onClick={()=>this.props.goToPage(null, '')}
              style={{cursor: 'pointer'}}
            />
            <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu"><Icon>arrow_downward</Icon></IconButton>
            <Drawer anchor="top" open={this.state.open} onClose={this.toggleDrawer(false)} classes={{paper: classes.paper}}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer(false)}
                onKeyDown={this.toggleDrawer(false)}
              >
                <div className={classes.fullList}>
                  <List classes={{padding: classes.padding}}>
                    <ListItem button onClick={()=>this.props.goToPage(null, '/contributions')}>
                      <ListItemIcon>
                        <Icon>people</Icon>
                      </ListItemIcon>
                      <ListItemText primary="CONTRIBUTIONS"/>
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/publications')}>
                      <ListItemIcon>
                        <Icon>book</Icon>
                      </ListItemIcon>
                      <ListItemText primary="PUBLICATIONS" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/news')}>
                      <ListItemIcon>
                        <Icon>library_books</Icon>
                      </ListItemIcon>
                      <ListItemText primary="NEWS" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/gallery')}>
                      <ListItemIcon>
                        <Icon>camera_alt</Icon>
                      </ListItemIcon>
                      <ListItemText primary="GALLERY" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/events')}>
                      <ListItemIcon>
                        <Icon>event</Icon>
                      </ListItemIcon>
                      <ListItemText primary="EVENTS" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/obituary')}>
                      <ListItemIcon>
                        <Icon>remove_red_eye</Icon>
                      </ListItemIcon>
                      <ListItemText primary="OBITUARY" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/contact')}>
                      <ListItemIcon>
                        <Icon>contact_mail</Icon>
                      </ListItemIcon>
                      <ListItemText primary="CONTACT" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={()=>this.props.goToPage(null, '/donate')}>
                      <ListItemIcon>
                        <Icon>attach_money</Icon>
                      </ListItemIcon>
                      <ListItemText primary="DONATE" />
                    </ListItem>
                  </List>
                </div>
              </div>
            </Drawer>
          </Mobile>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activePage: state.general.activePage,
  activePageValue: state.general.activePageValue
})

const mapDispatchToProps = dispatch => ({
  goToPage: (event, value) => dispatch(goToPage(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header))

