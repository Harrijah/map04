import { GET_ID } from "../actions/id.action";

const initialState = { id: 5 };

export default function idReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ID:
      return {id: action.payload}
    default:
      return state;
  }
}
