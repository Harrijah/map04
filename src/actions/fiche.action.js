export const GET_FICHE = 'GET_FICHE';

export const getFiche = (data) => {
    return (dispatch) => {
        return dispatch({ type: GET_FICHE, payload: data })
    }
}

