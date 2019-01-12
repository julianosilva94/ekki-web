import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './auth';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const RootRoute = ({ ...rest }) => (
  <Route { ...rest } render={props => (
    isAuthenticated() ? (
      <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  )} />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={props => (
    !isAuthenticated() ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={props => (
    isAuthenticated() ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )
  )} />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RootRoute exact path='/' />
      <PublicRoute exact path='/login' component={Login} />
      <PublicRoute exact path='/register' component={Register} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;