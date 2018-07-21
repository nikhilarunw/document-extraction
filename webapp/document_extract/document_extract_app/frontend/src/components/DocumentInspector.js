import React from 'react';
import {Card, CardTitle} from "react-toolbox/lib/card/index";
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {Tab, Tabs} from "react-toolbox/lib/tabs/index";
import Button from 'react-toolbox/lib/button';
import DocumentInspectorStyles from "./DocumentInspector.css";
import Tooltip from 'react-toolbox/lib/tooltip';
const TooltipButton = Tooltip(Button);

export class DocumentInspector extends React.Component {
  state = {
    tabIndex: 0,
    selected_texts: {},
    selected_labels: {},
    selected_values: {}
  };

  handleFixedTabChange = (index) => {
    this.setState({tabIndex: index});
  };
  handleOnClickText = (selected, index)=>{
    const {data} = this.props;
    const {selected_texts} = this.state;

    if(selected){
      selected_texts[index] = data[index]
    }else{
      delete selected_texts[index]
    }
    this.setState({selected_texts});
  };

  handleOnClickValue = (selected, index)=>{
    const {data} = this.props;
    const {selected_values} = this.state;

    if(selected){
      selected_values[index] = data[index]
    }else{
      delete selected_values[index]
    }
    this.setState({selected_values});
  };

  handleOnClickLabel = (selected, index)=>{
    const {data} = this.props;
    const {selected_labels} = this.state;

    if(selected){
      selected_labels[index] = data[index]
    }else{
      delete selected_labels[index]
    }
    this.setState({selected_labels});
  };

  handleOnClickAddToLabel = ()=>{
    let {selected_texts, selected_labels} = this.state;
    Object.assign(selected_labels, selected_texts)
    this.setState({selected_labels,selected_texts});

  }

  handleOnClickAddToValue = ()=>{
    let {selected_texts, selected_values} = this.state;
    Object.assign(selected_values, selected_texts)
    this.setState({selected_values, selected_texts});
  }

  handleOnClickClearSelection = ()=>{
    const selected_texts = {}
    this.setState({selected_texts});
  }

   handleOnClickRemoveLabels = ()=>{
    const selected_labels = {}
    this.setState({selected_labels});
  }

   handleOnClickRemoveValues = ()=>{
    const selected_values = {}
    this.setState({selected_values});
  }


  render() {
    const {props} = this;
    const {selected_texts, selected_labels, selected_values} = this.state;
    console.log('Props', props)
    return (
      <div className={DocumentInspectorStyles.document_inspector}>
        <Card>
          <CardTitle
            avatar="https://image.flaticon.com/icons/svg/149/149346.svg"
            title="OCR Output"
          />
          <Tabs index={this.state.tabIndex} onChange={this.handleFixedTabChange} fixed>
            <Tab label='All'>
              <List selectable ripple>
                <ListSubHeader caption='Texts'/>
                {props.data.map((text, index) => <div key={index}>
                  <ListCheckbox
                    checked={!!selected_texts[index]}
                    onChange={(selected)=>this.handleOnClickText(selected, index)}
                    selectable
                    caption={text[0]}
                  />
                </div>)}
              </List>
              <div className={DocumentInspectorStyles.add_to_labels_tooltip}>
                {Object.entries(selected_texts).length > 0 ? <TooltipButton label='Add to Labels' icon='add' raised primary tooltip='Add text to labels' tooltipDelay={1000} onClick={this.handleOnClickAddToLabel}/> : ''}
              </div>
              <div className={DocumentInspectorStyles.add_to_values_tooltip}>
                {Object.entries(selected_texts).length > 0 ? <TooltipButton label='Add to Values' icon='add' raised primary tooltip='Add text to Values' tooltipDelay={1000} onClick={this.handleOnClickAddToValue}/> : ''}
              </div>
              <div className={DocumentInspectorStyles.clear_selection_tooltip}>
                {Object.entries(selected_texts).length > 0 ? <TooltipButton label='Clear' icon='remove' raised primary tooltip='Clear selection' tooltipDelay={1000} onClick={this.handleOnClickClearSelection}/> : ''}
              </div>
            </Tab>
            <Tab label='Labels'>
              <List selectable ripple>
                <ListSubHeader caption='Texts'/>
                {Object.entries(selected_labels).map(([index, text]) => <div key={index}>
                  <ListItem
                    selectable
                    caption={text[0]}
                    rightActions={[<Button icon="delete" onClick={()=>this.handleOnClickLabel(false, index)}></Button>]}
                  />
                </div>)}
              </List>
            </Tab>
            <Tab label='Values'>
              <List selectable ripple>
                <ListSubHeader caption='Texts'/>
                {Object.entries(selected_values).map(([index, text]) => <div key={index}>
                  <ListItem
                    selectable
                    caption={text[0]}
                    rightActions={[<Button icon="delete" onClick={()=>this.handleOnClickValue(false, index)}></Button>]}
                  />
                </div>)}
              </List>
            </Tab>
          </Tabs>

        </Card>
      </div>
    );
  }
}

DocumentInspector.propTypes = {
};

export default DocumentInspector;
