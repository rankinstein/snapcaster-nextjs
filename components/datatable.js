import React from "react";

export default function DataTable({ data }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Avg Price</th>
            <th className="px-4 py-2">Max Price</th>
            <th className="px-4 py-2">Min Price</th>
          </tr>
        </thead>
        <tbody>
          {data.price_data.map((element) => (
            <tr>
              <td className="border px-4 py-2">{element.date}</td>
              <td className="border px-4 py-2">{element.avg_price}</td>
              <td className="border px-4 py-2">{element.max_price}</td>
              <td className="border px-4 py-2">{element.min_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}