import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/Loading';
import { getMessages, deleteMessage } from '../../actions/messages';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import { format } from 'date-fns'
import Typography from '@material-ui/core/Typography';


class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteConfirmation: false
    }
  }

  componentDidMount() {
    this.props.getMessages()
  }

  deleteConfirmationProceed = () => this.setState({deleteConfirmation: false})
  deleteConfirmationCancel = () => this.setState({deleteConfirmation: false})

  deleteMessage = (messageID) => {
    this.deleteConfirmationProceed = () => {
      this.setState({deleteConfirmation: false}, ()=>{
        this.props.deleteMessage(messageID)
      })
    }
    this.setState({deleteConfirmation: true})
  }

  renderRow = (message, idx) => {
    return (
      <Paper key={idx} style={{display: 'grid', gridGap: 10, gridTemplateColumns: 'repeat(7, 150px) 1fr', alignItems: 'center', gridAutoRows: 50}}>
        <IconButton color="secondary" aria-label="delete" onClick={()=>this.deleteMessage(message._id)}><DeleteIcon /></IconButton>
        <div>{format(Date.parse(message.date), 'dddd, Do MMMM YYYY')}</div>
        <div>{message.type}</div>
        <div>{message.name}</div>
        <div>{message.email}</div>
        <div>{message.phone}</div>
        <div>{message.subject}</div>
        <div>{message.message}</div>
      </Paper>
    )
  }

  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <Paper style={{display: 'grid', gridGap: 10, gridTemplateColumns: 'repeat(7, 150px) 1fr', alignItems: 'center'}}>
          <div/>
          <div><b>Date</b></div>
          <div><b>Type</b></div>
          <div><b>Name</b></div>
          <div><b>Email</b></div>
          <div><b>Phone</b></div>
          <div><b>Subject</b></div>
          <div><b>Message</b></div>
        </Paper>
        <br/>
        <div style={{display: 'grid', gridGap: 20}}>
          {this.props.messages.length===0 && <Typography variant='title'> No messages to display </Typography>}
          {this.props.messages.map(this.renderRow)}
        </div>
        <DeleteConfirmation
          open={this.state.deleteConfirmation}
          confirmationDelete={this.deleteConfirmationProceed}
          confirmationCancel={this.deleteConfirmationCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.general.loading,
  messages: state.messages
})

const mapDispatchToProps = dispatch => ({
  getMessages: () => dispatch(getMessages()),
  deleteMessage: messageID => dispatch(deleteMessage(messageID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)