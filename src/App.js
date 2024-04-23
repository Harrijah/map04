import React, { useState } from "react";
import { useSelector } from "react-redux";
import Main from "./Main";
import Log from "./Log";

const App = () => {
  const isLoggedIn = useSelector((state) => state.logReducer.isLoggedIn);

  return (
    <div>
      {
        isLoggedIn ? <Main /> : <Log />
      }
    </div>
  );
};

export default App;
