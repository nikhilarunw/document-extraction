import request from "../utils/request";
import {BASE_URL} from "./config";

export function get_json({params}) {
  return request(params.url);
}
