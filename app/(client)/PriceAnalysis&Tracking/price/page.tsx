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

  useEffect(() => {
    async function fetchProducts() {
      const data = await cropPrices();
      console.log(data)
      setProducts(data);
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

  const handleRowClick = (crop: string) => {
    router.push(`/PriceAnalysis&Tracking/chart?crop=${crop}`);
  };

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product Table</h2>
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
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2">Date</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Crop</th>
              <th className="px-2 py-1 md:px-4 md:py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(product.Crop)}
                >
                  <td className="border px-2 py-1 md:px-4 md:py-2 whitespace-nowrap">{product.Date}</td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 whitespace-nowrap">{product.Crop}</td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 whitespace-nowrap">{product.Prices}</td>
                </tr>
              ))}
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
