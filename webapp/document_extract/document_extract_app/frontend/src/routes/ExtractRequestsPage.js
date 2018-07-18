import React from 'react';
import {connect} from 'dva';
import Query from "react-apollo/Query";
import {gql} from "apollo-boost";
import ExtractRequests from "../components/ExtractRequests";


class ExtractRequestsPage extends React.Component {
  render() {
    return <Query
      query={gql`
      {
        allExtractRequests {
          edges {
            node {
              id,
              status,
            }
          }
        }
      }
    `}
    >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <ExtractRequests data={data.allExtractRequests}/>;
      }}
    </Query>
  }
}

ExtractRequestsPage.propTypes = {};

export default connect()(ExtractRequestsPage);
