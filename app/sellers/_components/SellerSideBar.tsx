"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: '/sellers', label: 'Dashboard' },
    { href: '/sellers/inventory', label: 'Inventory' },
    { href: '/sellers/sales', label: 'Sales' },
    { href: '/sellers/orders', label: 'Orders' },
  ];

  return (
    <aside className="mt-20 w-64 bg-gray-800 text-white h-screen shadow-md fixed">
      <ul className="p-4">
        {menuItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link href={item.href}>
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-700 transition duration-200 ${isActive(item.href) ? 'bg-blue-500 text-white' : 'text-gray-300'}`}>
                {item.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
