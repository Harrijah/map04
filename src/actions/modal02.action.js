export const GET_SELECTEDPROJECT = 'GET_SELECTEDPROJECT';

export const getSelectedproject = (data) => {
    return (dispatch) => {
        return dispatch({ type: GET_SELECTEDPROJECT, payload: data })
    }
}
