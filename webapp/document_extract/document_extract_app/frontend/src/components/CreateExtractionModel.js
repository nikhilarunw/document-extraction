import React from 'react';
import CreateExtractionModelStyles from "./CreateExtractionModel.css";
import {gql} from "apollo-boost/lib/index";
import Mutation from "react-apollo/Mutation";
import {Button} from "react-toolbox/lib/button/index";
import {RadioButton, RadioGroup} from "react-toolbox/lib/radio";
import {Form, Formik} from "formik";


const CREATE_EXTRACTION_MODEL = gql`
  mutation createExtractionModel($modelType: String!) {
    createExtractionModel(extractionModelData: {modelType: $modelType}) {
      extractionModel {
        id,
      }
    }
  }`;

export class CreateExtractionModel extends React.Component {

  handleOnCreateExtractionModel = (data) => {
    if (this.props.onCreateExtractionModel) {
      this.props.onCreateExtractionModel(data);
    }
  }

  render() {
    return (
      <div className={CreateExtractionModelStyles.create_extraction_model}>
        <Mutation mutation={CREATE_EXTRACTION_MODEL}>
          {createExtractionModel => <div>
            <Formik
              initialValues={{modelType: 'SEARCH_AND_LAYOUT'}}
              onSubmit={(values, actions) => {
                createExtractionModel({
                  variables: {
                    modelType: values.modelType,
                  }
                }).then(
                  ({data}) => {
                    actions.setSubmitting(false);
                    this.handleOnCreateExtractionModel(data.createExtractionModel.extractionModel);
                  },
                  errors => {
                    actions.setSubmitting(false);
                  }
                )
              }}
              render={({values, errors, touched, isSubmitting, setFieldValue}) => (
                <Form>
                  <h4>Please select Model Type</h4>
                  <RadioGroup
                    name='modelType' value={values.modelType}
                    onBlur={(value) => setFieldValue('modelType', value)}
                    onChange={(value) => setFieldValue('modelType', value)}>
                    <RadioButton label='Search And Layout' value='SEARCH_AND_LAYOUT'/>
                    <RadioButton label='Zonal' value='ZONAL' disabled/>
                  </RadioGroup>
                  <Button
                    label={"Create Model"}
                    type="submit"
                    disabled={isSubmitting}
                    primary/>
                </Form>
              )}
            />
          </div>
          }
        </Mutation>
      </div>
    );
  }
}

CreateExtractionModel.propTypes = {};

export default CreateExtractionModel;
