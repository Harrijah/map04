import { ADD_DESCRIPTION, GET_DESCRIPTION } from "../actions/description.action";

const initialState = { descriptions: null }

export default function descriptionReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DESCRIPTION:
            return { descriptions: [action.payload, ...state.descriptions] }
        case GET_DESCRIPTION:
            return { descriptions : action.payload }
        default:
            return state;
    }
} 