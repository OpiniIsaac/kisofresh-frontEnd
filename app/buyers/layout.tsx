import React from 'react';
import Sidebar from '@/components/buyers/Sidebar';

const BuyersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6  mt-10">
        {children}
      </main>
    </div>
  );
};

export const metadata = {
  title: "Admin - KisoIndex",
  description: "Admin dashboard for managing KisoIndex data.",
};

export default BuyersLayout;
