import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

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
    top: 50,
    right: 90,
    bottom: 20,
    left: 30,
  };

  const padding = {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50,
  };

  const width = 560 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // add a top margin to the svg
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add padding to the svg

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(avgData, (d) => d.date))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(minData, (d) => d.price) - 10,
        d3.max(maxData, (d) => d.price),
      ])
      .range([height, 0])
      .nice();

    // X Axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${padding.left}, ${height})`)
      .call(d3.axisBottom(xScale));

    // Y Axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)
      .call(d3.axisLeft(yScale));

    // Y Axis Label
    svg
      .select(".y-axis")
      .append("text")
      .attr("fill", "white")
      .attr("transform", "rotate(-90)")
      .attr("y", -padding.left)
      .attr("dy", "0.91em")
      // make text larger
      .attr("font-size", "1.5em")
      .attr("text-anchor", "end")
      .text("Price (CAD)");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Tooltip mousemove event handler
    const tipMousemove = function (d, event) {
      // get the appropriate data list based on the class of the line
      const dataList =
        d.target.classList[0] === "avg-line"
          ? avgData
          : d.target.classList[0] === "max-line"
          ? maxData
          : minData;

      // get the index of the data point that is closest to the mouse
      const mouseX = d.pageX;
      console.log("dataList", dataList);
      console.log("mouseX", mouseX);

      const dataPoint = 25;
      // display "average", "max", or "min" in the tooltip
      tooltip
        .html(
          `
          <p>${d.target.classList[0].split("-")[0]} price: $${dataPoint}</p>`
        )
        .style("left", `${d.pageX + 15}px`)
        .style("top", `${d.pageY - 28}px`)
        .transition()
        .duration(200) // ms
        .style("opacity", 0.9); // started as 0!
    };

    // Tooltip mouseout event handler
    const tipMouseout = function (d) {
      tooltip
        .transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
    };

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.date) + padding.left)
      .y((d) => yScale(d.price) + padding.top);

    // Average Price Line
    svg
      .selectAll(".avg-line")
      .data(avgData)
      .enter()
      .append("path")
      .attr("class", "avg-line")
      .attr("d", lineGenerator(avgData))
      .attr("stroke", "purple")
      .attr("stroke-width", 2)
      .on("mousemove", function (d, event) {
        tipMousemove(d, event);
      });

    // Max Price Line
    svg
      .selectAll(".max-line")
      .data(maxData)
      .enter()
      .append("path")
      .attr("class", "max-line")
      .attr("d", lineGenerator(maxData))
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .on("mousemove", function (d, event) {
        tipMousemove(d, event);
      });

    // Min Price Line
    svg
      .selectAll(".min-line")
      .data(minData)
      .enter()
      .append("path")
      .attr("class", "min-line")
      .attr("d", lineGenerator(minData))
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .on("mousemove", function (d, event) {
        tipMousemove(d, event);
      })

      .on("mouseout", tipMouseout);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    ></svg>
  );
};

export default LineChart;
