import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ExtractRequestsPage from "./routes/ExtractRequestsPage";
import CreateExtractRequestPage from "./routes/CreateExtractRequestPage";
import TrainingPage from "./routes/TrainingPage";
import ExtractRequestPage from "./routes/ExtractRequestPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/extract-requests/create" exact component={CreateExtractRequestPage} />
        <Route path="/extract-requests" exact component={ExtractRequestsPage} />
        <Route path="/extract-requests/:extract_request_id" exact component={ExtractRequestPage} />
        <Route path="/extract-requests/:extract_request_id/train" exact component={TrainingPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
