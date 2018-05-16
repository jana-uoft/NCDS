import React, { Component } from 'react'
import Loading from './Loading';


export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
      phone: "",
      phoneError: null,
      subject: "Re: General Contact",
      subjectError: null,
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
    let nameError, subjectError, messageError, emailError;
    if (this.state.name === "") {
      nameError = "Please enter your name";
    }
    if (this.state.subject === "") {
      subjectError = "Please enter the subject";
    }
    if (this.state.message === "") {
      messageError = "What do you want to talk about?";
    }
    if (this.state.email === "") {
      emailError = "We need an email to reply back to you.";
    }
    this.setState({ nameError, subjectError, messageError, emailError })
  }
  
  sendMessage = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log()
  }

  isValid = () => {
    if (this.state.nameError)
      return false;
    if (this.state.subjectError)
      return false;
    if (this.state.messageError)
      return false;
    if (this.state.emailError)
      return false;
    if (this.state.name === "" || this.state.subject === "" || this.state.message === "" || this.state.email === "")
      return false;
    return true;
  }

  render() {

    let contactForm = (
      <form className="nobottommargin" id="template-contactform" name="template-contactform" onSubmit={this.sendMessage}>
        <div className="form-process"></div>
        <div className="col_one_third">
          <label htmlFor="template-contactform-name">Name <small>*</small></label>
          <input type="text" id="template-contactform-name" name="name" required value={this.state.name} className="sm-form-control required" onChange={this.onChange} aria-invalid={this.state.nameError!==null}/>
          <label> <small style={{color: 'red'}}>{this.state.nameError}</small></label>
        </div>

        <div className="col_one_third">
          <label htmlFor="template-contactform-email">Email <small>*</small></label>
          <input type="email" id="template-contactform-email" name="email" required value={this.state.email} className="required email sm-form-control" onChange={this.onChange}/>
          <label> <small style={{ color: 'red' }}>{this.state.emailError}</small></label>
        </div>

        <div className="col_one_third col_last">
          <label htmlFor="template-contactform-phone">Phone</label>
          <input type="text" id="template-contactform-phone" name="phone" value={this.state.phone} className="sm-form-control" onChange={this.onChange}/>
        </div>

        <div className="clear"></div>

        <div className="col_full">
          <label htmlFor="template-contactform-subject">Subject <small>*</small></label>
          <input type="text" id="template-contactform-subject" name="subject" required value={this.state.subject} className="required sm-form-control" onChange={this.onChange}/>
          <label> <small style={{ color: 'red' }}>{this.state.subjectError}</small></label>
        </div>

        <div className="clear"></div>

        <div className="col_full">
          <label htmlFor="template-contactform-message">Message <small>*</small></label>
          <textarea className="required sm-form-control" id="template-contactform-message" name="message" value={this.state.message} rows="6" cols="30" onChange={this.onChange}></textarea>
          <label> <small style={{ color: 'red' }}>{this.state.messageError}</small></label>
        </div>

        <div className="col_full">
          <button name="submit" type="submit" id="submit-button" tabIndex="5" value="Submit" className="button button-3d nomargin" onClick={this.sendMessage} disabled={!this.isValid()}>Submit</button>
        </div>
      </form>
    );

    let responseMessage;
    if (this.state.responseMessage) responseMessage = <h3 style={{ color: '#2A7992', textAlign: 'center' }}>Thank you for contacting us. We will be in touch with you. </h3>;
    if (this.state.loading) contactForm = <Loading />;


    return (
      <div className="container clearfix">
        <div className="col_full">

          {responseMessage}

          <div className="fancy-title title-dotted-border">
            <h3>Send us an Email</h3>
          </div>

          <div className="contact-widget">
            <div className="contact-form-result"></div>
            {contactForm}
          </div>
        </div>


        <div className="clear"></div>

        <div className="row clear-bottommargin">

          <div className="col-lg-4 col-md-6 bottommargin clearfix">
            <div className="feature-box fbox-center fbox-bg fbox-plain">
              <div className="fbox-icon">
                <a><i className="icon-map-marker2"></i></a>
              </div>
              <h3>Our Location<span className="subtitle">2682 Eglinton Ave E, P.O.Box 44535, Scaroborugh, ON</span></h3>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 bottommargin clearfix">
            <div className="feature-box fbox-center fbox-bg fbox-plain">
              <div className="fbox-icon">
                <a><i className="icon-phone3"></i></a>
              </div>
              <h3>Speak to Us<span className="subtitle">Name: (123) 456 7890 <br/> Name: (123) 456 7894</span></h3>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 bottommargin clearfix">
            <div className="feature-box fbox-center fbox-bg fbox-plain">
              <div className="fbox-icon">
                <a href="facebook"><i className="icon-facebook2"></i></a>
              </div>
              <h3>Find us on <span className="subtitle">Facebook<br/></span></h3>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
