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
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800">Buyer Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Key Metrics */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">Total Products Bought</h3>
              <p className="text-2xl font-bold text-blue-600">coming soon</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">Total Amount Spent</h3>
              <p className="text-2xl font-bold text-green-600">coming soon</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">Total Vendors</h3>
              <p className="text-2xl font-bold text-yellow-600">coming soon</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">Average Spend Per Purchase</h3>
              <p className="text-2xl font-bold text-red-600">coming soon</p>
            </div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Purchases</h2>
          <ul className="space-y-4">
            <li className="border-b py-2 text-gray-600">
              {/* Placeholder for recent purchases */}
              {/* Example: <p className="font-medium">Bought 20kg of Rice from Vendor A</p> */}
            </li>
            <li className="border-b py-2 text-gray-600">
              {/* Example: <p className="font-medium">Bought 10kg of Wheat from Vendor B</p> */}
            </li>
            <li className="border-b py-2 text-gray-600">
              {/* Example: <p className="font-medium">Bought 15kg of Sugar from Vendor C</p> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
