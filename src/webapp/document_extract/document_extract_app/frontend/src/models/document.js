import {get_document, get_documents} from "../services/document";

export default {

  namespace: 'document',

  state: { list: {
      data:{ count: 0, next: null, previous: null, results: []}, status: 'loading',
    }, detail:{ data: {} , status: 'loading'} },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *get_document({ payload }, { call, put }) {  // eslint-disable-line
      const {data, err} = yield call(get_document, payload)
      if(err){
        yield put({ type: 'set_document', payload: {data: {}, status: 'failed', message: err.message} });
      }else{
        yield put({ type: 'set_document', payload: {data: data, status: 'success', message: 'Success'} });
      }
    },
    *get_documents({ payload }, { call, put }) {  // eslint-disable-line
      const {data, err} = yield call(get_documents, payload)
      if(err){
        yield put({ type: 'set_documents', payload: {data: {count: 0, next: null, previous: null, results: []}, status: 'failed', message: err.message} });
      }else{
        yield put({ type: 'set_documents', payload: {data: data, status: 'success', message: 'Success'} });
      }
    },
  },

  reducers: {
    set_document(state, action) {
      return { ...state, detail: action.payload };
    },
    set_documents(state, action) {
      return { ...state, list: action.payload};
    },
  },

};
