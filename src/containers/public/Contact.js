import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { sendMessage } from '../../actions/messages';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', gridAutoRows: '80vh'}}>
        <Paper style={{width: 750}}>
          Send us an a message
          <TextField
            name="name"
            label="Name"
            type="text"
            fullWidth
            autoFocus
            onChange={this.handleTextChange}
            value={this.state.name}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            onChange={this.handleTextChange}
            value={this.state.email}
            required
          />
          <TextField
            name="subject"
            label="Subject"
            type="text"
            fullWidth
            autoFocus
            onChange={this.handleTextChange}
            value={this.state.subject}
            required
          />
          <TextField
            name="message"
            label="Message"
            type="text"
            fullWidth
            autoFocus
            onChange={this.handleTextChange}
            value={this.state.message}
            required
            multiline
            rowsMax="15"
          />
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)

