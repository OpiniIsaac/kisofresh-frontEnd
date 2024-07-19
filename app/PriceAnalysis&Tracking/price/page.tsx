"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cropPrices } from "@/lib/actions/source.actions";

type Product = {
  _id: string;
  Date: string;
  Crop: string;
  Prices: number;
};

export default function ProductTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const data = await cropPrices();
      console.log(data);
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product: any) =>
        product.Crop.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleNextClick = () => {
    const maxPage = Math.ceil(filteredProducts.length / rowsPerPage) - 1;
    setPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : prevPage));
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const handleRowClick = (crop: string,unit:string) => {
    router.push(`/PriceAnalysis&Tracking/chart?crop=${crop}/unit${unit}`);
  };

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product Table</h2>
        <div className="flex items-center">
          <input
            className="border border-gray-300 rounded-lg p-2 w-52 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Crop</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                  onClick={() => handleRowClick(product.Crop,product.Units)}
                >
                  <td className="border px-4 py-2">{product.Crop}</td>
                  <td className="border px-4 py-2">{product.Prices}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between items-center my-4">
        <Button onClick={handlePrevClick} disabled={page === 0}>
          Previous
        </Button>
        <p className="text-sm">
          Page {page + 1} of {Math.ceil(filteredProducts.length / rowsPerPage)}
        </p>
        <Button
          onClick={handleNextClick}
          disabled={page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
