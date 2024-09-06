'use client'; // This will ensure the component is client-side rendered

import { useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const OrdersPage = () => {
  const [quoteData, setQuoteData] = useState([]);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.uid) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/trader/sales?userId=${user.uid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setQuoteData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } else {
      console.log('User ID is not available');
    }
  }, [user]); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Quotes Approved vs. Rejected
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={quoteData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Quotes Approved"
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Quotes Rejected"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Monitor your quote approvals and rejections month by month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
