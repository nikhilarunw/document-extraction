import React from 'react';
import { connect } from 'dva';
import ExtractRequests from "../components/ExtractRequests";

class ExtractRequestsPage extends React.Component{
  componentDidMount(){
    this.props.dispatch({type: 'extract_request/get_extract_requests'})
  }
  render(){
    const {extract_requests_list} = this.props;
    const { status, message } = extract_requests_list;

    if(status==='loading'){
      return <div>Loading...</div>
    }else if(status==='failed'){
      return <div>Failed! {message}</div>
    }

    return <div>
      <ExtractRequests {...extract_requests_list.data}/>
    </div>
  }
}

ExtractRequestsPage.propTypes = {
};

export default connect((state)=>({
  extract_requests_list: state.extract_request.list
}))(ExtractRequestsPage);
