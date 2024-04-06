import axios from "axios";

export const GET_ALLZONES = 'GET_ALLZONES';

export const getAllzones = () => {
    return (dispatch) => {
        return axios.get('https://api.axel.mg/afficherzone').then((res) => {
            dispatch({type: GET_ALLZONES, payload: res.data})
        });
    }
}