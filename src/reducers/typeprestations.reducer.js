import {
  ADD_TYPEPRESTATIONS,
  GET_TYPEPRESTATIONS,
} from "../actions/typeprestations.action";

const initialState = { typeprestations: null };

export default function typeprestationsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TYPEPRESTATIONS:
      return { typeprestations: [action.payload, ...state.typeprestations] };
    case GET_TYPEPRESTATIONS:
      return { typeprestations: action.payload };

    default:
      return state;
  }
}
