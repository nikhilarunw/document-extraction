import React from 'react';
import {connect} from 'dva';
import Query from "react-apollo/Query";
import gql from 'graphql-tag';
import Annotate from "../components/Annotate";
import Mutation from "react-apollo/Mutation";

const GET_DOCUMENT = gql`
  query get_document($id: ID!) {
    document(id: $id) {
      id,
      status,
      file,
      ocrOutput,
      ocrJson,
      annotatedJson
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
        annotatedJson
      }
    }
  }`;


class AnnotatePage extends React.Component {
  render() {
    const { match: { params }} = this.props;
    return <Query
      query={GET_DOCUMENT}
      variables={{id: params.document_id}}
    >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <Mutation mutation={UPDATE_DOCUMENT}>
            {updateDocument =>
              <Annotate data={data.document}
                        updateAnnotatedJson={({texts_labels, texts_values})=>{
                          return updateDocument({ variables: { id: params.document_id, annotatedJson: JSON.stringify({texts_labels, texts_values}) } })
                        }}
              />
}
          </Mutation>
      }}
    </Query>
  }
}

AnnotatePage.propTypes = {};

export default connect()(AnnotatePage);
