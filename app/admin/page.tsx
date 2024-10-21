"use client";
import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const farmersData = [
  { name: "Active Farmers", value: 7623 },
  { name: "New Farmers", value: 2123 },
];

const buyersData = [
  { name: "Active Buyers", value: 10 },
  { name: "New Buyers", value: 5 },
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {/* Farmers Summary */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
            Farmers Summary
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={farmersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Buyers Summary */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
            Buyers Summary
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={buyersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 12, fontWeight: 600 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#22c55e" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
