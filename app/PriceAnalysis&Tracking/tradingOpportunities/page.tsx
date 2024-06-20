"use client";
import React, { useState } from 'react';

const CheckoutForm = () => {
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
        {loading ? 'Processing...' : 'Subscribe for $10/month'}
      </button>
    </form>
  );
};

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">Trading Insights</h1>
        <p className="text-lg mb-6 text-gray-700">
          Unlock the latest trading opportunities with AI-powered insights.
          <br />
          Subscribe now for exclusive updates at a fee of
          <span className="text-blue-600 font-bold text-xl"> $10 per month</span>.
        </p>
        <CheckoutForm />
      </div>
    </div>
  );
}
