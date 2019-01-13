import { GET_ALL_CREDIT_CARDS } from "../types";

export default function creditCards(state = {}, action = {}) {
  switch(action.type) {
    case GET_ALL_CREDIT_CARDS: 
      return action.creditCards;

    default: 
      return state;
  }
}