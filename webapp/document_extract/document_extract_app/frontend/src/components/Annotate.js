import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import AnnotateStyles from "./Annotate.css";
const Annotate = (props) => {
  return (
    <div className={AnnotateStyles.annotate}>
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

Annotate.propTypes = {
};

export default Annotate;
