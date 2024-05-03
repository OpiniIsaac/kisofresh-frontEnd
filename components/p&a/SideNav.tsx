"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


const buttonCollection: { title: string; route: string }[] = [
  {
    title: "Prices",
    route: "/PriceAnalysis&Tracking/price",
  },
  {
    title: "Weather",
    route: "/PriceAnalysis&Tracking/weather",
  },
  {
    title: "Trading opportunities",
    route: "/PriceAnalysis&Tracking/tradingOpportunities",
  },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <div className="absolute md:fixed rounded-lg h-screen md:h-full w-52 my-16 flex flex-col justify-between">
      <div>
        <div className="fixed flex border w-screen justify-around bg-white py-2 md:hidden">
              {buttonCollection.map(({ title, route }) => (
                <Link href={route}>
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
            {/* <Button className="mb-4 bg-blue-500 hover:bg-blue-500/10 hover:text-black border border-blue-500">
              Sign Out
            </Button> */}
         
        <div className="hidden md:block mt-2">
          {buttonCollection.map(({ title, route }) => (
            <Link href={route}>
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

      <Button className="mb-36 bg-blue-500 hover:bg-blue-500/10 hover:text-black border border-blue-500 hidden md:block">
        Sign Out
      </Button>
    </div>
  );
}
