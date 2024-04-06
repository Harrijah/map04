import { GET_ALLZONES } from "../actions/zone.action"

const initialState = {}

export default function zoneReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALLZONES:
            return { zone: action.payload };
        default :
            return state;
    }
}