import React from 'react';
import { connect } from 'dva';
import styles from './ExtractRequestsPage.css';
import extract_request from "../models/extract_request";
import ExtractRequest from "../components/ExtractRequest";

class ExtractRequestsPage extends React.Component{
  componentDidMount(){
    this.props.dispatch({type: 'extract_request/get_extract_requests'})
  }
  render(){
    const {extract_requests_list} = this.props;
    const { status, message, data:{ count, next, previous, results } } = extract_requests_list;

    if(status==='loading'){
      return <div>Loading...</div>
    }else if(status==='failed'){
      return <div>Failed! {message}</div>
    }

    return <div>
      {results.map(result=><ExtractRequest {...result}/>)}
    </div>
  }
}

ExtractRequestsPage.propTypes = {
};

export default connect((state)=>({
  extract_requests_list: state.extract_request.list
}))(ExtractRequestsPage);
