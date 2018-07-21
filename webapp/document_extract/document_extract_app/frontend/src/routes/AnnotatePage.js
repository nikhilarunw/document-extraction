import React from 'react';
import {connect} from 'dva';
import Query from "react-apollo/Query";
import {gql} from "apollo-boost";
import Annotate from "../components/Annotate";


class AnnotatePage extends React.Component {
  render() {
    const { match: { params }} = this.props;
    return <Query
      query={gql`
        {
         extractRequest(id: "${params.extract_request_id}") {
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
    `}
    >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <Annotate data={data.document}/>;
      }}
    </Query>
  }
}

AnnotatePage.propTypes = {};

export default connect()(AnnotatePage);
