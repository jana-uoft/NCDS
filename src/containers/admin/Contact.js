import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import Loading from '../../components/global/Loading';
import RichTextEditor from 'react-rte';
import Button from '@material-ui/core/Button';

import { getContact, updateContact } from '../../actions/contact';


const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' }
  ]
};


class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: RichTextEditor.createValueFromString(props.members, 'html'),
      contacts: RichTextEditor.createValueFromString(props.contacts, 'html'),
    }
  }

  componentDidMount = () => {
    this.props.getContact();
  }


  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!isEqual(prevProps, this.props)) {
      this.setState({members:  RichTextEditor.createValueFromString(this.props.members, 'html'), contacts:  RichTextEditor.createValueFromString(this.props.contacts, 'html')})
    }
  }

  handleTextChange = (field, value) => {
    this.setState({[field]: value })
  }

  updateContact = () => {
    this.props.updateContact({members: this.state.members.toString('html'), contacts: this.state.contacts.toString('html')})
  }


  onChange = (field, value) => {
    this.setState({ [field]: value });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };


  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 1fr'}}>
        <h2>Members Details</h2>
        <h2>Contact Details</h2>
        </div>
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr 1fr'}}>
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            value={this.state.members}
            onChange={(value) => this.onChange('members', value)}
          />
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            value={this.state.contacts}
            onChange={(value) => this.onChange('contacts', value)}
          />
        </div>
        <div style={{display: 'grid', gridGap: 20, gridTemplateColumns: '1fr', alignItems:'center', padding: '0% 20%'}}>
          <br/>
          <Button
            variant="contained"
            color="primary"
            disabled={this.props.loading}
            onClick={this.updateContact}
          >
            Update
          </Button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loading: state.general.loading,
  members: state.contact.members,
  contacts: state.contact.contacts
})

const mapDispatchToProps = dispatch => ({
  getContact: () => dispatch(getContact()),
  updateContact: contacts => dispatch(updateContact(contacts)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)