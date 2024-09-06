
import Sidebar from './_components/SellerSideBar';

const SellerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export const metadata = {
  title: "Sellers- KisoIndex",
  description: "sellers dashboard for managing KisoIndex data.",
};

export default SellerDashboardLayout;
