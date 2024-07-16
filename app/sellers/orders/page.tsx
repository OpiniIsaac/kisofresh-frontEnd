"use client";
import React, { useState } from 'react';

const Orders = () => {
  const initialOrders = [
    { id: 1, product: "Maize", quantity: 50, status: "Pending", details: "Order placed on 01-Jan" },
    { id: 2, product: "Rice", quantity: 30, status: "Completed", details: "Order delivered on 05-Jan" },
    { id: 3, product: "Beans", quantity: 70, status: "Pending", details: "Order placed on 10-Jan" },
    { id: 4, product: "Wheat", quantity: 20, status: "Cancelled", details: "Order cancelled on 15-Jan" },
    { id: 1, product: "Maize", quantity: 50, status: "Pending", details: "Order placed on 01-Jan" },
    { id: 2, product: "Rice", quantity: 30, status: "Completed", details: "Order delivered on 05-Jan" },
    { id: 3, product: "Beans", quantity: 70, status: "Pending", details: "Order placed on 10-Jan" },
    { id: 4, product: "Wheat", quantity: 20, status: "Cancelled", details: "Order cancelled on 15-Jan" },  { id: 1, product: "Maize", quantity: 50, status: "Pending", details: "Order placed on 01-Jan" },
    { id: 2, product: "Rice", quantity: 30, status: "Completed", details: "Order delivered on 05-Jan" },
    { id: 3, product: "Beans", quantity: 70, status: "Pending", details: "Order placed on 10-Jan" },
    { id: 4, product: "Wheat", quantity: 20, status: "Cancelled", details: "Order cancelled on 15-Jan" },  { id: 1, product: "Maize", quantity: 50, status: "Pending", details: "Order placed on 01-Jan" },
    { id: 2, product: "Rice", quantity: 30, status: "Completed", details: "Order delivered on 05-Jan" },
    { id: 3, product: "Beans", quantity: 70, status: "Pending", details: "Order placed on 10-Jan" },
    { id: 4, product: "Wheat", quantity: 20, status: "Cancelled", details: "Order cancelled on 15-Jan" },  { id: 1, product: "Maize", quantity: 50, status: "Pending", details: "Order placed on 01-Jan" },
    { id: 2, product: "Rice", quantity: 30, status: "Completed", details: "Order delivered on 05-Jan" },
    { id: 3, product: "Beans", quantity: 70, status: "Pending", details: "Order placed on 10-Jan" },
    { id: 4, product: "Wheat", quantity: 20, status: "Cancelled", details: "Order cancelled on 15-Jan" },
    
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof initialOrders[0], direction: 'asc' | 'desc' } | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Sorting logic
  const sortOrders = (key: keyof typeof initialOrders[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedOrders = [...orders].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setOrders(sortedOrders);
  };

  // Search logic
  const filteredOrders = currentOrders.filter(order =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow rounded max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Orders</h2>

      <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortOrders('product')}>Product</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortOrders('quantity')}>Quantity</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => sortOrders('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} onClick={() => setSelectedOrder(order)} className="cursor-pointer">
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

      {selectedOrder && (
        <div className="p-4 mt-4 bg-gray-100 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Order Details</h3>
          <p><strong>Product:</strong> {selectedOrder.product}</p>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Details:</strong> {selectedOrder.details}</p>
          <button onClick={() => setSelectedOrder(null)} className="mt-2 p-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-2 bg-gray-300 text-gray-700 rounded">Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastOrder >= orders.length} className="p-2 bg-gray-300 text-gray-700 rounded">Next</button>
      </div>
    </div>
  );
};

export default Orders;
