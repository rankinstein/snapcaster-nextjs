import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const avgData = data.price_data.map(d => {
    return { date: new Date(d.date), price: d.avg_price }
});
  const svgRef = useRef(null);
  const width = 500;
  const height = 300;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(avgData, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(avgData, (d) => d.price)])
      .range([height, 0]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

      
    svg
      .selectAll(".line")
      .data(avgData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", lineGenerator(avgData))
      .attr("stroke", "purple")
      .on("mouseover", (d, event) => {
        if (svgRef.current) {
        const svgBounds = svgRef.current.getBoundingClientRect();
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Price: ${d.price}<br>Date: ${d.date}`)
          .style("left", `${event.pageX - svgBounds.left}px`)
          .style("top", `${event.pageY - svgBounds.top - 28}px`);
        }
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
    
    svg
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0, ${height})`);

    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LineChart;
