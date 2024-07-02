// pages/admin/farmers.js
import React from 'react';

const Farmers = () => {
  // Sample data for farmers
  const farmers = [
    { id: 1, name: 'Farmer John', location: 'Region A', crops: 'Corn, Wheat' },
    { id: 2, name: 'Farmer Jane', location: 'Region B', crops: 'Rice, Barley' },
    { id: 3, name: 'Farmer Bob', location: 'Region C', crops: 'Soybeans, Canola' },
    { id: 4, name: 'Farmer Alice', location: 'Region D', crops: 'Tomatoes, Peppers' },
    { id: 5, name: 'Farmer Sam', location: 'Region E', crops: 'Lettuce, Spinach' },
    { id: 6, name: 'Farmer Mary', location: 'Region F', crops: 'Strawberries, Blueberries' },
    { id: 7, name: 'Farmer Steve', location: 'Region G', crops: 'Potatoes, Carrots' },
    { id: 8, name: 'Farmer Lucy', location: 'Region H', crops: 'Grapes, Apples' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmers</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Crops</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td className="py-2 px-4 border-b">{farmer.id}</td>
              <td className="py-2 px-4 border-b">{farmer.name}</td>
              <td className="py-2 px-4 border-b">{farmer.location}</td>
              <td className="py-2 px-4 border-b">{farmer.crops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Farmers;
