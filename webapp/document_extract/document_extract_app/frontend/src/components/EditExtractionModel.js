import React from 'react';
import EditExtractionModelStyles from "./EditExtractionModel.css";
import {gql} from "apollo-boost/lib/index";
import Mutation from "react-apollo/Mutation";
import {Autocomplete} from "react-toolbox/lib/autocomplete/index";
import {Button} from "react-toolbox/lib/button/index";
import {gql_client} from "../services/config"
import DocumentInspector from "./DocumentInspector";
import Query from "react-apollo/Query";

const GET_EXTRACTION_MODEL = gql`
  query getExtractionModel($id: ID!) {
    extractionModel(id: $id) {
      id,
      tags,
      configJson,
    }
  }`;

const UPDATE_EXTRACTION_MODEL = gql`
  mutation updateExtractionModel($id: ID!, $configJson: JSONString!) {
    updateExtractionModel(extractionModelData: {id: $id, configJson: $configJson}) {
      extractionModel {
        id,
        tags,
        configJson,
      }
    }
  }`;

const GET_DOCUMENT = gql`
  query get_document($id: ID!) {
    document(id: $id) {
      id,
      status,
      file,
      ocrOutput,
      ocrJson,
      annotatedJson,
      extractRequest{
        id
      }
    }
  }`;

const UPDATE_DOCUMENT = gql`
  mutation updateDocument($id: ID!, $annotatedJson: JSONString!){
    updateDocument(documentData:{ id: $id, annotatedJson: $annotatedJson}){
      document(id: $id){
        id,
        status,
        file,
        ocrOutput,
        ocrJson,
        annotatedJson,
      }
    }
  }`;
const ALL_DOCUMENTS = gql`
    {
      allDocuments {
        edges {
          node {
            id,
            file,
          }
        }
      }
    }
  `;

export class EditExtractionModel extends React.Component {
  state = {
    selected_document_id: []
  }

  handleOnChangeSampleDocument = (selected_document_id) => {
    this.setState({selected_document_id: [selected_document_id]})
  }

  handleOnUpdateExtractionModel = (data) => {
    if (this.props.onEditExtractionModel) {
      this.props.onEditExtractionModel(data);
    }
  }
  handleOnLoadSampleDocument = (data) => {

  }

  render() {
    return (
      <div className={EditExtractionModelStyles.edit_extraction_model}>
        <Mutation mutation={UPDATE_EXTRACTION_MODEL}
                  update={(store, {data: {updateExtractionModel: {extractionModel}}}) => {
                    const data = store.readQuery({
                      query: GET_EXTRACTION_MODEL,
                      variables: {id: this.props.extraction_model_id}
                    });

                    data.extractionModel = extractionModel;

                    store.writeQuery({
                      query: GET_EXTRACTION_MODEL,
                      data,
                      variables: {id: this.props.extraction_model_id}
                    },)
                  }}>
          {updateExtractionModel =>
            <div>
              <Query query={gql`{
                        allDocuments {
                          edges {
                            node {
                              id,
                              file,
                            }
                          }
                        }
                      }
                    `}>
                {({loading, error, data}) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  return <div className={EditExtractionModelStyles.sample_files_select}>
                    <Autocomplete
                      className={EditExtractionModelStyles.sample_files_select_autocomplete}
                      direction="down"
                      selectedPosition="above"
                      label="Choose sample document"
                      hint="You can only choose one..."
                      multiple={false}
                      value={this.state.selected_document_id}
                      suggestionMatch="anywhere"
                      onChange={this.handleOnChangeSampleDocument}
                      source={data.allDocuments.edges.reduce((acc, {node}) => {
                        acc[node.id] = node.file;
                        return acc
                      }, {})}
                    />
                    <Button label={"Load Sample"}
                            primary
                            onClick={() => {
                              gql_client.query({
                                query: GET_DOCUMENT,
                                variables: {id: this.state.selected_document_id[0]}
                              }).then(({data: {document}}) => {
                                updateExtractionModel({
                                  variables: {
                                    id: this.props.extraction_model_id,
                                    configJson: JSON.stringify({
                                      ocrJson: document.ocrJson,
                                      annotatedJson: document.annotatedJson,
                                    })
                                  }
                                })
                              })
                            }}
                            className={EditExtractionModelStyles.sample_files_select_load_button}/>
                  </div>;
                }}
              </Query>
              <Query query={GET_EXTRACTION_MODEL}
                     variables={{id: this.props.extraction_model_id}}>
                {({loading, error, data}) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  const configJson = JSON.parse(data.extractionModel.configJson);

                  console.log('configJson ', configJson)

                  const documentInspectorData = {
                    ocrJson: JSON.parse(configJson.ocrJson || "[]"),
                    annotatedJson: JSON.parse(configJson.annotatedJson || "{}")
                  }

                  return <div>
                    <DocumentInspector data={documentInspectorData}
                                       onUpdateLabelValues={(data) => {
                                         updateExtractionModel({
                                           variables: {
                                             id: this.props.extraction_model_id,
                                             configJson: JSON.stringify({
                                               ocrJson: configJson.ocrJson || "[]",
                                               annotatedJson: JSON.stringify({...data}),
                                             })
                                           }
                                         })
                                       }}/>
                  </div>;
                }}
              </Query>
            </div>
          }
        </Mutation>
      </div>
    );
  }
}

EditExtractionModel.propTypes = {};

export default EditExtractionModel;
