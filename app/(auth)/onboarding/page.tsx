"use client";
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { useAppSelector } from '@/lib/hooks';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface LocationField {
  label: string;
  type: string;
  placeholder: string;
}

const locationFields: { [key: string]: LocationField[] } = {
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

const OnboardingScreen: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [locationDetails, setLocationDetails] = useState<LocationField[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const handleCountryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setLocationDetails(locationFields[country] || []);
  }, []);

  const handlePhoneNumberChange = useCallback((phone: string, country: { dialCode: string }) => {
    setPhoneNumber(phone);
  }, []);

  const handleRoleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const userData = {
      firstName: (document.getElementById('firstName') as HTMLInputElement).value,
      secondName: (document.getElementById('secondName') as HTMLInputElement).value,
      country: selectedCountry,
      role: selectedRole,
      phoneNumber: phoneNumber,
      locationDetails: locationDetails.map((field) => ({
        label: field.label,
        value: (document.getElementById(field.label.toLowerCase()) as HTMLInputElement).value,
      })),
    };

    try {
      if (!user) throw new Error('User not authenticated');
      if (!selectedRole) throw new Error('Please select a role');

      await setDoc(doc(db, 'users', user.uid), userData);

      switch (selectedRole) {
        case 'farmer':
          router.push('/seller');
          break;
        case 'buyer':
          router.push('/buyers');
          break;
        case 'trader':
          router.push('/traders/products');
          break;
        default:
          throw new Error(`Unsupported role: ${selectedRole}`);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>

        <form onSubmit={handleSubmit} className='space-y-8'>
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
                <select id="userRole" className="mt-1 p-2 w-full border rounded-lg" value={selectedRole} onChange={handleRoleChange}>
                  <option value="">Select Role</option>
                  <option value="farmer">Farmers</option>
                  <option value="buyer">Buyer (Exporters, Processors, etc.)</option>
                  <option value="trader">Trader</option>
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

          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <PhoneInput
  country={'ug'}
  value={phoneNumber}
  onChange={(phone, countryData: { dialCode: string }) => handlePhoneNumberChange(phone, countryData)}
  preferredCountries={['ug', 'ke', 'tz', 'rw', 'bi']}
  placeholder="Enter phone number"
  inputClass="mt-1 p-2 w-full border rounded-lg"
/>

          </div>

          <div className="mt-6">
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
              disabled={isSubmitting || !selectedRole}
            >
              {isSubmitting ? 'Submitting...' : 'Continue'}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OnboardingScreen;
