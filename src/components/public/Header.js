import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { goToPage } from '../../actions';
import Responsive from 'react-responsive';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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
});

class Header extends Component {


  render() {
    const { classes } = this.props;

    let menus = [
      {
        link: "/contributions",
        icon: "icon-users",
        label: this.props.contributions ? <strong style={{ color: 'MediumSeaGreen' }}>Contributions</strong> : "அபிவிருத்திகள்",
      },
      {
        link: "/publications",
        icon: "icon-book3",
        label: this.props.publications ? <strong style={{ color: 'MediumSeaGreen' }}>Publications</strong> : "வெளியீடுகள்",
      },
      {
        link: "/news",
        icon: "icon-newspaper",
        label: this.props.news ? <strong style={{ color: 'MediumSeaGreen' }}>News</strong> : "செய்திகள்",
      },
      {
        link: "/gallery",
        icon: "icon-line-camera",
        label: this.props.gallery ? <strong style={{ color: 'MediumSeaGreen' }}>Gallery</strong> : "புகைப்படங்கள்",
      },
      {
        link: "/events",
        icon: "icon-line-location",
        label: this.props.events ? <strong style={{ color: 'MediumSeaGreen' }}>Events</strong> : "நிகழ்வுகள்",
      },
      {
        link: "/obituary",
        icon: "icon-eye-close",
        label: this.props.obituary ? <strong style={{ color: 'MediumSeaGreen' }}>Obituary</strong> : "துயர்வுகள்",
      },
      {
        link: "/contact",
        icon: "icon-line-mail",
        label: this.props.contact ? <strong style={{ color: 'MediumSeaGreen' }}>Contact Us</strong> : "தொடர்புகள்",
      },
      {
        link: "/donate",
        icon: "icon-dollar",
        label: this.props.donate ? <strong style={{ color: 'MediumSeaGreen' }}>Donate</strong> : "நிதி",
      }
    ];
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Desktop>
            <img src="https://res.cloudinary.com/nainativucds/image/upload/v1528159926/website/banner.jpg" height={120}/>
            <Tabs
              value={this.props.activePage}
              onChange={this.props.goToPage}
              centered
              style={{background: '#0D2B31'}}
            >
              <Tab label="Contributions" value="/contributions" style={{color: '#fff'}} />
              <Tab label="Publications"  value="/publications" style={{color: '#fff'}}/>
              <Tab label="News" value="/news" style={{color: '#fff'}}/>
              <Tab label="Gallery" value="/gallery" style={{color: '#fff'}}/>
              <Tab label="Events" value="/events" style={{color: '#fff'}}/>
              <Tab label="Obituary" value="/obituary" style={{color: '#fff'}}/>
              <Tab label="Contact" value="/contact" style={{color: '#fff'}}/>
              <Tab label="Donate" value="/donate" style={{color: '#fff'}}/>
            </Tabs>
          </Desktop>
          <Mobile>
            <img src="https://res.cloudinary.com/nainativucds/image/upload/v1528169496/website/banner_mobile.jpg" height={120}/>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"><MenuIcon /></IconButton>
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

