import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import CreateExtractionModel from "../components/CreateExtractionModel";

class CreateExtractionModelPage extends React.Component {
  handleOnCreateExtractionModel = (extractionModel) => {
    this.props.dispatch(routerRedux.push(`/extraction-models/${extractionModel.id}`))
  }

  render() {
    return <CreateExtractionModel onCreateExtractionModel={this.handleOnCreateExtractionModel}/>
  }
}

CreateExtractionModelPage.propTypes = {};

export default connect()(CreateExtractionModelPage);
