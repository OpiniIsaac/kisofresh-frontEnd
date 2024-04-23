'use client'
import React, { useState, useEffect } from 'react';

export default function ProductTable() {
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [searchTerm, setSearchTerm] = useState('');

 // Dummy data//👌understood
 const products = [
    { id: 1, name: 'Apple', price: 1.50, unit: 'kg' },
    { id: 2, name: 'Banana', price: 0.75, unit: 'kg' },
    { id: 3, name: 'Carrot', price: 0.50, unit: 'kg' },
    { id: 4, name: 'Potato', price: 0.60, unit: 'kg' },
    { id: 5, name: 'Tomato', price: 0.80, unit: 'kg' },
   
 ];

 const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 const handleEdit = (product:any) => {
    // Implement your edit logic here
    console.log('Edit product:', product);
 };

 const handleDelete = (id:any) => {
    // Implement your delete logic here
    console.log('Delete product with id:', id);
 };

 return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-center items-center mb-4">
     
        
          <input
            className="border border-gray-300 rounded p-2 w-96"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
      
      </div>
      <div className="overflow-auto max-h-96">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Indicator</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">Ugx {product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{product.unit}</td>
                <td className="border px-4 py-2">
                 {Math.random() > 0.5 ? <span className="text-green-500">↑</span> : <span className="text-red-500">↓</span>}
                </td>
                <td className="border px-4 py-2">
                 <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(product)}>Edit</button>
                </td>
                <td className="border px-4 py-2">
                 <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Implement your dialogs and buttons here */}
    </div>
 );
}
