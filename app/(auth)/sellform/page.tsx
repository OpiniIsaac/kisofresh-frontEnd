"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

type Product = {
  crop: string;
  quantity: string;
  description: string;
};

type SellerData = {
  name: string;
  email: string;
  products: Product[];
};

const SellerForm = () => {
  const router = useRouter();

  const [sellerData, setSellerData] = useState<SellerData>({
    name: '',
    email: '',
    products: [{ crop: '', quantity: '', description: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const products = [...sellerData.products];
      products[index][name as keyof Product] = value;
      setSellerData({ ...sellerData, products });
    } else {
      setSellerData({ ...sellerData, [name]: value });
    }
  };

  const addProduct = () => {
    setSellerData({
      ...sellerData,
      products: [...sellerData.products, { crop: '', quantity: '', description: '' }],
    });
  };

  const removeProduct = (index: number) => {
    const products = [...sellerData.products];
    products.splice(index, 1);
    setSellerData({ ...sellerData, products });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your form submission logic here
    console.log(sellerData); // Example: Log seller data before submission
    router.push('/success'); // Redirect after form submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={sellerData.name}
              onChange={(e) => handleChange(e)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={sellerData.email}
              onChange={(e) => handleChange(e)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            {sellerData.products.map((product, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`crop-${index}`} className="block text-gray-700 mb-2">
                    Crop
                  </label>
                  <input
                    type="text"
                    id={`crop-${index}`}
                    name="crop"
                    value={product.crop}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`quantity-${index}`} className="block text-gray-700 mb-2">
                    Quantity (tonnes)
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`description-${index}`} className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={product.description}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    required
                  />
                </div>
                <div className="flex items-center">
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addProduct}
                      className="ml-auto bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center"
                    >
                      <PlusCircleIcon className="h-5 w-5 mr-2" />
                      Add Product
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="ml-auto bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 flex items-center"
                    >
                      <XCircleIcon className="h-5 w-5 mr-2" />
                      Remove Product
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
