import { GET_ALL_CONTACTS } from '../types';
import api from '../api';

export const getAllContacts = (contacts) => ({
  type: GET_ALL_CONTACTS,
  contacts,
});

export const fetchAllContacts = () => (dispatch) => 
  api.contacts.getAll().then(contacts => {
    dispatch(getAllContacts(contacts));
  });

export const addContact = (values) => () =>
  api.contacts.add(values);

export const removeContact = (id) => () =>
  api.contacts.remove(id);
