import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const data2 = [
    { date: new Date("2022-01-01"), price: 100 },
    { date: new Date("2022-02-01"), price: 95 },
    { date: new Date("2022-03-01"), price: 99 },
    { date: new Date("2022-04-01"), price: 90 },
    { date: new Date("2022-05-01"), price: 100 },
    { date: new Date("2022-06-01"), price: 120 },
    { date: new Date("2022-07-01"), price: 110 },
  ];

  const svgRef = useRef(null);
  const width = 500;
  const height = 300;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price)])
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
      .data(data)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", lineGenerator(data))
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
      .selectAll(".line2")
      .data(data2)
      .enter()
      .append("path")
      .attr("class", "line2")
      .attr("d", lineGenerator(data2))
      .attr("stroke", "lightblue")
      .on("mouseover", (d, event) => {
        if (svgRef.current) {
        const svgBounds = svgRef.current.getBoundingClientRect();
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Price: ${d.price}`)
          .style("left", `${event.pageX - svgBounds.left}px`)
          .style("top", `${event.pageY - svgBounds.top - 28}px`);
        }
      })
    

    svg
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0, ${height})`);

    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LineChart;
