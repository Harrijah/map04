import { combineReducers } from "redux";
import zoneReducer from "./dept.reducer";
import modal01Reducer from "./modal01.reducer";
import modal02Reducer from "./modal02.reducer";
import projectReducer from "./projects.reducer";
import idReducer from "./id.reducer";
import todoReducer from "./todo.reducer";
import commentReducer from "./comment.reducer";
import ficheReducer from "./fiche.reducer";
import sessionReducer from "./session.reducer";
import prioReducer from "./prio.reducer";
import linkReducer from "./link.reducer";
import statusReducer from "./status.reducer";
import typeprestationsReducer from "./typeprestations.reducer";
import itemReducer from "./item.reducer";
import descriptionReducer from "./description.reducer";
import unityReducer from "./unity.reducer";
import unitpriceReducer from "./addunitprice.reducer";
import missionReducer from "./missions.reducer";
import missionprioReducer from "./missionprio.reducer";
import missionstatusReducer from "./missionstatus.reducer";

export default combineReducers({
    zoneReducer,
    modal01Reducer,
    modal02Reducer,
    idReducer,
    projectReducer,
    todoReducer,
    commentReducer, 
    ficheReducer,
    sessionReducer,
    prioReducer,
    linkReducer,
    statusReducer,
    typeprestationsReducer,
    itemReducer,
    descriptionReducer,
    unityReducer,
    unitpriceReducer,
    missionReducer,
    missionprioReducer,
    missionstatusReducer,
});