import React from 'react';
import { connect } from 'dva';
import ExtractRequest from "../components/ExtractRequest";

class ExtractRequestPage extends React.Component{
  componentDidMount(){
    const { match:{ params: { extract_request_id }}} = this.props;
    const payload = {params: {id: extract_request_id}}
    this.props.dispatch({type: 'extract_request/get_extract_request', payload: payload})
  }
  render(){
    const {extract_request_detail} = this.props;
    const { status, message } = extract_request_detail;

    if(status==='loading'){
      return <div>Loading...</div>
    }else if(status==='failed'){
      return <div>Failed! {message}</div>
    }

    return <div>
      <ExtractRequest data={extract_request_detail.data}/>
    </div>
  }
}

ExtractRequestPage.propTypes = {
};

export default connect((state)=>({
  extract_request_detail: state.extract_request.detail
}))(ExtractRequestPage);
