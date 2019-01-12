import React, { Component } from 'react';
import { Box, Heading, Button } from 'grommet';
import { Logout } from 'grommet-icons';
import Currency from 'react-currency-formatter';

import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class AppBar extends Component {

  doLogout = () => {
    this.props.logout(); 
    this.props.history.push('/login');
  }

  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1', position: 'fixed', width: '100%' }}
        >
          <Heading level='3' margin='none'>Ekki</Heading>
          <Box background='light-1' round='small' pad='xsmall'>
            <Heading level='4' color='status-ok' margin='none' >
              Balance: <Currency quantity={this.props.user.balance} currency="USD" />
            </Heading>
          </Box>
          <Button icon={<Logout />} onClick={this.doLogout.bind(this)} label='Log Out' plain reverse />
      </Box>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.jwt,
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(AppBar);