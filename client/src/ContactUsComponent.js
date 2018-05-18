import React, { Component } from 'react'
import Loading from './Loading';

export default class ContactUsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
      message: "",
      messageError: null,
      loading: false,
      responseMessage: null
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => { this.runValidations() });
  }


  runValidations = () => {
    let nameError, messageError, emailError;
    if (this.state.name === "") {
      nameError = "Please enter your name";
    }
    if (this.state.message === "") {
      messageError = "What do you want to talk about?";
    }
    if (this.state.email === "") {
      emailError = "We need an email to reply back to you.";
    }
    this.setState({ nameError, messageError, emailError })
  }

  sendMessage = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        subject: "Re: Listing "+this.props.type,
        message: this.state.message
      })
    })
      .then(response => response.json())
      .then(result => this.setState({ loading: false, responseMessage: true }));
  }

  isValid = () => {
    if (this.state.nameError)
      return false;
    if (this.state.messageError)
      return false;
    if (this.state.emailError)
      return false;
    if (this.state.name === "" || this.state.message === "" || this.state.email === "")
      return false;
    return true;
  }

  render() {

    let contactForm = (
      <form id="quick-contact-form" name="quick-contact-form" className="quick-contact-form nobottommargin">
        <div className="form-process"></div>

        <label htmlFor="template-contactform-name">Name <small>*</small></label>
        <input type="text" id="template-contactform-name" name="name" required value={this.state.name} className="sm-form-control required" onChange={this.onChange} aria-invalid={this.state.nameError !== null} />
        <label> <small style={{ color: 'red' }}>{this.state.nameError}</small></label>
        <br />

        <label htmlFor="template-contactform-email">Email <small>*</small></label>
        <input type="email" id="template-contactform-email" name="email" required value={this.state.email} className="required email sm-form-control" onChange={this.onChange} />
        <label> <small style={{ color: 'red' }}>{this.state.emailError}</small></label>

        <br />

        <label htmlFor="template-contactform-message">Message <small>*</small></label>
        <textarea className="required sm-form-control" id="template-contactform-message" name="message" value={this.state.message} rows="6" cols="30" onChange={this.onChange}></textarea>
        <label> <small style={{ color: 'red' }}>{this.state.messageError}</small></label>

        <br />

        <button name="submit" type="submit" id="submit-button" tabIndex="5" value="Submit" className="button button-3d nomargin" onClick={this.sendMessage} disabled={!this.isValid()}>Send Email</button>

      </form>
    );

    let responseMessage;
    if (this.state.responseMessage) responseMessage = <h3 style={{ color: '#2A7992', textAlign: 'center' }}>Thank you for contacting us. We will be in touch with you. </h3>;
    if (this.state.loading) contactForm = <Loading />;


    return (
      <div className="widget widget_links clearfix">
        <h4>Contact Us about {this.props.type} Listings</h4>
        {responseMessage}
        <div className="quick-contact-form-result"></div>
        {contactForm}
      </div>
    )
  }
}
