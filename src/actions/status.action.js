import axios from "axios";
export const SET_STATUS = "SET_STATUS";

export const setStatus = (data) => {
  return (dispatch) => {
    return axios
      .put("https://api.axel.mg/updatestatus", data)
      .then(dispatch({ type: SET_STATUS, payload: data }));
  };
};
