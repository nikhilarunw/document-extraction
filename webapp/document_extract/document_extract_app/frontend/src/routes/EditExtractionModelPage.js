import React from 'react';
import {connect} from 'dva';
import EditExtractionModel from "../components/EditExtractionModel";

class EditExtractionModelPage extends React.Component {
  handleOnUpdateExtractionModel = (extractionModel) => {
    //this.props.dispatch(routerRedux.push(`/extraction-models/${extractionModel.id}`))
  }

  render() {
    return <EditExtractionModel extraction_model_id={this.props.match.params.extraction_model_id}
                                onUpdateExtractionModel={this.handleOnUpdateExtractionModel}/>
  }
}

EditExtractionModelPage.propTypes = {};

export default connect()(EditExtractionModelPage);
