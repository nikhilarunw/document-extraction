import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ExtractRequestsPage from "./routes/ExtractRequestsPage";
import CreateExtractRequestPage from "./routes/CreateExtractRequestPage";
import TrainingPage from "./routes/TrainingPage";
import ExtractRequestPage from "./routes/ExtractRequestPage";
import { ApolloProvider } from "react-apollo";
import { gql_client } from "./services/config";
import Application from "./components/Application";

function RouterConfig({ history }) {
  return (
    <ApolloProvider client={gql_client}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={IndexPage}/>
            <Route path="/" component={Application}/>
        </Switch>
        </Router>
    </ApolloProvider>
  );
}

export default RouterConfig;
