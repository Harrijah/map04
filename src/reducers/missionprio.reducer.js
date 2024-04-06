import { EDIT_MISSIONPRIO } from "../actions/missionprio.action";

const initialState = { prio: null }

export default function missionprioReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_MISSIONPRIO:
            return { prio: action.payload }
        default:
            return state;
   }
}