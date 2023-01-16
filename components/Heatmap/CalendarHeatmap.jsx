import moment from 'moment/moment';
import React from 'react';
// import calendar-heatmap.js
// import calendarHeatmap from 'calendar-heatmap';
import Chart from './Chart';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CalendarHeatmap() {
  // Generate some random data
  var now = moment().endOf('day').toDate();
  var yearAgo = moment().startOf('day').subtract(1, 'year').toDate();
  let chartData = d3.timeDays(yearAgo, now).map(function (date) {
    return {
      date: date,
      count:
        date.getDay() !== 0 && date.getDay() !== 6
          ? Math.floor(Math.random() * 60)
          : Math.floor(Math.random() * 10),
    };
  });
  // const [chartData, setChartData] = useState(null)
  const [total, setTotal] = useState(0)

  // fetch chartData from API
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URI}/heatmap/`)
  //     .then(res => {
  //       console.log(res.data);
  //       setChartData(res.data);
  //       // sum the total count for all days in the data
  //       setTotal(res.data.reduce((acc, curr) => acc + curr.count, 0))
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);


  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '120',
      }}
    >
      {/* // window size must be greater than 750px for the chart to render */}
      {chartData && 
        window.innerWidth > 750 &&
      <Chart data={chartData} total={total}/>}
    </div>
  );
}
