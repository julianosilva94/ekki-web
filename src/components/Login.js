import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Form, FormField, Button, Anchor } from 'grommet';

import { connect } from 'react-redux';

import { login } from '../actions/auth';

class Login extends Component {
  handleSubmit = event => {
    this.props.login(event.value).then(
      (res) => this.props.history.push('/dashboard'),
    );
  }

  render() {
    return (
      <Box align='center' margin={{ top: '100px' }} wrap={true}>
        <h1>Ekki - Login</h1>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormField type='email' name='email' label='E-mail' required/>
          <FormField type='password' name='password' label='Password' required/>
          <Button type='submit' label='Log In'/>
          <Anchor href='/register' label='Register' margin={{left: '25px'}} />
        </Form>
      </Box>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, { login })(Login);