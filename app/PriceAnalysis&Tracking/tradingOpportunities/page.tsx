"use client";
import React, { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    console.log('Subscribed with email:', email);
    // Clear the input field after submission
    setEmail('');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-blue-600">Trading Insights</h1>
        <p className="text-lg mb-6 text-gray-700">
          Unlock the latest trading opportunities with AI-powered insights.
          <br />
          Subscribe now for exclusive updates at a fee of 
          <span className="text-blue-600 font-bold text-xl"> $10 per month</span>.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center justify-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
