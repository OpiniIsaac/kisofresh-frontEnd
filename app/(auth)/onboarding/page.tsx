"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from "@/lib/features/accountHandle/loginSlice";
import { useRouter } from 'next/navigation';

interface Field {
  label: string;
  type: string;
  placeholder: string;
}

interface Step {
  title: string;
  description: string;
  options?: { label: string; value: string }[];
  fields?: Field[];
}

const locationFields: Record<string, Field[]> = {
  uganda: [
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Sub-county', type: 'text', placeholder: 'Enter your sub-county' },
    { label: 'Village', type: 'text', placeholder: 'Enter your village' },
  ],
  kenya: [
    { label: 'County', type: 'text', placeholder: 'Enter your county' },
    { label: 'Sub-county', type: 'text', placeholder: 'Enter your sub-county' },
    { label: 'Ward', type: 'text', placeholder: 'Enter your ward' },
  ],
  tanzania: [
    { label: 'Region', type: 'text', placeholder: 'Enter your region' },
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Village', type: 'text', placeholder: 'Enter your village' },
  ],
  rwanda: [
    { label: 'Province', type: 'text', placeholder: 'Enter your province' },
    { label: 'District', type: 'text', placeholder: 'Enter your district' },
    { label: 'Sector', type: 'text', placeholder: 'Enter your sector' },
  ],
  burundi: [
    { label: 'Province', type: 'text', placeholder: 'Enter your province' },
    { label: 'Commune', type: 'text', placeholder: 'Enter your commune' },
    { label: 'Colline', type: 'text', placeholder: 'Enter your colline' },
  ],
};

const userSpecificFields: Record<string, Field[]> = {
  farmer: [
    { label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Crop type', type: 'text', placeholder: 'Enter your crop type' },
    { label: 'Acres grown', type: 'number', placeholder: 'Enter acres grown' },
  ],
  warehouse: [
    { label: 'Warehouse Name', type: 'text', placeholder: 'Enter your warehouse name' },
    { label: 'Capacity (tons)', type: 'number', placeholder: 'Enter capacity in tons' },
    { label: 'Manager Name', type: 'text', placeholder: 'Enter manager name' },
  ],
  trader: [
    { label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { label: 'Contact Information', type: 'text', placeholder: 'Enter your contact information' },
    { label: 'Business Type', type: 'text', placeholder: 'Enter your business type' },
  ],
};

const steps: Step[] = [
  {
    title: 'Welcome',
    description: 'Choose your role:',
    options: [
      { label: 'Farmer', value: 'farmer' },
      { label: 'Warehouse', value: 'warehouse' },
      { label: 'Trader', value: 'trader' },
    ],
  },
  {
    title: 'Choose Country',
    description: 'Select your country:',
  },
  {
    title: 'Location Details',
    description: 'Provide detailed location information.',
    fields: [],
  },
  {
    title: 'User Details',
    description: 'Provide your details.',
    fields: [],
  },
];

const OnboardingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [locationDetails, setLocationDetails] = useState<{ [key: string]: string }>({});
  const [userDetails, setUserDetails] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignUp = () => {
    if (validateFields(getUserSpecificFields(userType))) {
      router.push("/SourceProduce");
      dispatch(Login());
    }
  };

  const nextStep = () => {
    if (step === 2 && !validateFields(getLocationFields(country))) return;
    if (step === 3 && !validateFields(getUserSpecificFields(userType))) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getLocationFields = (country: string | null): Field[] => {
    return country ? locationFields[country] || [] : [];
  };

  const getUserSpecificFields = (userType: string | null): Field[] => {
    return userType ? userSpecificFields[userType] || [] : [];
  };

  const validateFields = (fields: Field[]): boolean => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach(field => {
      const fieldName = field.label.toLowerCase().replace(/ /g, '-');
      if (!locationDetails[fieldName] && step === 2) {
        newErrors[fieldName] = `${field.label} is required`;
      }
      if (!userDetails[fieldName] && step === 3) {
        newErrors[fieldName] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
  };

  const renderFields = (fields: Field[], setter: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>) => {
    return fields.map((field, index) => {
      const fieldName = field.label.toLowerCase().replace(/ /g, '-');
      return (
        <div key={index} className="mb-4">
          <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type}
            name={fieldName}
            id={fieldName}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={field.placeholder}
            onChange={handleInputChange(setter)}
          />
          {errors[fieldName] && <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p>}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">{steps[step].title}</h2>
        <p className="text-center mb-6">{steps[step].description}</p>
        {step === 0 && (
          <div className="flex justify-center space-x-4">
            {steps[0].options?.map((option) => (
              <button
                key={option.value}
                onClick={() => setUserType(option.value)}
                className={`px-4 py-2 text-white ${userType === option.value ? 'bg-blue-500' : 'bg-gray-200'} rounded hover:bg-blue-600`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="flex justify-center">
            <select
              value={country || ''}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select your country
              </option>
              <option value="uganda">Uganda</option>
              <option value="kenya">Kenya</option>
              <option value="tanzania">Tanzania</option>
              <option value="rwanda">Rwanda</option>
              <option value="burundi">Burundi</option>
            </select>
          </div>
        )}
        {step === 2 && (
          <>
            {steps[2].fields && renderFields(getLocationFields(country), setLocationDetails)}
          </>
        )}
        {step === 3 && (
          <>
            {steps[3].fields && renderFields(getUserSpecificFields(userType), setUserDetails)}
          </>
        )}

        <div className={`flex justify-${step === 0 ? 'center' : 'between'} w-full mt-6`}>
          {step > 0 && (
            <button onClick={prevStep} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button onClick={nextStep} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Next
            </button>
          )}
          {step === steps.length - 1 && (
            <button onClick={handleSignUp} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Sign up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
