"use client";
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

interface User {
  id: string;
  firstName: string;
  secondName: string;
}

interface Order {
  _id: string;
  userId: string;
  crop: string;  // Renamed from farmerName to crop
  buyerName?: string;  // This will be filled after fetching users
  status: string;
  createdAt: string;  // Renamed from date to createdAt
  deliveryOption: string;  // Added delivery option
  quantity: number;  // Added quantity field
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders
        const ordersResponse = await fetch('/api/orders');
        if (!ordersResponse.ok) throw new Error('Failed to fetch orders');
        const ordersData: Order[] = await ordersResponse.json();

        // Extract userIds from the orders
        const userIds = [...new Set(ordersData.map(order => order.userId))];

        // Fetch user details based on userIds
        const usersResponse = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds }),
        });
        if (!usersResponse.ok) throw new Error('Failed to fetch user data');
        const usersData: User[] = await usersResponse.json();

        // Map user details to the orders
        const ordersWithBuyerNames = ordersData.map(order => {
          const buyer = usersData.find(user => user.id === order.userId);
          return {
            ...order,
            buyerName: buyer ? `${buyer.firstName} ${buyer.secondName}` : 'Unknown Buyer',
          };
        });

        // Filter orders by status on the client side
        const filtered = ordersWithBuyerNames.filter(
          order => order.status === 'QUOTE_REJECTED' || order.status === 'QUOTE_APPROVED'
        );

        setOrders(ordersWithBuyerNames);
        setFilteredOrders(filtered);
      } catch (error) {
        console.error('Error fetching orders:', error);
        swal({
          title: "Error",
          text: "Failed to fetch orders from the database.",
          icon: "error",
        });
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'CANCELLED' }),
      });
      if (!response.ok) throw new Error('Failed to update order status');

      // Update the UI by modifying the filteredOrders state directly
      setFilteredOrders(prevFilteredOrders =>
        prevFilteredOrders.map(order =>
          order._id === orderId ? { ...order, status: 'CANCELLED' } : order
        )
      );
      swal({
        title: "Success",
        text: "Order status updated to Cancelled.",
        icon: "success",
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      swal({
        title: "Error",
        text: "Failed to update order status.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-4">Filtered Orders</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th> */}
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Option</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order._id}>
                  {/* <td className="px-6 py-4 whitespace-nowrap">{order._id}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap">{order.crop}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.buyerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.deliveryOption}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status === 'Delivery' && (
                      <button
                        onClick={() => handleStatusChange(order._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Cancel Order
                      </button>
                    )}
                    {/* Add more action buttons as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
