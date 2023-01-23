import React from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RechartsLineChart = ({price_data}) => {
  const [data, setData] = React.useState([])
  useEffect(() => {
    setData(price_data)
    }, [price_data])
  return (
    <div className="p-4 bg-gray-800 rounded-md">
    <LineChart width={600} height={300} data={price_data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" /> 
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="max_price" stroke="#82ca9d" strokeWidth={3}/>
      <Line type="monotone" dataKey="avg_price" stroke="#d344ff" activeDot={{ r: 6 }} strokeWidth={3} />
      <Line type="monotone" dataKey="min_price" stroke="red" strokeWidth={3} />
    </LineChart>
    </div>
  );
}

export default RechartsLineChart;
