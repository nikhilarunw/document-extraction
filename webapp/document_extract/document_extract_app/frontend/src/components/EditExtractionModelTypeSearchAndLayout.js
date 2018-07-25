import React from 'react';
import CreateExtractionModelStyles from "./CreateExtractionModel.css";

import {Card, CardActions, CardTitle} from "react-toolbox/lib/card/index";
import {Autocomplete} from "react-toolbox/lib/autocomplete/index";
import {gql} from "apollo-boost/lib/index";
import Query from "react-apollo/Query";
import Mutation from "react-apollo/Mutation";
import Annotate from "./Annotate";
import {Button} from "react-toolbox/lib/button/index";

const CREATE_EXTRACTION_MODEL = gql`
  mutation createExtractionModel($tags: JSONString!, $configJson: JSONString!) {
    createExtractionModel(extractionModelData: {tags: $tags, configJson: $configJson}) {
      extractionModel{
        id
        tags
        configJson
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

export class CreateExtractionModel extends React.Component{
  state = {
    selected_document_id: []
  }

  handleOnChangeSampleDocument = (selected_document_id)=>{
    console.log(selected_document_id)
    this.setState({selected_document_id: [selected_document_id]})
  }
  handleOnCreateExtractionModel = (data)=>{
    if(this.props.onCreateExtractionModel){
      this.props.onCreateExtractionModel(data);
    }
  }
  render(){
    const { props } = this;
    return (
      <div className={CreateExtractionModelStyles.create_extraction_model}>

        <Query query={gql`
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
        `}
        >
          {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <Autocomplete
              direction="down"
              selectedPosition="above"
              label="Choose sample document"
              hint="You can only choose one..."
              multiple={false}
              value={this.state.selected_document_id}
              suggestionMatch="anywhere"
              onChange={this.handleOnChangeSampleDocument}
              source={data.allDocuments.edges.reduce((acc,{node})=>{
                acc[node.id] = node.file;
                return acc
              }, {})}
            />;
          }}
        </Query>
        { this.state.selected_document_id && !!this.state.selected_document_id.length && <Query query={GET_DOCUMENT}
             variables={{id: this.state.selected_document_id}}>
            {({loading, error, data}) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return <div>
                <Mutation mutation={UPDATE_DOCUMENT}>
                  {updateDocument => <Annotate data={data.document}
                    updateAnnotatedJson={({texts_labels, texts_values})=>{
                      return updateDocument({ variables: { id: this.state.selected_document_id, annotatedJson: JSON.stringify({texts_labels, texts_values}) } })
                    }}
                  />}
                </Mutation>
                <Mutation mutation={CREATE_EXTRACTION_MODEL}>
                  {createExtractionModel =>
                    <Button
                        label={"Create Model"}
                        onClick={()=>{
                        return createExtractionModel({variables: {
                          tags: JSON.stringify([data.document.extractRequest.id]), configJson: JSON.stringify({'sample_document': data.document})
                        }})
                    }}/>}
                </Mutation>
              </div>
            }}
          </Query>}
      </div>
    );
  }
}

CreateExtractionModel.propTypes = {
};

export default CreateExtractionModel;
