import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dummy Data
const ordersData = [
  { name: "Jan", Sales: 4000, Orders: 2400 },
  { name: "Feb", Sales: 3000, Orders: 1398 },
  { name: "Mar", Sales: 2000, Orders: 9800 },
  { name: "Apr", Sales: 2780, Orders: 3908 },
  { name: "May", Sales: 1890, Orders: 4800 },
  { name: "Jun", Sales: 2390, Orders: 3800 },
  { name: "Jul", Sales: 3490, Orders: 4300 },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Monthly Sales & Orders</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={ordersData}
            margin={{
              top: 20, right: 30, left: 20, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Orders" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Track your sales and orders over the past months to better understand your business performance.</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
