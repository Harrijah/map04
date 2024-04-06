// reducer.js
import {
  DELETE_COMMENT,
  GET_COMMENT,
  POST_COMMENT,
  EDIT_COMMENT,
} from "../actions/comment.action";

const initialState = { comments: null };

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return { comments: action.payload };
    case POST_COMMENT:
      return { comments: [action.payload, ...state.comments] };
    case EDIT_COMMENT:
      const updatedComments = state.comments.map((comment) =>
        comment.id === action.payload.id
          ? { ...comment, ...action.payload }
          : comment
      );
      return { comments: updatedComments };
    case DELETE_COMMENT:
      const filteredComments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return { comments: filteredComments };
    default:
      return state;
  }
}
