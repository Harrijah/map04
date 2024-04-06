import axios from "axios";
export const ADD_DESCRIPTION = "ADD_DESCRIPTION";
export const GET_DESCRIPTION = "GET_DESCRIPTION";

export const addDescription = (data) => {
  return (dispatch) => {
    axios.post("https://api.axel.mg/adddescription", data).then(() => {
      dispatch({ type: ADD_DESCRIPTION, payload: data });
    });
  };
};
export const getDescription = () => {
    return (dispatch) => {
      axios.get('https://api.axel.mg/getdescription').then((res) => {
        dispatch({ type: GET_DESCRIPTION, payload: res.data });
      });
    }
}
