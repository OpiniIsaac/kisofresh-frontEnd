"use client";
import React, { useState } from 'react';

const Purchases = () => {
  const [purchaseData, setPurchaseData] = useState({ item: '', quantity: '', boughtFrom: '', soldTo: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission to save purchase data
    console.log(purchaseData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Record a Purchase</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="item">Item</label>
          <input type="text" id="item" name="item" className="w-full p-2 border rounded" value={purchaseData.item} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
          <input type="text" id="quantity" name="quantity" className="w-full p-2 border rounded" value={purchaseData.quantity} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="boughtFrom">Bought From</label>
          <input type="text" id="boughtFrom" name="boughtFrom" className="w-full p-2 border rounded" value={purchaseData.boughtFrom} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="soldTo">Sold To</label>
          <input type="text" id="soldTo" name="soldTo" className="w-full p-2 border rounded" value={purchaseData.soldTo} onChange={handleChange} />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Save Purchase</button>
      </form>
    </div>
  );
};

export default Purchases;
