// actions.js
import axios from "axios";

export const GET_TODO = "GET_TODO";
export const POST_TODO = "POST_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const getTodo = () => {
  return (dispatch) => {
    return axios.get("https://api.axel.mg/getitem").then((res) => {
      dispatch({ type: GET_TODO, payload: res.data });
    });
  };
};

export const postTodo = (data) => {
  return (dispatch) => {
    return axios.post("https://api.axel.mg/addtodo", data).then(() => {
      dispatch({ type: POST_TODO, payload: data });
    });
  };
};

export const editTodo = (data) => {
  return (dispatch) => {
    return axios.put("https://api.axel.mg/updateitem", data).then(() => {
        dispatch({ type: EDIT_TODO, payload: data });
    });
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    return axios.delete(`https://api.axel.mg/deleteitem/${id}`).then(() => {
      dispatch({ type: DELETE_TODO, payload: id });
    });
  };
};
