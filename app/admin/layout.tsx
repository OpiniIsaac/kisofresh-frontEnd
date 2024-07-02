import AdminSideBar from '@/components/p&a/AdminSideBar';


const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
