import React from "react";
import {select} from "d3";

export default class SVGPage extends React.Component {
  renderPage = () => {
    const node = this.node;

    const {page} = this.props;

    let svg = select(node)

    let group = svg.selectAll('rect')
      .data(page.texts)
      .enter()
      .append("g")
      .attr("class", "text-group")
      .on("click", (d) => {
        //console.log("clicked", d)
      })

    group.append("text")
      .attr("class", "text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", "1em")
      .style('font-size', (d) => d.fontSize)
      .style('font-family', (d) => d.fontFamily)
      .style('font-color', (d) => d.fontColor)
      .text(function (d) {
        return d.text;
      });
  }

  componentDidMount() {
    this.renderPage()
  }

  componentDidUpdate() {
    this.renderPage()
  }

  render() {
    const {page: {width, height}} = this.props;
    return <div className={this.props.className}>
      <svg ref={node => this.node = node}
           width={width} height={height}>
      </svg>
    </div>
  }
}
