import React from "react";
import { Link } from "react-router-dom";

import "../styles/App.css";

const App = () => {
  return (
    <div className="app">
      <Link to={"/airbnb"}>
        <div className="app__airbnb">AirBnb</div>
      </Link>
      <Link to={"/reconnaissance"}>
        <div className="app__reconnaissance">Reconnaissance d'image</div>
      </Link>
      <Link to={"/webcamDetection"}>
        <div className="app__reconnaissance">Utilisation de la webcam</div>
      </Link>
    </div>
  );
};

export default App;
