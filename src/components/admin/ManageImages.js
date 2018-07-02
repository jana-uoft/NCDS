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
import DragSortableGrid from './DragSortableGrid';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import { isEqual } from 'lodash';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  selectButton: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    background: '#D3D3D3'
  },
  viewButton: {
    position: 'absolute',
    top: '10%',
    left: '90%',
    transform: 'translate(-50%, -50%)',
    '-ms-transform': 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    background: '#D3D3D3'
  }
};


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ManageImages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      images: props.selected.images,
      imageView: ""
    }
  }

  toggleSelect = (img) => {
    if (!this.state.selected.includes(img))
      this.setState({selected: [...this.state.selected, img]})
    else {
      let newSelected = [...this.state.selected]
      const index = newSelected.indexOf(img);
      newSelected.splice(index, 1);
      this.setState({selected: newSelected})
    }
  }

  onSort = (items, dropEvent) => {
    const images = items.map(item=>item.content.props.children[2].props.src)
    if (!isEqual(images, this.props.selected.images))
      this.setState({images}, ()=>this.props.updateSelected({...this.props.selected, images}))
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.selected && this.props.selected && (prevProps.selected.images.length !== this.props.selected.images.length)) {
      if (prevProps.selected.images.length > this.props.selected.images.length)
        this.setState({images: this.props.selected.images, selected: []})
      else
        this.setState({images: this.props.selected.images})
    }
  }

  render() {
    const { classes } = this.props;
    const imagesGrid = this.state.images.map((img, idx)=>{
      return {content: (
        <div key={idx} style={{textAlign: 'center', cursor: 'pointer'}}>
          <Checkbox
            className={classes.selectButton}
            checked={this.state.selected.includes(img)}
            onChange={()=>this.toggleSelect(img)}
            aria-label="Select"
          />
          <IconButton
            className={classes.viewButton}
            color="primary"
            aria-label="View"
            onClick={()=>this.setState({imageView: img})}
          >
            <ViewIcon />
          </IconButton>
          <img src={img} alt="Contribution" style={{width: 150, height: 150}}/>
        </div>
      )}
    })
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
        <input multiple id="selectedFiles" type="file" accept="image/*" style={{display: 'none'}} onChange={(event)=>this.props.addNewImages(event.target.files, true)}></input>
        <br/>
        <DragSortableGrid items={imagesGrid} dropBackTransitionDuration={0.3} moveTransitionDuration={0.3} onSort={this.onSort}/>

        <Dialog
          open={this.state.imageView!==""}
          onClose={()=>this.setState({imageView: ""})}
          maxWidth={false}
        >
          <div style={{maxWidth: '80vw', overflowY: 'hidden'}}>
            <img src={this.state.imageView} alt="View Single" style={{width: '100%'}}/>
          </div>
        </Dialog>
      </Dialog>
    );
  }
}

ManageImages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageImages);