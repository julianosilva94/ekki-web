import React, { Component } from 'react';
import { Box, Form, FormField, Button, Anchor } from 'grommet';

import { connect } from 'react-redux';

import { register } from '../actions/auth';

class Register extends Component {
  handleSubmit = event => {
    this.props.register(event.value).then(
      (res) => this.props.history.push('/dashboard'),
    ).catch(err => alert(err.response.data.error));;
  }

  render() {
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
      </Box>
    );
  }
}

export default connect(null, { register })(Register);