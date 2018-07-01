import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.confirmationCancel}
      aria-labelledby="Delete"
      aria-describedby="Delete Confirmation"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">{"Deleting !"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.confirmationCancel} color="inherit">
          Go Back
        </Button>
        <Button onClick={props.confirmationDelete} color="secondary" autoFocus disabled={props.disabled}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

