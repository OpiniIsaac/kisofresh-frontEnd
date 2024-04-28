"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchFarmersByCriteria,
  fetchUploadedData,
} from "@/lib/actions/source.actions";
import React from "react";

export default function CropInterestForm() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [farmers, setFarmers] = useState([]);

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Fetch farmers by criteria
      const response = await fetchFarmersByCriteria({
        country,
        region,
        cropType,
        quantity: 100,
      });
      console.log("Farmers matching criteria:", response);

      console.log(country,
        region,
        cropType,
        quantity);

      // Update state with fetched farmers
      setFarmers(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Form inputs */}
        {/* Select Country */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Select Country
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="Uganda">Uganda</option>
            <option value="Kenya">Kenya</option>
            <option value="Tanzania">Tanzania</option>
          </select>
        </div>
        {/* Select Region */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region"
          >
            Select Region
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="Northern">Northern</option>
            <option value="Central">Central</option>
            <option value="Eastern">Eastern</option>
            <option value="Western">Western</option>
          </select>
        </div>
        {/* Select Crop Type */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cropType"
          >
            Select Crop Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cropType"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            <option value="cotton">Cotton</option>
            <option value="Wheat">Wheat</option>
            <option value="Maize">Maize</option>
          </select>
        </div>
        {/* Quantity input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity(tons)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
        </div>
        {/* Submit button */}
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Find Farmers
          </Button>
        </div>
      </form>
      {/* Display fetched farmers */}
      <div>
        {farmers.length > 0 && (
          <div>
            <h2>Farmers Matching Criteria:</h2>
            <ul>
              {farmers.map((farmer, index) => (
                <li key={index}>{}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
