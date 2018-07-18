import React from "react"
import { Router, Route, Switch } from 'dva/router';
import CreateExtractRequestPage from "../routes/CreateExtractRequestPage";
import ExtractRequestPage from "../routes/ExtractRequestPage";
import TrainingPage from "../routes/TrainingPage";
import ExtractRequestsPage from "../routes/ExtractRequestsPage";
import IndexPage from "../routes/IndexPage";
import {Button} from 'react-toolbox/lib/button';

export default class Application extends React.Component{
  render(){
    return <div>
      <div>
      <Button label="Hello World!" />
      </div>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/extract-requests/create" exact component={CreateExtractRequestPage} />
        <Route path="/extract-requests" exact component={ExtractRequestsPage} />
        <Route path="/extract-requests/:extract_request_id" exact component={ExtractRequestPage} />
        <Route path="/extract-requests/:extract_request_id/train" exact component={TrainingPage} />
      </Switch>
      <div>Footer</div>
    </div>
  }
}
