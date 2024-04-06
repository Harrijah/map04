import { GET_FICHE } from "../actions/fiche.action";

const initialState = { show: false }

export default function ficheReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FICHE:
            return { show : action.payload};
        default: 
        return state;
    }
}


