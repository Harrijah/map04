import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/index.scss";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { getAllzones } from "./actions/zone.action";
import { getAllprojects } from "./actions/project.action";
import { getTodo } from "./actions/todo.action";
import { getComment } from "./actions/comment.action";
import { getLink } from "./actions/link.action";
import { getTypeprestations } from "./actions/typeprestations.action";
import { getItem } from "./actions/item.action";
import { getDescription } from "./actions/description.action";
import { getUnity } from "./actions/unity.action";
import { getUnitprice } from "./actions/addunitprice.action";
import { getMissions } from "./actions/missions.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
store.dispatch(getAllzones());
store.dispatch(getAllprojects());
store.dispatch(getTodo());
store.dispatch(getComment());
store.dispatch(getLink());
store.dispatch(getTypeprestations());
store.dispatch(getItem());
store.dispatch(getDescription());
store.dispatch(getUnity());
store.dispatch(getUnitprice());
store.dispatch(getMissions());



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
