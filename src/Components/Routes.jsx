import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Detail from "./Detail";
import ModifyDetail from "./ModifyDetail";
import Create from "./Create";

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
      </Switch>
    </Router>
  );
}

export default Routes;
