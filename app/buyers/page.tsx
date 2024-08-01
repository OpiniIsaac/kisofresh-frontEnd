"use client";
import React, { useState } from 'react';

const BuyerDashboard = () => {
  const [purchaseData, setPurchaseData] = useState({ item: '', quantity: '', boughtFrom: '', boughtDate: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission to save purchase data
    console.log(purchaseData);
    setPurchaseData({ item: '', quantity: '', boughtFrom: '', boughtDate: '' });
  };

  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Products Bought</h3>
              <p className="text-2xl font-bold">85</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Amount Spent</h3>
              <p className="text-2xl font-bold">UGX 1,800,000</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Total Vendors</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium">Average Spend Per Purchase</h3>
              <p className="text-2xl font-bold">UGX 21,000</p>
            </div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Purchases</h2>
          <ul>
            <li className="border-b py-2">
              <p className="font-medium">Bought 20kg of Rice from Vendor A</p>
              <p className="text-gray-600">UGX 80,000</p>
            </li>
            <li className="border-b py-2">
              <p className="font-medium">Bought 10kg of Wheat from Vendor B</p>
              <p className="text-gray-600">UGX 50,000</p>
            </li>
            <li className="border-b py-2">
              <p className="font-medium">Bought 15kg of Sugar from Vendor C</p>
              <p className="text-gray-600">UGX 45,000</p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default BuyerDashboard;
