import axios from "axios";
export const ADD_TYPEPRESTATIONS = 'ADD_TYPEPRESTATIONS';
export const GET_TYPEPRESTATIONS = 'GET_TYPEPRESTATIONS';

export const addTypeprestations = (data) => {
    return (dispatch) => {
        axios.post('https://api.axel.mg/addprestation', data).then(() => {
            dispatch({ type: ADD_TYPEPRESTATIONS, payload: data });
        });
    }
}

export const getTypeprestations = () => {
    return (dispatch) => {
        axios.get('https://api.axel.mg/gettypeprestations').then((res) => {
            dispatch({ type: GET_TYPEPRESTATIONS, payload: res.data });
        })
    }
}