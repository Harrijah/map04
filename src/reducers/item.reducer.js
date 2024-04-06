import { ADD_ITEM, GET_ITEM } from "../actions/item.action";

const initialState = { items: null }

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return { items: [action.payload, ...state.items]}
        case GET_ITEM:
            return { items: action.payload }
        default:
            return state;
    }
}