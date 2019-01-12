import React, { Component } from 'react';
import { Box, Form, FormField, Button, Anchor } from 'grommet';

import { connect } from 'react-redux';

import { login } from '../actions/auth';

class Login extends Component {
  handleSubmit = event => {
    this.props.login(event.value).then(
      (res) => this.props.history.push('/dashboard'),
    ).catch(err => alert(err.response.data.error));;
  }

  render() {
    return (
      <Box align='center' margin={{ top: '100px' }} wrap={true}>
        <h1>Ekki - Login</h1>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormField type='email' name='email' label='E-mail' required/>
          <FormField type='password' name='password' label='Password' required/>
          <Button type='submit' label='Log In'/>
          <Anchor onClick={ () => { this.props.history.push('/register'); } } label='Register' margin={{left: '25px'}} />
        </Form>
      </Box>
    );
  }
}

export default connect(null, { login })(Login);