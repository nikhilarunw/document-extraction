import React from 'react';
import { Link } from 'dva/router';

const ExtractRequests = (props) => {
  return (
    <div>
      {props.results.map((result)=><div key={result.id}>
        <Link to={`/extract-requests/${result.id}/train`}>{result.id}</Link>
      </div>)}
    </div>
  );
};

ExtractRequests.propTypes = {
};

export default ExtractRequests;
