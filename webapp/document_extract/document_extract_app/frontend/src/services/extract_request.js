import request from '../utils/request';
import gql from "graphql-tag";
import {BASE_URL, gql_client} from "./config";

export function get_extract_requests() {
  return gql_client
    .query({
      query: gql`
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
    `
    })
}

export function get_extract_request({params}) {
  return gql_client
    .query({
      query: gql`
        {
          extractRequest(id: ${params.id}) {
              id,
              status,
              documentSet
          }
        }
      `
    })
}

export function create_extract_request({data}) {
  return request(`${BASE_URL}/api/extract_requests/`, {
    method: 'POST',
    body: data
  });
}

export function update_extract_request({params, data}) {
  return request(`${BASE_URL}/api/extract_requests/${params.id}`, {
    method: 'PUT',
    body: data
  });
}
