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
      aria-labelledby="Unsaved Changes"
      aria-describedby="Unsaved Changes Confirmation"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">{"Unsaved changes detected !"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are currently in editing mode. Please save or discard your changes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.confirmationCancel} color="inherit">
          Go Back
        </Button>
        <Button onClick={props.confirmationDiscard} color="secondary">
          Discard Changes
        </Button>
        <Button onClick={props.confirmationSave} color="primary" autoFocus disabled={props.disabled}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

