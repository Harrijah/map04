import { GET_MISSIONS } from "../actions/missions.action";

const initialState = {};


export default function missionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MISSIONS:
            return action.payload ;
        default:
            return state;
    }
}