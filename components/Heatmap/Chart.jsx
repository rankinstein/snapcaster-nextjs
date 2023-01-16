import React, {useState} from 'react';
import moment from 'moment/moment';
import * as d3 from 'd3';
import './calendar-heatmap.css';

export default function Chart({ data, total }) {
  console.log(data)
  var width = 690;
  var height = 150;
  var selector = '.heatmap-container';
  var SQUARE_LENGTH = 11;
  var SQUARE_PADDING = 2;
  var MONTH_LABEL_PADDING = 6;
  var now = moment().endOf('day').toDate();
  var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
  var max = null;
  var colorRange = ['#e1b8ff', '#7700cf'];
  var weekStart = 0; //0 for Sunday, 1 for Monday
  var dateRange = ((d3.time && d3.time.days) || d3.timeDays)(yearAgo, now); // generates an array of date objects within the specified range
  var firstDate = moment(dateRange[0]);

  var color = d3
    .scaleLinear()
    .domain([
      0,
      max ||
        d3.max(data, function (d) {
          return d.count;
        }),
    ])
    .range(colorRange);
 
  const countForDate = d => {
    var count = 0;
    data.forEach(function (e) {
      if (moment(e.date).isSame(d, 'day')) {
        count = e.count;
      }
    });
    return count;
  };

  const formatWeekday = weekDay => {
    if (weekStart === 1) {
      if (weekDay === 0) {
        return 6;
      } else {
        return weekDay - 1;
      }
    }
    return weekDay;
  };

  const chart = () => {
    d3.select(selector).selectAll('svg.calendar-heatmap').remove(); // remove the existing chart, if it exists

    if (data.length == 0) {
      max = 0;
    } else if (max === null) {
      max = d3.max(data, function (d) {
        return d.count;
      }); // max data value
    }
    return drawChart();
  };

  const drawChart = () => {
    var svg = d3
      .select(selector)
      .style('position', 'relative')
      .append('svg')
      .attr('width', width)
      .attr('class', 'calendar-heatmap')
      .attr('height', height)
      .style('padding', '0px');

    const tooltip = d3.select(selector)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    // have tooltip at the cursor position
    .style('position', 'absolute')
    .style('pointer-events', 'none')
    .style('width', '200px');



    var dayRects = svg.selectAll('.day-cell').data(dateRange); //  array of days for the last yr
    var enterSelection = dayRects
      .enter()
      .append('rect')
      .attr('class', 'day-cell')
      .attr('width', SQUARE_LENGTH)
      .attr('height', SQUARE_LENGTH)
      .attr('fill', function (d) {
        // if countForDate is 0, return dark gray
        if (countForDate(d) === 0) {
          return '#333';
        }
        return color(countForDate(d));
      })
      .attr('x', function (d, i) {
        var cellDate = moment(d);
        var result =
          cellDate.week() -
          firstDate.week() +
          firstDate.weeksInYear() *
            (cellDate.weekYear() - firstDate.weekYear());
        return result * (SQUARE_LENGTH + SQUARE_PADDING);
      })
      .attr('y', function (d, i) {
        return (
          MONTH_LABEL_PADDING + 20 +
          formatWeekday(d.getDay()) * (SQUARE_LENGTH + SQUARE_PADDING)
        );
      })
      // on mouseover, show the tooltip
      .on('mouseenter', function (e, d) {
        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip
        // display tooltip at the mouse position
          .html(
            `<div class="day-cell-tooltip"><div>${moment(d).format('MMM D, YYYY')}</div>
            <div class="tooltip-count">${countForDate(d)} searches</div></div>` 
          )
          .style('left', e.pageX -175 + 'px')
          .style('top', e.pageY - 195 + 'px');
      })
      // on mouseout, hide the tooltip 
      .on('mouseout', function (d) {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0);
      }); 


    dayRects.exit().remove();
    // draw month labels across the top, we only want the first three letters of the month
    var monthLabels = svg.selectAll('.month').data(
      d3.timeMonths(
        moment(dateRange[0]).startOf('month').toDate(),
        moment(dateRange[dateRange.length - 1]).endOf('month').toDate()
      )
    );
    
    
    monthLabels
      .enter()
      .append('text')
      .attr('class', 'month')
      .text(function (d) {
        return moment(d).format('MMM');
      }
      )
      .style('fill', '#FFF')
      .attr('font-size', '10px')
      .attr('x', function (d, i) {
        var cellDate = moment(d);
        var result =
          cellDate.week() -
          firstDate.week() +
          firstDate.weeksInYear() *
            (cellDate.weekYear() - firstDate.weekYear());
        return result * (SQUARE_LENGTH + SQUARE_PADDING);
      }
      )
      .attr('y', MONTH_LABEL_PADDING+20 / 2)
      .attr('text-anchor', 'middle') 
      .append('g')
      

    monthLabels.exit().remove();
    // add a label for the total number of searches at the bottom center of the chart
    var totalSearches = svg
      .append('text')
      .attr('class', 'total-searches')
      .text('Total Searches: ' + total)
      .style('fill', '#FFF')
      .attr('font-size', '10px')
      .attr('x', width / 2)
      .attr('y', height - 20)
      .attr('text-anchor', 'middle');

  };

  return (
    <div className="heatmap-container">
      <div className="calendar-heatmap">{chart()}</div>
    </div>
  ); 
}
