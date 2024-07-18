"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from "@/lib/features/accountHandle/loginSlice";
import { useRouter } from 'next/navigation';

const locationFields = {
  Uganda: [
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Sub-county', type: 'text', placeholder: 'Enter your sub-county' },
    { label: 'Village', type: 'text', placeholder: 'Enter your village' },
  ],
  Kenya: [
    { label: 'County', type: 'text', placeholder: 'Enter your county' },
    { label: 'Sub-county', type: 'text', placeholder: 'Enter your sub-county' },
    { label: 'Ward', type: 'text', placeholder: 'Enter your ward' },
  ],
  Tanzania: [
    { label: 'Region', type: 'text', placeholder: 'Enter your region' },
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Village', type: 'text', placeholder: 'Enter your village' },
  ],
  Rwanda: [
    { label: 'Province', type: 'text', placeholder: 'Enter your province' },
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Sector', type: 'text', placeholder: 'Enter your sector' },
  ],
  Burundi: [
    { label: 'Province', type: 'text', placeholder: 'Enter your province' },
    { label: 'Commune', type: 'text', placeholder: 'Enter your commune' },
    { label: 'Colline', type: 'text', placeholder: 'Enter your colline' },
  ],
};

const OnboardingScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [locationDetails, setLocationDetails] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setLocationDetails(locationFields[country] || []);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>
        
        <div className='space-y-8'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="firstName" className="block text-gray-700">First Name</label>
              <input type="text" id="firstName" className="mt-1 p-2 w-full border rounded-lg" />
            </div>
            <div>
              <label htmlFor="secondName" className="block text-gray-700">Second Name</label>
              <input type="text" id="secondName" className="mt-1 p-2 w-full border rounded-lg" />
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="country" className="block text-gray-700">Country</label>
              <select id="country" className="mt-1 p-2 w-full border rounded-lg" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {Object.keys(locationFields).map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            {selectedCountry && (
              <div>
                <label htmlFor="userRole" className="block text-gray-700">Role</label>
                <select id="userRole" className="mt-1 p-2 w-full border rounded-lg">
                  <option value="">Select Role</option>
                  <option value="seller">Seller (Farmers, Warehouses, etc.)</option>
                  <option value="buyer">Buyer (Exporters, Processors, etc.)</option>
                </select>
              </div>
            )}
          </div>
          
          {selectedCountry && (
            <div className='space-y-4'>
              <h3 className="text-xl font-semibold">Location Details</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {locationDetails.map((field, index) => (
                  <div key={index}>
                    <label htmlFor={field.label.toLowerCase()} className="block text-gray-700">{field.label}</label>
                    <input type={field.type} id={field.label.toLowerCase()} placeholder={field.placeholder} className="mt-1 p-2 w-full border rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
