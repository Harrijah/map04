import { EDIT_PRIO } from "../actions/prio.action";

const initialState = { prio: null }

export default function prioReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_PRIO:
            return { prio: action.payload }
        default:
            return state;
   }
}