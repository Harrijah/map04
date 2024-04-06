import { SET_MISSIONSTATUS } from "../actions/missionstatus.action";

const initialState = { statut: null }


export default function missionstatusReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MISSIONSTATUS:
            return { statut: action.payload }
        default:
            return state;
    }
}