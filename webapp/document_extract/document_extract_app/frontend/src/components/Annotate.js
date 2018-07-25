import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import AnnotateStyles from "./Annotate.css";
import {Card, CardActions, CardTitle} from "react-toolbox/lib/card/index";
import {Button} from "react-toolbox/lib/button/index";
import {BASE_URL} from "../services/config";
import {get_json} from "../services/utils";
import DocumentInspector from "./DocumentInspector";
export class Annotate extends React.Component{

  handleOnUpdateLabelValues = (data)=>{
    if(this.props.updateAnnotatedJson){
      this.props.updateAnnotatedJson(data);
    }
  }
  render(){
    const { props } = this;

    const ocrJsonObj = props.data.ocrJson;
    const annotatedJsonObj = props.data.annotatedJson;

    const data = {
      ...props.data,
      ocrJson: ocrJsonObj,
      annotatedJson: annotatedJsonObj,
    }

    return (
      <div className={AnnotateStyles.annotate}>
        <Card>
          <CardTitle
            avatar="https://image.flaticon.com/icons/svg/149/149346.svg"
            title="File"
            subtitle={props.data.status}
          />
          <CardActions>
            <Button target="_blank" href={`${BASE_URL}/media/${props.data.file}`}>View File</Button>
            <Button target="_blank" href={`${BASE_URL}/media/${props.data.ocrOutput}`}>View OCR</Button>
          </CardActions>
        </Card>


        <DocumentInspector data={data} onUpdateLabelValues={this.handleOnUpdateLabelValues}/>
      </div>
    );
  }
}

Annotate.propTypes = {
};

export default Annotate;
