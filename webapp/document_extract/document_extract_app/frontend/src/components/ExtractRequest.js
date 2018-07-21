import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import ExtractRequestStyles from "./ExtractRequest.css";
import {Button} from "react-toolbox/lib/button";
const ExtractRequest = (props) => {
  return (
    <div className={ExtractRequestStyles.extract_request}>
      <List selectable ripple>
        <ListSubHeader caption='All Files'/>
        {props.data.documentSet.edges.map(({node})=><div key={node.id}>
        <ListItem
          selectable
          caption='invoice.jpg'
          rightIcon={<Button href={`/#/extract_requests/${props.data.id}/train/${node.id}`}>View</Button>}
        />
      </div>)}
      </List>
    </div>
  );
};

ExtractRequest.propTypes = {
};

export default ExtractRequest;
