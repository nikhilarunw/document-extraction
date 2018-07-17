import React from 'react';
import { connect } from 'dva';
import CreateExtractRequest from "../components/CreateExtractRequest";

class CreateExtractRequestPage extends React.Component{
  componentDidMount(){
    this.props.dispatch({type: 'extract_request/set_extract_requests', payload: {data: {}, status: 'success', message: 'Success'}})
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
      <CreateExtractRequest {...extract_requests_list.data}/>
    </div>
  }
}

CreateExtractRequestPage.propTypes = {
};

export default connect((state)=>({
  extract_requests_list: state.extract_request.list
}))(CreateExtractRequestPage);
