// components/Dashboard/Orders.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchOrders = async () => {
  const { data } = await axios.get('/api/orders');
  return data;
};

const Orders = () => {
  const data = [
    { "id": 1, "product": "Maize", "quantity": 50, "status": "Pending" },
    { "id": 2, "product": "Rice", "quantity": 30, "status": "Completed" },
    { "id": 3, "product": "Beans", "quantity": 70, "status": "Pending" },
    { "id": 4, "product": "Wheat", "quantity": 20, "status": "Cancelled" }
  ]
  

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <ul>
        {data.map(order => (
          <li key={order.id} className="flex justify-between mb-2">
            <span>{order.product}</span>
            <span>{order.quantity}</span>
            <span>{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
