"use client";
import React, { useState, useEffect, FormEvent } from 'react';

interface Crop {
  id: number;
  name: string;
  stock: number;
}

const initialInventory: Crop[] = [
  { id: 1, name: "Maize", stock: 150 },
  { id: 2, name: "Rice", stock: 200 },
  { id: 3, name: "Beans", stock: 300 },
  { id: 4, name: "Wheat", stock: 50 }
];

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<Crop[]>(initialInventory);
  const [newCrop, setNewCrop] = useState<Omit<Crop, 'id'>>({ name: '', stock: 0 });
  const [editCrop, setEditCrop] = useState<Crop | null>(null);
  const [error, setError] = useState<string>('');

  const handleAddCrop = (e: FormEvent) => {
    e.preventDefault();
    if (newCrop.name.trim() === '' || newCrop.stock <= 0) {
      setError('Please enter valid crop name and stock.');
      return;
    }
    const newCropWithId = { ...newCrop, id: inventory.length + 1 };
    setInventory([...inventory, newCropWithId]);
    setNewCrop({ name: '', stock: 0 });
    setError('');
  };

  const handleUpdateCrop = (e: FormEvent) => {
    e.preventDefault();
    if (editCrop && (editCrop.name.trim() === '' || editCrop.stock <= 0)) {
      setError('Please enter valid crop name and stock.');
      return;
    }
    setInventory(inventory.map(crop => (crop.id === editCrop!.id ? editCrop! : crop)));
    setEditCrop(null);
    setError('');
  };

  const handleDeleteCrop = (id: number) => {
    setInventory(inventory.filter(crop => crop.id !== id));
  };

  const handleEditClick = (crop: Crop) => {
    setEditCrop(crop);
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Inventory</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">{editCrop ? 'Edit Crop' : 'Add New Crop'}</h3>
        <form onSubmit={editCrop ? handleUpdateCrop : handleAddCrop} className="flex space-x-2">
          <input
            type="text"
            placeholder="Crop Name"
            value={editCrop ? editCrop.name : newCrop.name}
            onChange={(e) => editCrop ? setEditCrop({ ...editCrop, name: e.target.value }) : setNewCrop({ ...newCrop, name: e.target.value })}
            className="p-2 border rounded w-1/3"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={editCrop ? editCrop.stock : newCrop.stock}
            onChange={(e) => editCrop ? setEditCrop({ ...editCrop, stock: parseInt(e.target.value) }) : setNewCrop({ ...newCrop, stock: parseInt(e.target.value) })}
            className="p-2 border rounded w-1/3"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">{editCrop ? 'Update' : 'Add'}</button>
          {editCrop && (
            <button onClick={() => setEditCrop(null)} className="p-2 bg-gray-500 text-white rounded">Cancel</button>
          )}
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <ul>
        {inventory.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <span className="font-bold">{item.name}</span>
              <span>{item.stock}</span>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEditClick(item)} className="p-2 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDeleteCrop(item.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
