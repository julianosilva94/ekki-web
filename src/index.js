import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { userLoggedIn } from './actions/auth';

if (localStorage.userJWT) {
  const user = JSON.parse(localStorage.user);
  store.dispatch(userLoggedIn(user));
}

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
)