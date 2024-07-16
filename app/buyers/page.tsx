// pages/buyers/index.tsx
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const BuyersDashboard = () => {
  const [produce, setProduce] = useState<{ id: number; name: string; type: string; location: string; }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', location: '' });
  const [favorites, setFavorites] = useState<{ id: number; name: string; type: string; location: string; }[]>([]);
  const [orderHistory, setOrderHistory] = useState<{ id: number; date: string; items: string[]; }[]>([]);

  useEffect(() => {
    // Dummy data for produce
    const dummyProduce = [
      { id: 1, name: 'Apple', type: 'fruit', location: 'North' },
      { id: 2, name: 'Carrot', type: 'vegetable', location: 'South' },
      { id: 3, name: 'Wheat', type: 'grain', location: 'East' },
      { id: 4, name: 'Banana', type: 'fruit', location: 'West' },
      { id: 5, name: 'Tomato', type: 'vegetable', location: 'North' },
      { id: 6, name: 'Corn', type: 'grain', location: 'South' },
      { id: 7, name: 'Strawberry', type: 'fruit', location: 'East' },
      { id: 8, name: 'Potato', type: 'vegetable', location: 'West' },
    ];
    setProduce(dummyProduce);

    // Dummy data for order history
    const dummyOrderHistory = [
      { id: 101, date: '2023-07-01', items: ['Apple', 'Carrot'] },
      { id: 102, date: '2023-07-05', items: ['Wheat', 'Banana'] },
      { id: 103, date: '2023-07-10', items: ['Tomato', 'Corn'] },
    ];
    setOrderHistory(dummyOrderHistory);
  }, []);

  const handleSearch = () => {
    // Implement search logic
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

const handleAddToFavorites = (item: { id: number; name: string; type: string; location: string; }) => {
    setFavorites([...favorites, item]);
};

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Buyers Dashboard</h1>
      <p>Welcome to the buyers dashboard. Here you can find and source agricultural produce.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Search and Filter</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search produce"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <select name="type" value={filters.type} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">All Types</option>
            <option value="fruit">Fruits</option>
            <option value="vegetable">Vegetables</option>
            <option value="grain">Grains</option>
          </select>
          <select name="location" value={filters.location} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="">All Locations</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
          <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">Search</button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Available Produce</h2>
        <ul>
          {produce.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2 p-2 border rounded">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>{item.type} - {item.location}</p>
              </div>
              <button onClick={() => handleAddToFavorites(item)} className="p-2 bg-yellow-500 text-white rounded">Add to Favorites</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Favorites</h2>
        <ul>
          {favorites.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2 p-2 border rounded">
              <div>
                <p className="font-bold">{item.name}</p>
                <p>{item.type} - {item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <ul>
          {orderHistory.map((order) => (
            <li key={order.id} className="flex justify-between items-center mb-2 p-2 border rounded">
              <div>
                <p className="font-bold">Order #{order.id}</p>
                <p>{order.date}</p>
                <p>Items: {order.items.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <p>You have no new notifications.</p>
      </div>
    </div>
  );
};

export default BuyersDashboard;
