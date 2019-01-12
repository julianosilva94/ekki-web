import { GET_USER_DATA } from '../types';
import api from '../api';

export const getUserData = (user) => ({
  type: GET_USER_DATA,
  user,
});

export const getData = () => (dispatch) => 
  api.user.getData().then(user => {
    dispatch(getUserData(user));
  });
