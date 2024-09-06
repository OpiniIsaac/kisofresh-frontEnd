'use client';

import { getQuotes } from '@/lib/actions/tradersOrders.action';
import { useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { Tabs, Tab, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Order = {
  orderId: number;
  product: string;
  quantity: number;
  price: string;
  status: string;
  date: string;
};

const OrdersPage = () => {
  const [rejectedOrders, setRejectedOrders] = useState<Order[]>([]);
  const [approvedOrders, setApprovedOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const user = useAppSelector((state) => state.auth.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user?.uid) {
      async function fetchData() {
        const result = await getQuotes(user?.uid);
        if (result.error) {
          console.error(result.error);
        } else {
          setRejectedOrders(result.rejectedOrders || []);
          setApprovedOrders(result.approvedOrders || []);
        }
        setLoading(false);
      }

      fetchData();
    }
  }, [user]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Quotes</h1>

        <Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'standard'}
            centered={!isMobile}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Ongoing/Delivered" />
            <Tab label="Cancelled" />
          </Tabs>

          {activeTab === 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Ongoing/Delivered Quotes</h2>
              <table className="w-full table-auto border-collapse mb-6">
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
                  {approvedOrders.map((order) => (
                    <tr key={order.orderId} className="text-center">
                      <td className="p-2 border">{order.orderId}</td>
                      <td className="p-2 border">{order.product}</td>
                      <td className="p-2 border">{order.quantity}</td>
                      <td className="p-2 border">{order.price}</td>
                      <td className="p-2 border text-green-500">{order.status}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-500 underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cancelled Orders</h2>
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
                  {rejectedOrders.map((order) => (
                    <tr key={order.orderId} className="text-center">
                      <td className="p-2 border">{order.orderId}</td>
                      <td className="p-2 border">{order.product}</td>
                      <td className="p-2 border">{order.quantity}</td>
                      <td className="p-2 border">{order.price}</td>
                      <td className="p-2 border text-red-500">{order.status}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-500 underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Box>

        {selectedOrder && (
          <div className="mt-6 p-4 bg-gray-100 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.product}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Price:</strong> {selectedOrder.price}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
