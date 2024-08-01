// app/admin/layout.js
import AdminSideBar from '@/components/p&a/AdminSideBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />
      <main className="mt-10 flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export const metadata = {
  title: "Admin - KisoIndex",
  description: "Admin dashboard for managing KisoIndex data.",
};

export default AdminLayout;
