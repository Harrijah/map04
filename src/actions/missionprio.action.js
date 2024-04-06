import axios from "axios";

export const EDIT_MISSIONPRIO = "EDIT_MISSIONPRIO";

export const editMissionprio = (data) => {
  return (dispatch) => {
    return axios
      .put("https://api.axel.mg/updatepriomission", data)
      .then(dispatch({ type: EDIT_MISSIONPRIO, payload: data }));
  };
};
