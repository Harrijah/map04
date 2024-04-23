import { LOG_ME } from "../actions/log.action";

const initialState = { isLoggedIn: false }


export default function logReducer(state = initialState, action) {
    switch(action.type){
        case LOG_ME: 
            return action.payload;
        default: 
            return state;
    }
}