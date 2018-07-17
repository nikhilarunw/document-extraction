import ApolloClient from "apollo-boost";

export const BASE_URL = 'http://localhost:8000';

export const gql_client = new ApolloClient({
  uri: `${BASE_URL}/api/graphql/`
});
