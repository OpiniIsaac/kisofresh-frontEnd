"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSideBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className=" mt-20 w-64 bg-white shadow-md ">
   
      <nav>
        <ul>
          <li>
            <Link href="/admin">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/admin') ? 'bg-gray-200' : ''}`}>Home</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/orders">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/admin/orders') ? 'bg-gray-200' : ''}`}>Orders</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/quotes">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/admin/quotes') ? 'bg-gray-200' : ''}`}>Quotes</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/farmers">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/farmers') ? 'bg-gray-200' : ''}`}>Sellers</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/buyers">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/buyers') ? 'bg-gray-200' : ''}`}>Buyers</div>
            </Link>
          </li>
          <li>
            <Link href="/admin/buyers">
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive('/traders') ? 'bg-gray-200' : ''}`}>Traders</div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
