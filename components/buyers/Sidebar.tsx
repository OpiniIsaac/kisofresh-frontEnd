// components/buyers/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <ul className="p-4">
        <li className="mb-2">
          <Link href="/buyers">
            <a className="text-gray-700">Dashboard</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/buyers/products">
            <a className="text-gray-700">Products</a>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/buyers/orders">
            <a className="text-gray-700">Orders</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
