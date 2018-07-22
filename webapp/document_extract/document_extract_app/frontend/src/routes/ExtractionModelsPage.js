import React from 'react';
import {connect} from 'dva';
import Query from "react-apollo/Query";
import {gql} from "apollo-boost";
import ExtractionModels from "../components/ExtractionModels";


class ExtractionModelsPage extends React.Component {
  render() {
    return <Query
      query={gql`
      {
        allExtractionModels {
          edges {
            node {
              id,
              tags,
            }
          }
        }
      }
    `}
    >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <ExtractionModels data={data.allExtractionModels}/>;
      }}
    </Query>
  }
}

ExtractionModelsPage.propTypes = {};

export default connect()(ExtractionModelsPage);
