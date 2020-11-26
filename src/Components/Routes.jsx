import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import App from "./App";
import Airbnb from "./Airbnb";
import Detail from "./Detail";
import ModifyDetail from "./ModifyDetail";
import Create from "./Create";
import Reconaissance from "./Reconnaissance";
import Historique from "./Historique";
import WebcamDetection from "./WebcamDetection";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact sensitive path="/" component={App} />
        <Route exact sensitive path="/airbnb" component={Airbnb} />
        <Route exact sensitive path="/airbnb/:id" component={Detail} />
        <Route
          exact
          sensitive
          path="/modify-detail/:id"
          component={ModifyDetail}
        />
        <Route exact sensitive path="/create" component={Create} />
        <Route
          exact
          sensitive
          path="/historique"
          component={Historique}
        />
        <Route
          exact
          sensitive
          path="/reconnaissance"
          component={Reconaissance}
        />
        <Route
          exact
          sensitive
          path="/webcamDetection"
          component={WebcamDetection}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
