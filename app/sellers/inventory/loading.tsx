import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-10 h-10 rounded-full bg-blue-500 animate-bounce delay-150"></div>
        <div className="w-10 h-10 rounded-full bg-blue-500 animate-bounce delay-300"></div>
      </div>
      <p className="ml-4 text-lg font-extrabold  text-gray-700">Loading...</p>
    </div>
  );
}
