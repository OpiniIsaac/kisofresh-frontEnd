
import TraderSidebar from '@/components/traders/TraderSidebar';

const TradersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TraderSidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export const metadata = {
  title: "Traders - KisoIndex",
  description: "Trader dashboard for managing KisoIndex data.",
};

export default TradersLayout;
