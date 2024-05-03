"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data//👌understood
  const products = [
    { id: 1, name: "Apple", price: 1.5, unit: "kg" },
    { id: 2, name: "Banana", price: 0.75, unit: "kg" },
    { id: 3, name: "Carrot", price: 0.5, unit: "kg" },
    { id: 4, name: "Potato", price: 0.6, unit: "kg" },
    { id: 5, name: "Tomato", price: 0.8, unit: "kg" },
    { id: 6, name: "Cherry", price: 1.5, unit: "kg" },
    { id: 7, name: "Guava", price: 0.75, unit: "kg" },
    { id: 8, name: "Sweet potato", price: 0.5, unit: "kg" },
    { id: 9, name: "Irish Potato", price: 0.6, unit: "kg" },
    { id: 10, name: "Egg plant", price: 0.8, unit: "kg" },
    { id: 11, name: "Cereal", price: 1.5, unit: "kg" },
    { id: 12, name: "Star fruit", price: 0.75, unit: "kg" },
    { id: 13, name: "Soy", price: 0.5, unit: "kg" },
    { id: 14, name: "bean", price: 0.6, unit: "kg" },
    { id: 15, name: "Small Tomato", price: 0.8, unit: "kg" },
    { id: 16, name: "Big Cherry", price: 1.5, unit: "kg" },
    { id: 17, name: "Guava Tropical", price: 0.75, unit: "kg" },
    { id: 18, name: "Dates", price: 0.5, unit: "kg" },
    { id: 19, name: "Rice", price: 0.6, unit: "kg" },
    { id: 20, name: "Peas", price: 0.8, unit: "kg" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: any) => {
    // Implement your edit logic here
    console.log("Edit product:", product);
  };

  const handleDelete = (id: any) => {
    // Implement your delete logic here
    console.log("Delete product with id:", id);
  };

  const handleNextClick = () => {
    page * rowsPerPage + rowsPerPage === products.length
      ? setPage(page)
      : setPage(page + 1);
  };

  const handlePrevClick = () => {
    page === 0 ? setPage(0) : setPage(page - 1);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl min-w-36 font-bold">Product Table</h2>
        <div className="flex items-center">
          <input
            className="border border-gray-300 rounded p-2 w-52 md:w-96"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-screen-2 md:w-full text-left table-auto  ">
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
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">
                    Ugx {product.price.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{product.unit}</td>
                  <td className="border px-4 py-2">
                    {Math.random() > 0.5 ? (
                      <span className="text-green-500">↑</span>
                    ) : (
                      <span className="text-red-500">↓</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between my-10">
        <Button onClick={handlePrevClick}>Previous</Button>
        <p className="flex items-center">
          Showing {page * rowsPerPage} to {page * rowsPerPage + rowsPerPage} of{" "}
          {products.length}
        </p>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}
