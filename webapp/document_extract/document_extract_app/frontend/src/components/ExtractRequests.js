import React from 'react';
import { Link } from 'dva/router';

const ExtractRequests = (props) => {
  return (
    <div>
      {props.data.edges.map(({node})=><div key={node.id}>
        <Link to={`/extract-requests/${node.id}/train`}>{node.id}</Link>
      </div>)}
    </div>
  );
};

ExtractRequests.propTypes = {
};

export default ExtractRequests;
