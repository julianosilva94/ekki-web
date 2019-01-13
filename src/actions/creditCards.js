import { GET_ALL_CREDIT_CARDS } from '../types';
import api from '../api';

export const getAllCreditCards = (creditCards) => ({
  type: GET_ALL_CREDIT_CARDS,
  creditCards,
});

export const fetchAllCreditCards = () => (dispatch) => 
  api.creditCards.getAll().then(creditCards => {
    dispatch(getAllCreditCards(creditCards));
  });

export const addCreditCard = (values) => () =>
  api.creditCards.add(values);

export const removeCreditCard = (id) => () =>
  api.creditCards.remove(id);
