import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { sendMessage } from '../../actions/messages';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/global/Loading';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import GroupIcon from '@material-ui/icons/Group';

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "Contact Us",
      lastEdited: "name",
      successMessage: false
    }
  }

  handleTextChange = (field, value) => {
    this.setState({[field]: value, lastEdited: field})
  }


  sendMessage = (e) => {
    e.preventDefault()
    this.props.sendMessage({
      date: new Date(),
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      subject: this.state.subject,
      message: this.state.message,
      type: this.state.type
    })
    .then(()=>this.setState({successMessage: true, lastEdited: null}))
  }

  render() {

    const MainGrid = styled.div`
      display: grid;
      justify-content: center;
      align-items: center;
      margin: 20px 30px;
      grid-gap: 40px;
    `

    const ContactForm = styled.form`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `

    const ContactDetails = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 30px;
      @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `

    const ContactCard = styled(Paper)`
      height: 180px;
      background: radial-gradient(circle, rgba(3,17,10,1) 0%, rgba(32,73,42,1) 50%);
      text-align: center;
      padding: 10px;
    `

    return (
      <MainGrid>
        <div>
          {this.props.loading && <Loading/>}
          <Typography variant="title" style={{textAlign: 'center'}} >Send us an Email with any Questions or Enquiries</Typography><br/><br/>
          {this.state.successMessage && <Typography style={{textAlign: 'center'}} variant="subheading"><b>Thank you for reaching out to us. We will get back to you promptly.</b><br/></Typography>}
          <ContactForm onSubmit={this.sendMessage}>
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              onChange={event=>this.handleTextChange(event.target.name, event.target.value)}
              value={this.state.name}
              required
              autoFocus={this.state.lastEdited==="name"}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              onChange={event=>this.handleTextChange(event.target.name, event.target.value)}
              value={this.state.email}
              required
              autoFocus={this.state.lastEdited==="email"}
            />
            <TextField
              InputProps={{
                inputComponent: ({inputRef, ...other}) => (
                  <NumberFormat
                    {...other}
                    ref={inputRef}
                    format="+1 (###) ###-####"
                    mask="_"
                    onValueChange={(values) => this.handleTextChange('phone', values.formattedValue)}
                    value={this.state.phone}
                  />
                )
              }}
              id="phone"
              name="phone"
              label="Contact Number"
              value={this.state.phone}
              fullWidth
              autoFocus={this.state.lastEdited==='phone'}
            />
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              type="text"
              fullWidth
              onChange={event=>this.handleTextChange(event.target.name, event.target.value)}
              value={this.state.subject}
              required
              autoFocus={this.state.lastEdited==="subject"}
              style={{gridColumn: '1/-1'}}
            />
            <TextField
              id="message"
              name="message"
              label="Message"
              type="text"
              fullWidth
              onChange={event=>this.handleTextChange(event.target.name, event.target.value)}
              value={this.state.message}
              required
              multiline
              rowsMax="25"
              rows="10"
              autoFocus={this.state.lastEdited==="message"}
              style={{gridColumn: '1/-1'}}
            />
            <Button type="submit" variant="contained" color="primary">Send Message</Button>
          </ContactForm>
        </div>
        <ContactDetails>
          <ContactCard elevation={24}>
            <LocationOnIcon style={{ fontSize: 65, color: 'white' }}/>
            <Typography style={{color: 'white'}} variant="title">Our Location</Typography><br/>
            <Typography style={{color: 'white'}} variant="subheading">2682 Eglinton Ave E, P.O.Box 44535, Scaroborugh, ON</Typography>
          </ContactCard>
          <ContactCard elevation={24}>
            <PhoneIcon style={{ fontSize: 65, color: 'white' }}/>
            <Typography style={{color: 'white'}} variant="title">Speak To Us</Typography><br/>
            <Typography style={{color: 'white'}} variant="subheading">+1 (647) 896 9448</Typography>
          </ContactCard>
          <ContactCard elevation={24}>
            <GroupIcon style={{ fontSize: 65, color: 'white' }}/>
            <Typography style={{color: 'white'}} variant="title">Social Media</Typography><br/>
            <Typography style={{color: 'white'}} variant="subheading">Coming Soon</Typography>
          </ContactCard>
        </ContactDetails>
      </MainGrid>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading
})

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)

