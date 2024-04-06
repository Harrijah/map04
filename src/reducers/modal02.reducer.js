import { GET_SELECTEDPROJECT } from "../actions/modal02.action";

const initialState = { productshow: false };

export default function modal02Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SELECTEDPROJECT:
      return { productshow: action.payload };
    default:
      return state;
  }
}
