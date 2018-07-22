import React from 'react';
import {connect} from 'dva';
import Query from "react-apollo/Query";
import {gql} from "apollo-boost";
import Training from "../components/Training";

const GET_EXTRACT_REQUEST = gql`
      query getExtractRequest($id: ID!){
        extractRequest(id: $id) {
        id,
          status,
          documentSet {
            edges {
              node {
                id
              }
            }
          }
       }
      }
    `;

class TrainingPage extends React.Component {
  render() {
    const { match: { params }} = this.props;
    return <Query
      query={GET_EXTRACT_REQUEST}
      variables={{id: params.extract_request_id }}
    >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <Training data={data.extractRequest}/>;
      }}
    </Query>
  }
}

TrainingPage.propTypes = {};

export default connect()(TrainingPage);
