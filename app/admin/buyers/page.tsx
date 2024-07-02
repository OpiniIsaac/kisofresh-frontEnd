// pages/admin/buyers.js
import React from 'react';

const Buyers = () => {
  // Sample data for buyers
  const buyers = [
    { id: 1, name: 'Buyer John', location: 'City A', products: 'Corn, Wheat' },
    { id: 2, name: 'Buyer Jane', location: 'City B', products: 'Rice, Barley' },
    { id: 3, name: 'Buyer Bob', location: 'City C', products: 'Soybeans, Canola' },
    { id: 4, name: 'Buyer Alice', location: 'City D', products: 'Tomatoes, Peppers' },
    { id: 5, name: 'Buyer Sam', location: 'City E', products: 'Lettuce, Spinach' },
    { id: 6, name: 'Buyer Mary', location: 'City F', products: 'Strawberries, Blueberries' },
    { id: 7, name: 'Buyer Steve', location: 'City G', products: 'Potatoes, Carrots' },
    { id: 8, name: 'Buyer Lucy', location: 'City H', products: 'Grapes, Apples' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Buyers</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Products</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((buyer) => (
            <tr key={buyer.id}>
              <td className="py-2 px-4 border-b">{buyer.id}</td>
              <td className="py-2 px-4 border-b">{buyer.name}</td>
              <td className="py-2 px-4 border-b">{buyer.location}</td>
              <td className="py-2 px-4 border-b">{buyer.products}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Buyers;
