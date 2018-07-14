import request from '../utils/request';
import {BASE_URL} from "./config";

export function get_extract_requests() {
  return request(`${BASE_URL}/api/extract_requests/`);
}

export function get_extract_request({params}) {
  return request(`${BASE_URL}/api/extract_requests/${params.id}`);
}

export function create_extract_request({data}) {
  return request(`${BASE_URL}/api/extract_requests/`,{
    method: 'POST',
    body: data
  });
}
export function update_extract_request({params, data}) {
  return request(`${BASE_URL}/api/extract_requests/${params.id}`,{
    method: 'PUT',
    body: data
  });
}
