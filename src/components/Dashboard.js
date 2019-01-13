import React, { Component } from 'react';
import { Box, Heading, Button, Tabs, Tab } from 'grommet';

import { connect } from 'react-redux';
import { getData } from '../actions/user';

import AppBar from './AppBar';
import Transfers from './Transfers';
import Contacts from './Contacts';
import CreditCards from './CreditCards';

class Dashboard extends Component {
  componentWillMount = async () => {
      await this.props.getData();
  }

  render() {
    return (
      <Box>
        <AppBar history={this.props.history} />
        <Box margin={{ top: '60px'}} pad='medium'>
          <Tabs>
            <Tab title='Transfers'>
              <Transfers/>
            </Tab>
            <Tab title='Credit Cards'>
              <CreditCards/>
            </Tab>
            <Tab title='Contacts'>
              <Contacts/>
            </Tab>
          </Tabs>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.jwt
  }
}

export default connect(mapStateToProps, { getData })(Dashboard);