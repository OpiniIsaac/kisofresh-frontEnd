"use client";

import React, { useState } from 'react';

type Order = {
  orderId: number;
  product: string;
  quantity: number;
  price: string;
  status: string;
  date: string;
};

const OrdersPage = () => {
  const orders: Order[] = [
    { orderId: 101, product: 'Maize', quantity: 20, price: '$1000', status: 'Delivered', date: '2023-07-01' },
    { orderId: 102, product: 'Rice', quantity: 15, price: '$600', status: 'Pending', date: '2023-07-02' },
    { orderId: 103, product: 'Beans', quantity: 30, price: '$1800', status: 'Delivered', date: '2023-07-03' },
    { orderId: 104, product: 'Maize', quantity: 25, price: '$1250', status: 'Canceled', date: '2023-07-04' },
  ];

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="mt-10 min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId} className="text-center">
                <td className="p-2 border">{order.orderId}</td>
                <td className="p-2 border">{order.product}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.price}</td>
                <td className={`p-2 border ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {order.status}
                </td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border">
                  <button onClick={() => setSelectedOrder(order)} className="text-blue-500 underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedOrder && (
          <div className="mt-6 p-4 bg-gray-100 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Price:</strong> {selectedOrder.price}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <button onClick={() => setSelectedOrder(null)} className="mt-4 p-2 bg-blue-500 text-white rounded">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
