"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const orders =[
        { "id": 1, "product": "Maize", "quantity": 50, "status": "Pending" },
        { "id": 2, "product": "Rice", "quantity": 30, "status": "Completed" },
        { "id": 3, "product": "Beans", "quantity": 70, "status": "Pending" },
        { "id": 4, "product": "Wheat", "quantity": 20, "status": "Cancelled" }
      ]
      

  return (
    <div className="p-4 bg-white shadow rounded max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Orders</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    order.status === "Completed"
                      ? "bg-green-500"
                      : order.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
