"use client"
import { useState } from 'react';


const Quotes = () => {
  // Dummy data for quotes
  const initialQuotes = [
    { id: 'QUO001', buyer: 'John Doe', quote: '$500', status: 'Pending', date: '2024-06-20' },
    { id: 'QUO002', buyer: 'Jane Smith', quote: '$750', status: 'Pending', date: '2024-06-21' },
    { id: 'QUO003', buyer: 'Alice Brown', quote: '$600', status: 'Pending', date: '2024-06-22' },
    { id: 'QUO004', buyer: 'Bob Johnson', quote: '$900', status: 'Pending', date: '2024-06-23' },
    { id: 'QUO005', buyer: 'Charlie Green', quote: '$700', status: 'Pending', date: '2024-06-24' },
  ];

  const [quotes, setQuotes] = useState(initialQuotes);

  const handleApprove = (id:String) => {
    setQuotes(quotes.map(quote => quote.id === id ? { ...quote, status: 'Approved' } : quote));
  };

  const handleReject = (id:String) => {
    setQuotes(quotes.map(quote => quote.id === id ? { ...quote, status: 'Rejected' } : quote));
  };

  return (
    
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Quotes Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Quotes to be Approved</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.buyer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.quote}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-yellow-600">{quote.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition"
                        onClick={() => handleApprove(quote.id)}
                        disabled={quote.status !== 'Pending'}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleReject(quote.id)}
                        disabled={quote.status !== 'Pending'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

  );
};

export default Quotes;
