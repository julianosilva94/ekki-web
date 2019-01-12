import { GET_ALL_CONTACTS } from "../types";

export default function contacts(state = {}, action = {}) {
  switch(action.type) {
    case GET_ALL_CONTACTS: 
      return action.contacts;

    default: 
      return state;
  }
}