import React from 'react';
import {connect} from 'dva';
import gql from 'graphql-tag';
import Mutation from "react-apollo/Mutation";
import CreateExtractionModel from "../components/CreateExtractionModel";

const CREATE_EXTRACTION_MODEL = gql`
  mutation createExtractionModel($tags: JSONString!, $configJson: JSONString!){
    createExtractionModel(extractionModelData:{tags: $tags, configJson: $configJson}){
      extractionModel{
        id,
        tags,
        configJson
      }
    }
  }`;


class CreateExtractionModelPage extends React.Component {
  render() {
    return <Mutation mutation={CREATE_EXTRACTION_MODEL}>
      {createExtractionModel =>
        <CreateExtractionModel onCreateExtractionModel={(data)=>{
            return createExtractionModel({ variables: { extractionModelData: data } })
          }}
        />
      }
    </Mutation>
  }
}

CreateExtractionModelPage.propTypes = {};

export default connect()(CreateExtractionModelPage);
