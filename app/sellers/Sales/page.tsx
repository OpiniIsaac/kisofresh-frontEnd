// components/Dashboard/Sales.js
import { useQuery } from 'react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const fetchSales = async () => {
  const { data } = await axios.get('/api/sales');
  return data;
};

const Sales = () => {
  const data = [
    { "date": "2024-07-01", "sales": 120 },
    { "date": "2024-07-02", "sales": 150 },
    { "date": "2024-07-03", "sales": 80 },
    { "date": "2024-07-04", "sales": 200 },
    { "date": "2024-07-05", "sales": 170 }
  ]
  

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sales;
