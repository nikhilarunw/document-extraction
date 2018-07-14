import {get_extract_request} from "../services/extract_request";

export default {

  namespace: 'extract_request',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *get_extract_request({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(get_extract_request, payload)
      yield put({ type: 'set_extract_request', payload: data });
    },
    *get_extract_requests({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(get_extract_requests, payload)
      yield put({ type: 'set_extract_requests', payload: data });
    },
  },

  reducers: {
    set_extract_request(state, action) {
      return { ...state, detail: action.payload};
    },
    set_extract_requests(state, action) {
      return { ...state, list: action.payload};
    },
  },

};
