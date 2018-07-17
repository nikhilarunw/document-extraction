import {get_extract_request, get_extract_requests} from "../services/extract_request";

export default {

  namespace: 'extract_request',

  state: { list: {
      data:{ count: 0, next: null, previous: null, results: []}, status: 'loading',
    }, detail:{ data: {} , status: 'loading'} },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *get_extract_request({ payload }, { call, put }) {  // eslint-disable-line
      const {data, err} = yield call(get_extract_request, payload)
      if(err){
        yield put({ type: 'set_extract_request', payload: {data: {}, status: 'failed', message: err.message} });
      }else{
        yield put({ type: 'set_extract_request', payload: {data: data, status: 'success', message: 'Success'} });
      }
    },
    *get_extract_requests({ payload }, { call, put }) {  // eslint-disable-line
      const response = yield call(get_extract_requests, payload)
      console.log(response)
      /*if(err){
        yield put({ type: 'set_extract_requests', payload: {data: {count: 0, next: null, previous: null, results: []}, status: 'failed', message: err.message} });
      }else{
        yield put({ type: 'set_extract_requests', payload: {data: data, status: 'success', message: 'Success'} });
      }*/
    },
  },

  reducers: {
    set_extract_request(state, action) {
      return { ...state, detail: action.payload };
    },
    set_extract_requests(state, action) {
      return { ...state, list: action.payload};
    },
  },

};
