import { ADD_UNITY, GET_UNITY } from "../actions/unity.action";

const initialState = { unities: null }

export default function unityReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_UNITY:
            return { unities: [action.payload, ...state.unities]}
        case GET_UNITY:
            return { unities: action.payload }
        default:
            return state;
    }
}