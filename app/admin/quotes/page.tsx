"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import swal from "sweetalert";
import { WithId, Document } from "mongodb"; // Import the necessary types
import Link from "next/link";

const AdminQuoteManager = () => {
  const [quotes, setQuotes] = useState<WithId<Document>[]>([]);
  const [totalQuotes, setTotalQuotes] = useState<number>(0); // Add total quotes state

  // Fetch the total number of quotes
  useEffect(() => {
    const fetchTotalQuotes = async () => {
      try {
        const response = await fetch("/api/total"); // Assuming /api/total returns the total number of quotes
        if (!response.ok) throw new Error("Failed to fetch total quotes");
        const data = await response.json();
        setTotalQuotes(data.totalQuotesReceived); // Set the total number of quotes
      } catch (error) {
        console.error("Error fetching total quotes:", error);
      }
    };

    fetchTotalQuotes();
  }, []);

  // Fetch quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/quotes");
        if (!response.ok) throw new Error("Failed to fetch quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        swal({
          title: "Error",
          text: "Failed to fetch quotes from the database.",
          icon: "error",
        });
      }
    };

    fetchQuotes();
  }, []);

  // Handle quote actions
  const handleQuoteAction = async (quoteId: string, action: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: action }),
      });
      if (!response.ok) throw new Error("Failed to update quote status");

      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote._id.toString() === quoteId
            ? { ...quote, status: action }
            : quote
        )
      );
    } catch (error) {
      console.error("Error updating quote:", error);
      swal({
        title: "Error",
        text: "Failed to update the quote status.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
       Quote Requests
      </h1>

      {/* Total Quotes Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-semibold text-gray-600">
          Total Quotes: <span className="text-blue-600">{totalQuotes}</span>
        </div>
      </div>

      {/* Quotes Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Crop
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Country
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Region
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Quantity
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Delivery Option
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Status
            </th>
            <th className="py-3 px-6 text-left font-semibold text-gray-600 border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id.toString()} className="hover:bg-gray-50">
              <td className="py-3 px-6 border-b text-gray-700">{quote.crop}</td>
              <td className="py-3 px-6 border-b text-gray-700">
                {quote.country}
              </td>
              <td className="py-3 px-6 border-b text-gray-700">
                {quote.region}
              </td>
              <td className="py-3 px-6 border-b text-gray-700">
                {quote.quantity}
              </td>
              <td className="py-3 px-6 border-b text-gray-700">
                {quote.deliveryOption}
              </td>
              <td className="py-3 px-6 border-b text-gray-700">
                {quote.status}
              </td>
              <td className="py-3 px-6 border-b">
                <Link href={`/admin/quotes/${quote._id.toString()}`}>
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
