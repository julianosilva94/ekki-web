import { combineReducers } from 'redux'

import user from './user';
import transfers from './transfers';
import contacts from './contacts';

export default combineReducers({
  user,
  transfers,
  contacts,
})