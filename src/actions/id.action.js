export const GET_ID = 'GET_ID';

export const getID = (data) => {
    return (dispatch) => {
        return dispatch({ type: GET_ID, payload: data })
    }
}