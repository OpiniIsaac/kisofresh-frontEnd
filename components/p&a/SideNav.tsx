"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const buttonCollection: {key:number; title: string; route: string }[] = [
  {
    key: 1,
    title: "Prices",
    route: "/PriceAnalysis&Tracking/price",
  },
  {
    key: 2,
    title: "Weather",
    route: "/PriceAnalysis&Tracking/weather",
  },
  {
    key: 3,
    title: "Trading opportunities",
    route: "/PriceAnalysis&Tracking/tradingOpportunities",
  },
];

export default function SideNav() {
  const [isScrolled, setisScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY >= 100;
      setisScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (window) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const pathname = usePathname();
  return (
    <div
      className={`absolute md:fixed rounded-lg h-screen md:h-full w-52 flex flex-col ${
        isScrolled ? "my-10 transition-all ease-in-out" : "my-16"
      }`}
    >
      <div>
        <div className="fixed flex border w-screen justify-around bg-white py-2 md:hidden">
          {buttonCollection.map(({ title, route, key }) => (
            <Link href={route} key={key}>
              <Button
                className={clsx(
                  "bg-blue-500/5 mt-2 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white outline-none",
                  { "bg-blue-500 text-white": pathname === route }
                )}
              >
                {title}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:block mt-2">
          {buttonCollection.map(({ title, route, key }) => (
            <Link href={route} key={key}>
              <Button
                className={clsx(
                  "bg-blue-500/5 w-full mt-2 text-black justify-start hover:bg-blue-500 font-semibold text-sm hover:text-white",
                  { "bg-blue-500 text-white": pathname === route }
                )}
              >
                {title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
