import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../global/Loading';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ManageImages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: []
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
        disableBackdropClick
        disableEscapeKeyDown
      >
        {this.props.loading && <Loading />}
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.title}
            </Typography>
            <Button color="inherit" onClick={this.props.handleClose} disabled={this.props.loading}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <br/>
        <div style={{
          display: 'grid',
          gridGap: 20,
          gridTemplateColumns: '1fr 1fr',
          justifyItems: 'center'
        }}>
          <Button
            variant="contained"
            color="primary"
            disabled={this.props.loading}
            onClick={()=>{document.getElementById('selectedFiles').click()}}
            style={{margin: '0px 20px', width: 300}}
          >
            Upload New Image(s)
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={this.props.loading || this.state.selected.length===0}
            onClick={()=>this.props.deleteImages(this.state.selected)}
            style={{margin: '0px 20px', width: 300}}
          >
            Delete Selected Image(s)
          </Button>
        </div>
        <br/>
        <div style={{margin: '0 20px', display: 'grid', gridGap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'}}>
          {this.props.images && this.props.images.map((img, idx)=>
            <div key={idx}>
              <img src={img} alt="Contribution" style={{width: 150, height: 150}}/>
            </div>
          )}
        </div>
        <input multiple id="selectedFiles" type="file" accept="image/*" style={{display: 'none'}} onChange={(event)=>this.props.addNewImages(event.target.files, true)}></input>
      </Dialog>
    );
  }
}

ManageImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageImages);