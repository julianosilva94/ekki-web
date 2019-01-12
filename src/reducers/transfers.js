import { GET_ALL_TRANSFERS } from "../types";

export default function transfers(state = {}, action = {}) {
  switch(action.type) {
    case GET_ALL_TRANSFERS: 
      return action.transfers;

    default: 
      return state;
  }
}