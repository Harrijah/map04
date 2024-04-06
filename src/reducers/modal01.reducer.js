import { GET_MODAL01 } from "../actions/modal01.action";
const initialState = { isOkay: false };

export default function modal01Reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MODAL01:
            return { isOkay: action.payload };
        default:
            return state;
    }
}