"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
 fetchFarmersByCriteria,
 fetchUploadedData,
} from "@/lib/actions/source.actions";
import React from "react";

export default function CropInterestForm() {
 interface Farmer {
    _id: string;
    'Farm Code': string;
    'Family Name': string;
    'Christian Name': string;
    'Phone Number': number;
    District: string;
    Subcounty: string;
    Village: string;
    'Acres for Cotton': number;
    'Yield Estimation': {
      formula?: string;
      result: number;
      sharedFormula?: string;
      ref?: string;
      shareType?: string;
    };
    'Crop Type': string;
    'Country': string;
    Region: string;
 }
 const [country, setCountry] = useState("");
 const [region, setRegion] = useState("");
 const [cropType, setCropType] = useState("");
 const [quantity, setQuantity] = useState(0);
 const [farmers, setFarmers] = useState<Farmer[]>([]);

 const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetchFarmersByCriteria({
        country,
        region,
        cropType,
        quantity: 100,
      });
      console.log("Farmers matching criteria:", response);
      console.log(country, region, cropType, quantity);
      setFarmers(response);
    } catch (error) {
      console.error("Error:", error);
    }
 };

 return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
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
      {farmers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Farmers Matching Criteria:</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Christian Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcounty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Village</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acres for Cotton</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield Estimation Result</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmers.map((farmer, index) => (
                <tr key={index}>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Family Name']}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Christian Name']}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Phone Number']}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer.District}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer.Subcounty}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer.Village}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Acres for Cotton']}</td>
                 {/* <td className="px-6 py-4 whitespace-nowrap">{farmer['Yield Estimation'].result}</td> */}
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Crop Type']}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer['Country']}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{farmer.Region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
 );}
