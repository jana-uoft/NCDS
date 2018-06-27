import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  toolbar: {...theme.mixins.toolbar, minHeight: '57px !important'}
});

const menus = [
  {label: 'Contributions', link: '/admin/contributions', icon: 'people'},
  {label: 'Publications', link: '/admin/publications', icon: 'book'},
  {label: 'News', link: '/admin/news', icon: 'library_books'},
  {label: 'Gallery', link: '/admin/gallery', icon: 'camera_alt'},
  {label: 'Events', link: '/admin/events', icon: 'event'},
  {label: 'Obituary', link: '/admin/obituary', icon: 'remove_red_eye'},
  {label: 'Contact', link: '/admin/contact', icon: 'contact_mail'},
  {label: 'Donate', link: '/admin/donate', icon: 'attach_money'}
];

class Sidebar extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {menus.map(({ label, link, icon }, idx)=>
            <ListItem
              key={idx}
              button
              onClick={()=>this.props.activePage===link ? null : this.props.gotoLink(link)}
              divider
              style={{backgroundColor: this.props.activePage===link ? '#1976d2' : ''}}
            >
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body2"
                    style={{ color: this.props.activePage===link ? '#FFFFFF' : 'inherit' }}
                  >
                    {label}
                  </Typography>}/>
            </ListItem>
          )}
        </List>
      </Drawer>
    )
  }
}




export default withStyles(styles)(Sidebar)

