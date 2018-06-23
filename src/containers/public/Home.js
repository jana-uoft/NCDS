import React, { Component } from 'react';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import { toggleTodo } from '../../actions'
import Button from '@material-ui/core/Button';
import Header from '../../components/public/Header';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.activePage!==this.props.activePage)
      this.props.history.push(this.props.activePage);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header/>
        <Desktop>
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
          
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://res.cloudinary.com/nainativucds/image/upload/v1528596004/website/Ananthan_Vijaya-Web_AD.png"
              title="Contemplative Reptile"
            />
          </Card>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://res.cloudinary.com/nainativucds/image/upload/v1528596003/website/Insurance-Web_AD.png"
              title="Contemplative Reptile"
            />
          </Card>
          </Drawer>
        </Desktop>
        <Button variant="contained" color="primary">Hello</Button>
        <Desktop>
          <Drawer
            variant="permanent"
            anchor='right'
            classes={{ paper: classes.drawerPaper }}
          >
          </Drawer>
        </Desktop>
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

