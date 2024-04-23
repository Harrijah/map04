import axios from "axios";

export const GET_ALLPROJECTS = 'GET_ALLPROJECTS';

export const getAllprojects = () => {
    return (dispatch) => {
        return axios.get('https://task.axel.mg/getprojects').then((res) => {
            dispatch({
                type: GET_ALLPROJECTS, payload: res.data
            })
        });
    }
} 