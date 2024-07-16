// components/buyers/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <ul className="p-4">
        <li className="mb-2">
          <Link href="/buyers">
            <div className="text-gray-700">Dashboard</div>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/buyers/products">
            <div className="text-gray-700">Products</div>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/buyers/orders">
            <div className="text-gray-700">Orders</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
