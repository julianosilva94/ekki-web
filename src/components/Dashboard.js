import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth'

class Dashboard extends Component {
  render() {
    return (
      <h1>Dashboard</h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.jwt
  }
}

export default connect(mapStateToProps, { logout })(Dashboard);