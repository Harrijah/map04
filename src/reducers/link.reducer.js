// reducer.js
import {
    DELETE_LINK,
    GET_LINK,
    POST_LINK,
    EDIT_LINK,
  } from "../actions/link.action";
  
  const initialState = { links: null };
  
  export default function linkReducer(state = initialState, action) {
    switch (action.type) {
      case GET_LINK:
        return { links: action.payload };
      case POST_LINK:
        return { links: [action.payload, ...state.links] };
      case EDIT_LINK:
        const updatedlinks = state.links.map((link) =>
          link.id === action.payload.id
            ? { ...link, ...action.payload }
            : link
        );
        return { links: updatedlinks };
      case DELETE_LINK:
        const filteredlinks = state.links.filter(
          (link) => link.id !== action.payload
        );
        return { links: filteredlinks };
      default:
        return state;
    }
  }
  