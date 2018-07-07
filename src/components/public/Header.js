import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
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
    top: 100
  },
  padding: {
    margin: '0 20%'
  }
});

const menus = [
  {label: 'Contributions', link: '/contributions', icon: 'people'},
  {label: 'Publications', link: '/publications', icon: 'book'},
  {label: 'News', link: '/news', icon: 'library_books'},
  {label: 'Gallery', link: '/gallery', icon: 'camera_alt'},
  {label: 'Events', link: '/events', icon: 'event'},
  {label: 'Obituary', link: '/obituary', icon: 'remove_red_eye'},
  {label: 'Contact Us', link: '/contact', icon: 'contact_mail'},
  {label: 'Donate', link: '/donate', icon: 'attach_money'}
];


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
        <AppBar style={{backgroundColor:"#0D2B31", position: "fixed"}}>
          <Desktop>
            <img
              alt="logo"
              src="https://res.cloudinary.com/nainativucds/image/upload/v1528159926/website/banner.jpg"
              height={100}
              onClick={()=>this.props.gotoPage('')}
              style={{cursor: 'pointer'}}
            />
            <Tabs
              value={this.props.activePage}
              onChange={(event, value)=>this.props.gotoPage(value)}
              centered
              style={{background: '#0D2B31', height: 50}}
            >
              {menus.map(({ label, link, icon }, idx)=>
                <Tab key={idx} label={<div><Icon style={{ fontSize: 15 }}>{icon}</Icon>&nbsp;&nbsp;{label}</div>} value={link} style={{color: '#fff'}} />
              )}
            </Tabs>
          </Desktop>
          <Mobile>
            <img
              alt="logo"
              src="https://res.cloudinary.com/nainativucds/image/upload/v1528169496/website/banner_mobile.jpg"
              height={100}
              onClick={()=>this.props.gotoPage('')}
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
                    {menus.map(({ label, link, icon }, idx)=>
                      <Fragment key={idx}>
                        <ListItem button onClick={()=>this.props.gotoPage(link)}>
                          <ListItemIcon>
                            <Icon>{icon}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={label}/>
                        </ListItem>
                        <Divider />
                      </Fragment>
                    )}
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


export default withStyles(styles)(Header)

