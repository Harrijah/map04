import axios from "axios";
export const SET_MISSIONSTATUS = "SET_MISSIONSTATUS";

export const setMissionstatus = (data) => {
  return (dispatch) => {
    return axios
      .put("https://api.axel.mg/updatestatusmission", data)
      .then(dispatch({ type: SET_MISSIONSTATUS, payload: data }));
  };
};
