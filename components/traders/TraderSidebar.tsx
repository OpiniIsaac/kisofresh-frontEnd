"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const TraderSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    // { href: '/traders', label: 'Dashboard' },
    { href: '/traders/products', label: 'Source Produce' },
    { href: '/traders/quotes', label: 'Quotes' },
    { href: '/traders/inventory', label: 'Inventory' },
    { href: '/traders/orders', label: 'Orders' },
    { href: '/traders/sales', label: 'Sales' },
    // { href: '/traders/purchases', label: 'Purchase History' },
  ];

  return (
    <>
    <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md fixed w-full z-50">
    <h1 className="ps-4 md:ps-0 text-blue-500 font-extrabold transition-all ease-in-out ">KisoIndex</h1>
    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
      {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>
  </div>
  <aside className={`fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white shadow-md md:relative md:translate-x-0 md:mt-20 w-64`}>
    <ul className="p-4 mt-16 md:mt-0">
      {menuItems.map((item) => (
        <li key={item.href} className="mb-2">
          <Link href={item.href} onClick={() => setIsOpen(false)}>
            <div className={`block py-2.5 px-4 rounded hover:bg-gray-200 ${isActive(item.href) ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
              {item.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </aside>
  </>
  );
};

export default TraderSidebar;
