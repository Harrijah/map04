import axios from "axios";
export const ADD_UNITPRICE = 'ADD_UNITPRICE';
export const GET_UNITPRICE = 'GET_UNITPRICE';

export const addUnitprice = (data) => {
    return (dispatch) => {
        axios.post('https://task.axel.mg/addunitprice', data).then(() => {
            dispatch({ type: ADD_UNITPRICE, payload: data });
        });
    }
}

export const getUnitprice = () => {
    return (dispatch) => {
        axios.get('https://task.axel.mg/getunitprice').then((res) => {
            dispatch({ type: GET_UNITPRICE, payload: res.data });
        })
    }
}