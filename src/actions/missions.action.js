import axios from "axios";

export const GET_MISSIONS = "GET_MISSIONS";

export const getMissions = () => {
    return (dispatch) => {
        return axios.get('https://api.axel.mg/getmissions').then((res) => {
            dispatch({
                type: GET_MISSIONS, payload: res.data
            })
        });
    }
}