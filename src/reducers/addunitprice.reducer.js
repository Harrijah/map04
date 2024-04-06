import {
    ADD_UNITPRICE,
    GET_UNITPRICE,
  } from "../actions/addunitprice.action";
  
  const initialState = { unitprices: null };
  
  export default function unitpriceReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_UNITPRICE:
        return { unitprices: [action.payload, ...state.unitprices] };
      case GET_UNITPRICE:
        return { unitprices: action.payload };
  
      default:
        return state;
    }
  }
  