// components/Sidebar.js
import Link from 'next/link';

const Sidebar = () => (
  <aside className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
    <ul>
      <li><Link href="/seller">Inventory</Link></li>
      <li><Link href="/Sales">Sales</Link></li>
      <li><Link href="/orders">Orders</Link></li>
    </ul>
  </aside>
);

export default Sidebar;
