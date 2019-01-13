import React, { Component } from 'react';
import { Box, Form, FormField, Button, Anchor } from 'grommet';

import Notification from './Notification';

import { connect } from 'react-redux';

import { register } from '../actions/auth';

class Register extends Component {
  state = {
    notificationOpen: false,
    notificationMessage: '',
    notificationError: false,
  }

  handleSubmit = event => {
    this.props.register(event.value).then(
      (res) => this.props.history.push('/dashboard'),
    ).catch(err => this.showNotification.bind(this)(err.response.data.error, true));
  }

  showNotification = (notificationMessage, error = false) => {
    this.setState({ 
      notificationMessage,
      notificationOpen: true,
      notificationError: error
    });
    
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }

  closeNotification = () => {
    this.setState({ notificationOpen: false });
  }

  render() {
    const { notificationOpen, notificationMessage, notificationError } = this.state;

    return (
      <Box align='center' margin={{ top: '100px' }} wrap={true}>
        <h1>Ekki - Register</h1>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormField type='text' name='name' label='Your Name' required/>
          <FormField type='email' name='email' label='E-mail' required/>
          <FormField type='password' name='password' label='Password' required/>
          <Button type='submit' label='Submit'/>
          <Anchor onClick={ () => { this.props.history.push('/login'); } } label='Back to Login' margin={{left: '25px'}} />
        </Form>
        {notificationOpen && 
          <Notification 
            message={notificationMessage}
            error={notificationError}
            onClose={this.closeNotification.bind(this)} />
        }
      </Box>
    );
  }
}

export default connect(null, { register })(Register);