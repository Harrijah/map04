import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logMe } from "./actions/log.action";
// import { useRef } from 'react';

const Log = () => {
  const dispatch = useDispatch();
  const logform = useRef();
  const logclient = (e) => {
    e.preventDefault();
    const data = {
      log: logform.current[0].value,
      pwd: logform.current[1].value,
    };
    if (logform.current[0].value == '' || logform.current[1].value == '') {
      e.preventDefault();
      alert('Veuillez remplir les champs')
    } else {
      e.preventDefault();
      dispatch(logMe(data));
    }
    dispatch(logMe(data));
  };

  return (
    <div id="accesslog">
      <div className="container">
        <h2>Accéder aux projets</h2>
        <form ref={logform} onSubmit={(e) => logclient(e)}>
          <input type="text" name="log" id="log" />
          <input type="password" name="pwd" id="pwd" />
          <input type="submit" id="submit" name="submit" value="Valider" />
        </form>
      </div>
    </div>
  );
};

export default Log;
