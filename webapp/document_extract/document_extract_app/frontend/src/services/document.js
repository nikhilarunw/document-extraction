import request from '../utils/request';
import {BASE_URL} from "./config";

export function get_documents() {
  return request(`${BASE_URL}/api/documents/`);
}

export function get_document({params}) {
  return request(`${BASE_URL}/api/documents/${params.id}`);
}

export function create_document({data}) {
  return request(`${BASE_URL}/api/documents/`,{
    method: 'POST',
    body: data
  });
}
export function update_document({params, data}) {
  return request(`${BASE_URL}/api/documents/${params.id}`,{
    method: 'PUT',
    body: data
  });
}
