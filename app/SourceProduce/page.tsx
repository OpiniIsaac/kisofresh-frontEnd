import { Button } from "@/components/ui/button";
import { fetchUploadedData } from "@/lib/actions/source.actions";
import React from "react";

export default async function CropInterestForm() {
 const results = await fetchUploadedData();
 console.log(results);

 return (
    <div  className="w-screen h-screen flex justify-center items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Select Country
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="country">
            <option value="">--Please choose an option--</option>
            <option value="cotton">Uganda</option>
            <option value="wheat">Kenya</option>
            <option value="maize">Tanzania</option>
          
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
            Select Region
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="region">
            <option value="">--Please choose an option--</option>
            <option value="cotton">Northern</option>
            <option value="wheat">Central</option>
            <option value="maize">Eastern</option>
            <option value="maize">Western</option>
           
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropType">
            Select Crop Type
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cropType">
            <option value="">--Please choose an option--</option>
            <option value="cotton">Cotton</option>
            <option value="wheat">Wheat</option>
            <option value="maize">Maize</option>
          
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity(tons)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" placeholder="Enter quantity" />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Find Farmers
          </Button>
        </div>
      </form>
    </div>
 );
}
