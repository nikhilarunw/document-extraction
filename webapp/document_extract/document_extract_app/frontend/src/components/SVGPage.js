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


    svg.on("mousedown", function () {
      const p = mouse(this);
      svg.append("rect")
        .attr("class", `${SVGPageStyles.selection}`)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", p[0])
        .attr("y", p[1])
        .attr("width", 0)
        .attr("height", 0)
    })
      .on("mousemove", function () {
        const s = svg.select(`rect.${SVGPageStyles.selection}`);

        if (!s.empty()) {
          const p = mouse(this),

            d = {
              x: parseInt(s.attr("x"), 10),
              y: parseInt(s.attr("y"), 10),
              width: parseInt(s.attr("width"), 10),
              height: parseInt(s.attr("height"), 10)
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

          s.attr('x', d.x);
          s.attr('y', d.y);
          s.attr('width', d.width);
          s.attr('height', d.height);

          //console.log(d);
        }
      }).on("mouseup", function () {
      svg.select(`.${SVGPageStyles.selection}`).remove();
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
