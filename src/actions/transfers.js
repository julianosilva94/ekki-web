import { GET_ALL_TRANSFERS } from '../types';
import api from '../api';

export const getAllTransfers = (transfers) => ({
  type: GET_ALL_TRANSFERS,
  transfers,
});

export const fetchAllTransfers = () => (dispatch) => 
  api.transfers.getAll().then(transfers => {
    dispatch(getAllTransfers(transfers));
  });

export const createTransfer = (values) => () =>
  api.transfers.create(values);
