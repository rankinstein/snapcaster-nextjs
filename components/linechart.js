import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { scaleThreshold } from "d3";

const LineChart = ({ data }) => {
  const avgData = data.price_data.map((d) => {
    return { date: new Date(d.date), price: d.avg_price };
  });
  const maxData = data.price_data.map((d) => {
    return { date: new Date(d.date), price: d.max_price };
  });
  const minData = data.price_data.map((d) => {
    return { date: new Date(d.date), price: d.min_price };
  });

  const svgRef = useRef(null);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30,
  };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // add a top margin to the svg
    svg.attr("transform", `translate(${margin.left}, ${margin.top})`);
    // add padding to the svg

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(avgData, (d) => d.date))
      .range([0, width]);

      const yScale = d3
      .scaleLinear()
      .domain([d3.min(minData, (d) => d.price) - 10, d3.max(maxData, (d) => d.price)])
      .range([height, 0 + margin.bottom])
      .nice();

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.date) + margin.left)
      .y((d) => yScale(d.price) - margin.top);
    // Average Price Line
    svg
      .selectAll(".avg-line")
      .data(avgData)
      .enter()
      .append("path")
      .attr("class", "avg-line")
      .attr("d", lineGenerator(avgData))
      .attr("stroke", "purple");

    // Max Price Line
    svg
      .selectAll(".max-line")
      .data(maxData)
      .enter()
      .append("path")
      .attr("class", "max-line")
      .attr("d", lineGenerator(maxData))
      .attr("stroke", "red");

    // Min Price Line
    svg
      .selectAll(".min-line")
      .data(minData)
      .enter()
      .append("path")
      .attr("class", "min-line")
      .attr("d", lineGenerator(minData))
      .attr("stroke", "green");

    svg
      .append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", 50)
      .text("Date");

    svg
      .append("g")
      // set the g element to translate(${margin.left}, 0)
      .attr("transform", `translate(${margin.left}, ${-margin.bottom})`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .attr(
        "transform",
        `rotate(-90) translate(${-height / 2}, ${-margin.left})`
      )
      .text("Price");

    // add a legend to the bottom
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 150}, ${height - 100})`);
      
      legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 30)
      .text("Max Price")
      .attr("fill", "red");
    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "purple");

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text("Average Price")
      .attr("fill", "purple");



    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 40)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "green");

    legend
        
      .append("text")
      .attr("x", 20)
      .attr("y", 50)
      .text("Min Price")
      .attr("fill", "green");



  }, [data]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LineChart;
