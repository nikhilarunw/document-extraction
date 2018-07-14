import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ExtractRequestsPage from "./routes/ExtractRequestsPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/extract-requests" exact component={ExtractRequestsPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
