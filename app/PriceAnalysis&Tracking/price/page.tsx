"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data
  const products = [
    { id: 1, name: "Apple", price: 1000, unit: "kg", previousPrice: 900 },
    { id: 2, name: "Banana", price: 8000, unit: "kg", previousPrice: 7000 },
    { id: 3, name: "Carrot", price: 300, unit: "kg", previousPrice: 450 },
    { id: 4, name: "Potato", price: 500, unit: "kg", previousPrice: 550 },
    { id: 5, name: "Tomato", price: 800, unit: "kg", previousPrice: 750 },
    { id: 6, name: "Cherry", price: 1350, unit: "kg", previousPrice: 1400 },
    { id: 7, name: "Guava", price: 950, unit: "kg", previousPrice: 900 },
    { id: 8, name: "Sweet potato", price: 500, unit: "kg", previousPrice: 450 },
    { id: 9, name: "Irish Potato", price: 320, unit: "kg", previousPrice: 550 },
    { id: 10, name: "Egg plant", price: 800, unit: "kg", previousPrice: 750 },
    { id: 11, name: "Cereal", price: 1500, unit: "kg", previousPrice: 1400 },
    { id: 12, name: "Star fruit", price: 7500, unit: "kg", previousPrice: 7000 },
    { id: 13, name: "Soy", price: 5000, unit: "kg", previousPrice: 4500 },
    { id: 14, name: "Bean", price: 600, unit: "kg", previousPrice: 550 },
    { id: 15, name: "Small Tomato", price: 800, unit: "kg", previousPrice: 750 },
    { id: 16, name: "Big Cherry", price: 1300, unit: "kg", previousPrice: 1400 },
    { id: 17, name: "Guava Tropical", price: 7500, unit: "kg", previousPrice: 7000 },
    { id: 18, name: "Dates", price: 500, unit: "kg", previousPrice: 450 },
    { id: 19, name: "Rice", price: 600, unit: "kg", previousPrice: 950 },
    { id: 20, name: "Peas", price: 800, unit: "kg", previousPrice: 750 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product:any) => {
    // Implement your edit logic here
    console.log("Edit product:", product);
  };

  const handleDelete = (id:any) => {
    // Implement your delete logic here
    console.log("Delete product with id:", id);
  };

  const handleNextClick = () => {
    const maxPage = Math.ceil(filteredProducts.length / rowsPerPage) - 1;
    setPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : prevPage));
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const calculatePercentageChange = (currentPrice:any, previousPrice:any) => {
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    return percentage;
  };

  

  

  return (
    <div className="p-4 w-screen md:w-full overflow-auto">
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
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Indicator</th>
              <th className="px-4 py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                const percentageChange = calculatePercentageChange(
                  product.price,
                  product.previousPrice
                );
                const isPriceIncreased = percentageChange > 0;
                const isPriceDecreased = percentageChange < 0;
                return (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">
                      Ugx {product.price.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{product.unit}</td>
                    <td className="border px-4 py-2">
                      {isPriceIncreased ? (
                        <span className="text-green-500">↑</span>
                      ) : isPriceDecreased ? (
                        <span className="text-red-500">↓</span>
                      ) : (
                        <span className="text-gray-500">↔</span>
                      )}
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        isPriceIncreased
                          ? "text-green-500"
                          : isPriceDecreased
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {percentageChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between my-10">
        <Button onClick={handlePrevClick}>Previous</Button>
        <p className="flex items-center">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </p>
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
}
