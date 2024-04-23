import axios from "axios";
export const SET_MISSIONSTATUS = "SET_MISSIONSTATUS";

export const setMissionstatus = (data) => {
  return (dispatch) => {
    return axios
      .put("https://task.axel.mg/updatestatusmission", data)
      .then(dispatch({ type: SET_MISSIONSTATUS, payload: data }));
  };
};
