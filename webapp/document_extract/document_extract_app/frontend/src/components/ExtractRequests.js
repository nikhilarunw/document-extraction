import React from 'react';
import { Link } from 'dva/router';
import {Card, CardMedia, CardText, CardTitle, CardActions} from "react-toolbox/lib/card";
import {Button} from "react-toolbox/lib/button";
import ExtractRequestsStyles from "./ExtractRequests.css";
const ExtractRequests = (props) => {
  return (
    <div className={ExtractRequestsStyles.extract_requests}>
      <h2>Extraction Requests</h2>
      {props.data.edges.map(({node})=><div key={node.id}>
        <Card>
          <CardTitle
            avatar="https://image.flaticon.com/icons/svg/149/149346.svg"
            title="Documents"
            subtitle={node.status}
          />
          <CardActions>
            <Button primary href={`#/extract-requests/${node.id}/`}>
              View
            </Button>
          </CardActions>
        </Card>
      </div>)}
    </div>
  );
};

ExtractRequests.propTypes = {
};

export default ExtractRequests;
