import axios from "axios";
export const LOG_ME = 'LOG_ME';


export const logMe = (data) => {
    return (dispatch) => {
        axios.post('https://task.axel.mg/logme', data).then((res) => {
            dispatch({ type: LOG_ME, payload: res.data });
        });
    }
}