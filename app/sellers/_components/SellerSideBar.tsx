// components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
    <ul>
      <li><Link href="/sellers">Inventory</Link></li>
      <li><Link href="/sellers/sales">Sales</Link></li>
      <li><Link href="/sellers/orders">Orders</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
