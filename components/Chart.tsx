"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import React from 'react'

export default function PriceChart() {

  const data = [
    { value: 4.2, date: "2004" },
    { value: 5.0, date: "2005" },
    { value: 5.0, date: "2006" },
    { value: 3.8, date: "2007" },
    { value: 4.5, date: "2008" },
    { value: 5.5, date: "2009" },
    { value: 6.2, date: "2010" },
    { value: 6.0, date: "2011" },
    { value: 6.3, date: "2012" },
    { value: 7.2, date: "2023" },
    { value: 6.9, date: "2024" },
  ];

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Crop Prices Over Time</h2>
      <ResponsiveContainer width="100%" minHeight={400}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
