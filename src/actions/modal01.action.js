export const GET_MODAL01 = 'GET_MODAL01';

export const getModal01 = (data) => {
    return (dispatch) => {
        return dispatch({ type: GET_MODAL01, payload: data });
    }
}