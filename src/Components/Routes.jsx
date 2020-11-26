import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Detail from "./Detail";
import ModifyDetail from "./ModifyDetail";
import Create from "./Create";
import Reconaissance from "./Reconnaissance";
import AppReconnaissance from "./AppReconnaissance";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact sensitive path="/" component={App} />
        <Route exact sensitive path="/lieu/:id" component={Detail} />
        <Route
          exact
          sensitive
          path="/modify-detail/:id"
          component={ModifyDetail}
        />
        <Route exact sensitive path="/create/" component={Create} />
        <Route
          exact
          sensitive
          path="/reconnaissance/"
          component={AppReconnaissance}
        />
        <Route
          exact
          sensitive
          path="/reconnaissance/img"
          component={Reconaissance}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
