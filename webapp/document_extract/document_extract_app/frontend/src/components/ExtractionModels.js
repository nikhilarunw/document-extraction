import React from 'react';
import { Link } from 'dva/router';
import {Card, CardMedia, CardText, CardTitle, CardActions} from "react-toolbox/lib/card";
import {Button} from "react-toolbox/lib/button";
import ExtractionModelsStyles from "./ExtractionModels.css";
const ExtractionModels = (props) => {
  return (
    <div className={ExtractionModelsStyles.extraction_models}>
      <div className={ExtractionModelsStyles.page_header}>
        <h2 className={ExtractionModelsStyles.page_title}>Extraction Models</h2>
        <div className={ExtractionModelsStyles.page_actions}>
          <Button href={"/#/extraction-models/create"} floating accent icon={"add"}/>
        </div>
      </div>
      {props.data.edges.map(({node})=><div key={node.id}>
        <Card>
          <CardTitle
            avatar="https://image.flaticon.com/icons/svg/149/149346.svg"
            title="Model"
          />
          <CardActions>
            <Button primary href={`/#/extraction-models/${node.id}/`}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </div>)}
    </div>
  );
};

ExtractionModels.propTypes = {
};

export default ExtractionModels;
