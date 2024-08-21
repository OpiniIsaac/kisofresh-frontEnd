"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import swal from 'sweetalert';
import { WithId, Document } from 'mongodb'; // Import the necessary types
import Link from 'next/link';

const AdminQuoteManager = () => {
  const [quotes, setQuotes] = useState<WithId<Document>[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        swal({
          title: "Error",
          text: "Failed to fetch quotes from the database.",
          icon: "error",
        });
      }
    };

    fetchQuotes();
  }, []);

  const handleQuoteAction = async (quoteId: string, action: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }),
      });
      if (!response.ok) throw new Error('Failed to update quote status');

      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id.toString() === quoteId ? { ...quote, status: action } : quote
        )
      );
    } catch (error) {
      console.error('Error updating quote:', error);
      swal({
        title: "Error",
        text: "Failed to update the quote status.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Quote Requests</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Crop</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Region</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Delivery Option</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id.toString()}>
              <td className="py-2 px-4 border-b">{quote.crop}</td>
              <td className="py-2 px-4 border-b">{quote.country}</td>
              <td className="py-2 px-4 border-b">{quote.region}</td>
              <td className="py-2 px-4 border-b">{quote.quantity}</td>
              <td className="py-2 px-4 border-b">{quote.deliveryOption}</td>
              <td className="py-2 px-4 border-b">{quote.status}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/admin/quotes/${quote._id.toString()}`}>
                  <Button>
                    View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuoteManager;
