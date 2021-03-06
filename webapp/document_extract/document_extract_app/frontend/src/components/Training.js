import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import TrainingStyles from "./Training.css";
const Training = (props) => {
  return (
    <div className={TrainingStyles.training}>
      <List selectable ripple>
        <ListSubHeader caption='All Files'/>
        {props.data.documentSet.edges.map(({node})=><div key={node.id}>
        <ListItem
          selectable
          caption='invoice.jpg'
          rightIcon='star'
        />
      </div>)}
      </List>
    </div>
  );
};

Training.propTypes = {
};

export default Training;
