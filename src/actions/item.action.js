import axios from "axios";
export const ADD_ITEM = "ADD_ITEM";
export const GET_ITEM = "GET_ITEM"

export const addItem = (data) => {
    return(dispatch) => {
        axios.post('https://task.axel.mg/addpriceitem', data).then(() => {
            dispatch({ type: ADD_ITEM, payload: data });
        });
    }
}

export const getItem = () => { 
    return (dispatch) => {
        axios.get('https://task.axel.mg/getpriceitem').then((res) => {
            dispatch({ type: GET_ITEM, payload: res.data });
        });
    }
}