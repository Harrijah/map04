import axios from "axios";

export const EDIT_PRIO = "EDIT_PRIO";

export const editPrio = (data) => {
  return (dispatch) => {
    return axios
      .put("https://task.axel.mg/updateprio", data)
      .then(dispatch({ type: EDIT_PRIO, payload: data }));
  };
};
