"use client";
import React, { useState } from 'react';

const CheckoutForm = ({ selectedPlan }:any) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      if (!cardNumber || !expiryDate || !cvc) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      console.log('Card Number:', cardNumber);
      console.log('Expiry Date:', expiryDate);
      console.log('CVC:', cvc);
      console.log('Selected Plan:', selectedPlan);

      setLoading(false);
      setCardNumber('');
      setExpiryDate('');
      setCvc('');
      setError(null);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <div className="flex space-x-4 w-full">
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
        disabled={loading}
      >
        {loading ? 'Processing...' : `Subscribe for ${selectedPlan.price}/month`}
      </button>
    </form>
  );
};

const plans = [
  { name: "Basic", price: "$10", description: "Access to basic trading insights.", benefits: ["Basic insights", "Monthly updates"] },
  { name: "Standard", price: "$20", description: "Includes basic insights plus premium features.", benefits: ["Basic insights", "Premium insights", "Weekly updates", "Email support"] },
  { name: "Premium", price: "$30", description: "All features plus personalized support.", benefits: ["Basic insights", "Premium insights", "Daily updates", "Priority support", "Personalized support"] },
];

export default function Page() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 w-full">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">Trading Insights</h1>
        <p className="text-lg mb-6 text-gray-700">
          Unlock the latest trading opportunities with AI-powered insights.
        </p>
        <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${selectedPlan.name === plan.name ? 'border-blue-600 bg-blue-100' : 'border-gray-300'} flex-1 flex flex-col`}
            >
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-lg">{plan.description}</p>
              <ul className="list-disc list-inside text-gray-600 my-4 flex-grow">
                {plan.benefits.map((benefit, index) => (
                  <div key={index}>{benefit}</div>
                ))}
              </ul>
              <p className="text-2xl font-bold text-blue-600">{plan.price}</p>
              <button
                className="mt-2 bg-blue-600 text-white py-1 px-3 rounded"
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <CheckoutForm selectedPlan={selectedPlan} />
      </div>
    </div>
  );
}
