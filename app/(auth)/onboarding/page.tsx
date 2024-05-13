"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { Login } from "@/lib/features/accountHandle/loginSlice";
import { useRouter } from 'next/navigation';

const OnboardingScreen = () => {
 // Define interfaces for the structure of the fields and steps
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

 // State hooks for managing the current step and user type
 const [step, setStep] = React.useState(0);
 const [userType, setUserType] = React.useState<string | null>(null);

 // Hooks for dispatching actions and routing
 const dispatch = useDispatch();
 const router = useRouter();

 // Function to handle the sign up process
 const handleSignUp = () => {
    router.push("/SourceProduce");
    dispatch(Login());
 };

 // Function to navigate to the next step
 const nextStep = () => {
  
    if (step === 0) {
      setUserType(userType);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
 };

 // Function to navigate to the previous step
 const prevStep = () => {
    setStep(step - 1);
 };

 // Define the steps for the onboarding process
 const steps: Step[] = [
    {
      title: 'Welcome',
      description: 'Choose your role:',
      options: [
        { label: 'Farmer', value: 'farmer' },
        { label: 'Transporter', value: 'transporter' },
        { label: 'Trader', value: 'trader' }, 
      ],
    },
    {
      title: 'Sign Up',
      description: 'Create your account to get started.',
      fields: userType === 'farmer' ? [
        { label: 'Name', type: 'text', placeholder: 'Enter your name' },
        { label: 'Crop Type', type: 'text', placeholder: 'Enter your crop type' },
        { label: 'Address', type: 'text', placeholder: 'Enter your address' },
      ] : userType === 'transporter' ? [
        { label: 'Name', type: 'text', placeholder: 'Enter your name' },
        { label: 'Driving Permit', type: 'text', placeholder: 'Enter your driving permit number' },
        { label: 'Quality', type: 'text', placeholder: 'Enter your quality' },
        { label: 'Taken Location', type: 'text', placeholder: 'Enter the location' },
      ] : [
        { label: 'Name', type: 'text', placeholder: 'Enter your name' },
        { label: 'Contact Information', type: 'text', placeholder: 'Enter your contact information' },
        { label: 'Business Type', type: 'text', placeholder: 'Enter your business type' },
        { label: 'Location', type: 'text', placeholder: 'Enter your location' },
      ], 
    },
 ];

 // Function to render the fields for the current step
 const renderFields = (fields: { label: string; type: string; placeholder: string }[]) => {
    return fields.map((field, index: number) => (
      <div key={index} className="mb-4">
        <label htmlFor={field.type} className="block text-sm font-medium text-gray-700">{field.label}</label>
        <input type={field.type} name={field.type} id={field.type} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={field.placeholder} />
      </div>
    ));
 };

 // Render the onboarding screen
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
                className={`px-4 py-2 text-white ${userType === option.value? 'bg-blue-500' : 'bg-gray-200'} rounded hover:bg-blue-600`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        {step === 1 && steps[1].fields && renderFields(steps[1].fields)}

        <div className="flex justify-between w-full mt-6">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
          {step === steps.length - 1 && userType && (
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </div>
 );
};

export default OnboardingScreen;
