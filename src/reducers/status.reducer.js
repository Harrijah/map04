import { SET_STATUS } from "../actions/status.action";

const initialState = { statut: null }


export default function statusReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATUS:
            return { statut: action.payload }
        default:
            return state;
    }
}