"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: '/buyers', label: 'Dashboard' },
    { href: '/buyers/products', label: 'Products' },
    { href: '/buyers/orders', label: 'Orders' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <ul className="p-4">
        {menuItems.map((item) => (
          <li key={item.href} className="mb-2">
            <Link href={item.href}>
              <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive(item.href) ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
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
