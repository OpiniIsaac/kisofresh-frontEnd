"use client";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
      billing_details: {
        email,
      },
    });

    if (error) {
      setError(error.message || 'An error occurred');
      setLoading(false);
      return;
    }

    // Send paymentMethod.id to your server to create a payment intent and confirm the payment

    // For now, just log the payment method
    console.log('Payment method created:', paymentMethod);
    setLoading(false);
    setEmail('');
    setError(null);

    // Clear the card input
    cardElement?.clear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <CardElement className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
