// actions.js
import axios from "axios";

export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComment = () => {
  return (dispatch) => {
    return axios.get("https://api.axel.mg/getcomment").then((res) => {
      dispatch({ type: GET_COMMENT, payload: res.data });
    });
  };
};

export const postComment = (data) => {
  return (dispatch) => {
    return axios.post("https://api.axel.mg/addcomment", data).then(() => {
      dispatch({ type: POST_COMMENT, payload: data });
    });
  };
};

export const editComment = (data) => {
  return (dispatch) => {
    return axios.put("https://api.axel.mg/updatecomment", data).then(() => {
        dispatch({ type: EDIT_COMMENT, payload: data });
    });
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    return axios.delete(`https://api.axel.mg/deletecomment/${id}`).then(() => {
      dispatch({ type: DELETE_COMMENT, payload: id });
    });
  };
};
