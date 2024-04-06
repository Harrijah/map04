import axios from "axios";
export const ADD_UNITY = "ADD_UNITY";
export const GET_UNITY = "GET_UNITY"

export const addUnity = (data) => {
    return(dispatch) => {
        axios.post('https://api.axel.mg/addunity', data).then(() => {
            dispatch({ type: ADD_UNITY, payload: data });
        });
    }
}

export const getUnity = () => { 
    return (dispatch) => {
        axios.get('https://api.axel.mg/getunity').then((res) => {
            dispatch({ type: GET_UNITY, payload: res.data });
        });
    }
}