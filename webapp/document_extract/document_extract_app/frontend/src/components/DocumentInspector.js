import React from 'react';
import {Card, CardTitle} from "react-toolbox/lib/card/index";
import {List, ListCheckbox, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import {Tab, Tabs} from "react-toolbox/lib/tabs/index";
import Button from 'react-toolbox/lib/button';
import DocumentInspectorStyles from "./DocumentInspector.css";
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);

export class DocumentInspector extends React.Component {
  state = {
    tabIndex: 0,
    selected_texts: {},
  };

  onUpdateLabelValues = ({texts_labels, texts_values}) => {
    if (this.props.onUpdateLabelValues) {
      this.props.onUpdateLabelValues({texts_labels, texts_values})
    }
  }

  handleFixedTabChange = (index) => {
    this.setState({tabIndex: index});
  };
  handleOnClickText = (selected, index) => {
    const {data: {ocrJson: {texts}}} = this.props;
    const {selected_texts} = this.state;

    if (selected) {
      selected_texts[index] = texts[index]
    } else {
      delete selected_texts[index]
    }
    this.setState({selected_texts});
  };

  handleOnClickValue = (selected, index) => {
    const {data: {ocrJson: {texts}, annotatedJson: {texts_values = {}, texts_labels = {}}}} = this.props;
    if (selected) {
      texts_values[index] = texts[index]
    } else {
      delete texts_values[index]
    }
    this.onUpdateLabelValues({texts_values, texts_labels});
  };

  handleOnClickLabel = (selected, index) => {
    const {data: {ocrJson: {texts}, annotatedJson: {texts_values = {}, texts_labels = {}}}} = this.props;
    if (selected) {
      texts_labels[index] = texts[index]
    } else {
      delete texts_labels[index]
    }
    this.onUpdateLabelValues({texts_values, texts_labels});
  };

  handleOnClickAddToLabel = () => {
    const {selected_texts} = this.state;
    const {data: {ocrJson: {texts}, annotatedJson: {texts_values = {}, texts_labels = {}}}} = this.props;
    Object.assign(texts_labels, selected_texts);
    this.onUpdateLabelValues({texts_values, texts_labels});
  }

  handleOnClickAddToValue = () => {
    const {selected_texts} = this.state;
    const {data: {ocrJson: {texts}, annotatedJson: {texts_values = {}, texts_labels = {}}}} = this.props;
    Object.assign(texts_values, selected_texts);
    this.onUpdateLabelValues({texts_values, texts_labels});
  }

  handleOnClickClearSelection = () => {
    const selected_texts = {}
    this.setState({selected_texts});
  }

  handleOnClickRemoveLabels = () => {
    const {data: {ocrJson: {texts}, annotatedJson: {texts_values = {}}}} = this.props;
    this.onUpdateLabelValues({texts_values, texts_labels: {}});
  }

  handleOnClickRemoveValues = () => {
    const {data: {ocrJson: {texts}, annotatedJson: {texts_labels = {}}}} = this.props;
    this.onUpdateLabelValues({texts_values: {}, texts_labels});
  }


  render() {
    const {selected_texts} = this.state;
    const {data: {ocrJson, annotatedJson}} = this.props;

    const {texts = []} = ocrJson;
    const {texts_labels = {}, texts_values = {}} = annotatedJson;

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
                {texts.map((text, index) => <div key={index}>
                  <ListCheckbox
                    checked={!!selected_texts[index]}
                    onChange={(selected) => this.handleOnClickText(selected, index)}
                    selectable
                    caption={text[0]}
                  />
                </div>)}
              </List>
              <div className={DocumentInspectorStyles.add_to_labels_tooltip}>
                {Object.entries(selected_texts).length > 0 ?
                  <TooltipButton label='Add to Labels' icon='add' raised primary tooltip='Add text to labels'
                                 tooltipDelay={1000} onClick={this.handleOnClickAddToLabel}/> : ''}
              </div>
              <div className={DocumentInspectorStyles.add_to_values_tooltip}>
                {Object.entries(selected_texts).length > 0 ?
                  <TooltipButton label='Add to Values' icon='add' raised primary tooltip='Add text to Values'
                                 tooltipDelay={1000} onClick={this.handleOnClickAddToValue}/> : ''}
              </div>
              <div className={DocumentInspectorStyles.clear_selection_tooltip}>
                {Object.entries(selected_texts).length > 0 ?
                  <TooltipButton label='Clear' icon='remove' raised primary tooltip='Clear selection'
                                 tooltipDelay={1000} onClick={this.handleOnClickClearSelection}/> : ''}
              </div>
            </Tab>
            <Tab label='Labels'>
              <List selectable ripple>
                <ListSubHeader caption='Texts'/>
                {Object.entries(texts_labels).map(([index, text]) => <div key={index}>
                  <ListItem
                    selectable
                    caption={text[0]}
                    rightActions={[<Button icon="delete"
                                           onClick={() => this.handleOnClickLabel(false, index)}></Button>]}
                  />
                </div>)}
              </List>
            </Tab>
            <Tab label='Values'>
              <List selectable ripple>
                <ListSubHeader caption='Texts'/>
                {Object.entries(texts_values).map(([index, text]) => <div key={index}>
                  <ListItem
                    selectable
                    caption={text[0]}
                    rightActions={[<Button icon="delete"
                                           onClick={() => this.handleOnClickValue(false, index)}></Button>]}
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

DocumentInspector.propTypes = {};

export default DocumentInspector;
