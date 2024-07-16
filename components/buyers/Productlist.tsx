 "use client"
import { useState } from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Maize', price: '$50 per ton' },
    { id: 2, name: 'Rice', price: '$40 per ton' },
    { id: 3, name: 'Beans', price: '$60 per ton' },
  ];

  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: string; } | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 bg-white shadow rounded cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div className="mt-4 p-4 bg-gray-100 shadow rounded">
          <h3 className="text-xl font-bold mb-2">Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Price:</strong> {selectedProduct.price}</p>
          <button onClick={() => setSelectedProduct(null)} className="mt-2 p-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
