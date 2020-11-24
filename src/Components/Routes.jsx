import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Detail from "./Detail";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact sensitive path="/" component={App} />
        <Route exact sensitive path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default Routes;
