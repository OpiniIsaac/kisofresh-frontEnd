"use client"
import React from 'react'
import { LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ordersData = [
  { name: 'Completed Orders', value: 100 },
  { name: 'Pending Orders', value: 30 }
];

const quotesData = [
  { name: 'Approved Quotes', value: 700 },
  { name: 'Pending Quotes', value: 100 }
];

const farmersData = [
  { name: 'Active Farmers', value: 5000 },
  { name: 'New Farmers', value: 150 }
];

const buyersData = [
  { name: 'Active Buyers', value: 50 },
  { name: 'New Buyers', value: 10 }
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Orders Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ordersData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Quotes Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={quotesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {quotesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Farmers Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={farmersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-center">Buyers Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={buyersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
