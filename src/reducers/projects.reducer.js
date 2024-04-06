import { GET_ALLPROJECTS } from "../actions/project.action";

const initialState = {}

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALLPROJECTS:
            return { projects: action.payload };
        default:
            return state;
    }
}