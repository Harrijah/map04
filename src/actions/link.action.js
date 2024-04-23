  // actions.js
import axios from "axios";

export const GET_LINK = "GET_LINK";
export const POST_LINK = "POST_LINK";
export const EDIT_LINK = "EDIT_LINK";
export const DELETE_LINK = "DELETE_LINK";

export const getLink = () => {
  return (dispatch) => {
    return axios.get("https://task.axel.mg/getlink").then((res) => {
      dispatch({ type: GET_LINK, payload: res.data });
    });
  };
};

export const postLink = (data) => {
  return (dispatch) => {
    return axios.post("https://task.axel.mg/addlink", data).then(() => {
      dispatch({ type: POST_LINK, payload: data });
    });
  };
};

export const editLink = (data) => {
  return (dispatch) => {
    return axios.put("https://task.axel.mg/updatelink", data).then(() => {
        dispatch({ type: EDIT_LINK, payload: data });
    });
  };
};

export const deleteLink = (id) => {
  return (dispatch) => {
    return axios.delete(`https://task.axel.mg/deletelink/${id}`).then(() => {
      dispatch({ type: DELETE_LINK, payload: id });
    });
  };
};
