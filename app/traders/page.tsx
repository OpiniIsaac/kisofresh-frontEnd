"use client";
import { useEffect, useState } from "react";
import { getUserCropCount } from "@/lib/actions/source.actions";
import { useAppSelector } from "@/lib/hooks";

const TraderDashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [totalProducts, setTotalProducts] = useState(0);
  const [purchaseData, setPurchaseData] = useState({
    item: "",
    quantity: "",
    boughtFrom: "",
    soldTo: "",
  });

  useEffect(() => {
    const fetchUserCropCount = async () => {
      if (user?.uid) {
        try {
          const data = await getUserCropCount(user.uid);
          setTotalProducts(data.count);
        } catch (error) {
          console.error("Failed to fetch crop count", error);
        }
      }
    };

    fetchUserCropCount();
  }, [user?.uid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission to save purchase data
    console.log(purchaseData);
    setPurchaseData({
      item: "",
      quantity: "",
      boughtFrom: "",
      soldTo: "",
    });
  };

  return (
    <div className="px-4 py-10 sm:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">
        Trader Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Total Products</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Total Sales</h3>
              <p className="text-2xl font-bold">Coming soon</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Total Purchases</h3>
              <p className="text-2xl font-bold">Coming soon</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium">Total Orders</h3>
              <p className="text-2xl font-bold">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Record a Purchase */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-lg mx-auto md:max-w-none md:mx-0">
        <h2 className="text-xl font-semibold mb-4">Record a Purchase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="item">
              Item
            </label>
            <input
              type="text"
              id="item"
              name="item"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={purchaseData.item}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={purchaseData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="boughtFrom">
              Bought From
            </label>
            <input
              type="text"
              id="boughtFrom"
              name="boughtFrom"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={purchaseData.boughtFrom}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="soldTo">
              Sold To
            </label>
            <input
              type="text"
              id="soldTo"
              name="soldTo"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={purchaseData.soldTo}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 focus:ring-4 focus:ring-blue-300"
          >
            Save Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default TraderDashboard;
