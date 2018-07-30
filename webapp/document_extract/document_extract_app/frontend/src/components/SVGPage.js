import React from "react";
import {mouse, select} from "d3";
import SVGPageStyles from "./SVGPage.css";

export default class SVGPage extends React.Component {
  renderPage = () => {
    const node = this.node;

    const {page} = this.props;

    let svg = select(node)

    svg.selectAll('*').remove()

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

    this.addSelectionListener();
  }

  addSelectionListener = () => {
    const node = this.node;
    let svg = select(node)

    const selections_group = svg.append('g')
      .attr('class', SVGPageStyles.selections_group)

    svg.on("mousedown", function () {
      const p = mouse(this);
      selections_group.append('svg')
        .attr('class', SVGPageStyles.selection_group)
        .attr("x", p[0])
        .attr("y", p[1])
        .append("rect")
        .attr("class", `${SVGPageStyles.selection_rect}`)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", 0)
    }).on("mousemove", function () {
      const selection_group = selections_group.select(`svg.${SVGPageStyles.selection_group}`);
      const selection_rect = selection_group.select(`rect.${SVGPageStyles.selection_rect}`)

      if (!selection_group.empty() && !selection_rect.empty()) {
        const p = mouse(this),

          d = {
            x: parseInt(selection_group.attr("x"), 10),
            y: parseInt(selection_group.attr("y"), 10),
            width: parseInt(selection_rect.attr("width"), 10),
            height: parseInt(selection_rect.attr("height"), 10)
          },
          move = {
            x: p[0] - d.x,
            y: p[1] - d.y
          }
        ;

        if (move.x < 1 || (move.x * 2 < d.width)) {
          d.x = p[0];
          d.width -= move.x;
        } else {
          d.width = move.x;
        }

        if (move.y < 1 || (move.y * 2 < d.height)) {
          d.y = p[1];
          d.height -= move.y;
        } else {
          d.height = move.y;
        }

        selection_group.attr('x', d.x);
        selection_group.attr('y', d.y);
        selection_rect.attr('width', d.width);
        selection_rect.attr('height', d.height);

        //console.log(d);
      }
    }).on("mouseup", function () {
      selections_group.select(`.${SVGPageStyles.selection_group}`)
        .attr('class', `${SVGPageStyles.selected_search_field}`)
        .select(`${SVGPageStyles.selection_rect}`)
        .attr('class', `${SVGPageStyles.selected_search_field}`)

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
