"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid';

type Product = {
  crop: string;
  quantity: string;
  description?: string;
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          List Your Products
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Provide details about your products to get started with selling.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Products in Stock</h3>
            {sellerData.products.map((product, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
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
                <div className="flex-1">
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
                <div className="flex-1">
                  <label htmlFor={`description-${index}`} className="block text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={product.description}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 p-2 w-full border rounded-lg"
                    placeholder="e.g., Coffee Grade One"
                  />
                </div>
                <div className="flex items-center mt-4 md:mt-0">
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addProduct}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center"
                    >
                      <PlusCircleIcon className="h-5 w-5 mr-2" />
                      Add Another Product
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 flex items-center"
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
              Submit Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerForm;
