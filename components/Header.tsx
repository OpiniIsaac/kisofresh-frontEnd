"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IoIosMenu } from "react-icons/io";

interface NavLink {
  title: string;
  route: string;
}

const NavLinkCollection: { title: string; route: string }[] = [
  { title: "Price analysis & tracking", route: "/PriceAnalysis&Tracking/price" },
  { title: "Source produce", route: "/SourceProduce" },
];

const NavLinks: NavLink[] = NavLinkCollection.map((item) =>{
  return item as NavLink;
});



export default function Header() {
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
    <div>
      <header
        className={`"absolute z-10 w-full fixed py-4 top-0 left-0 text-black border border-black" ${
          isScrolled ? "bg-blue-500 border border-blue-500" : "bg-white"
        }`}
      >
        <Container>
          <div className="flex justify-between">
            <Link
              href="/"
              className={`"border h-10mb-0 text-blue-500 font-extrabold text-[70px]" ${
                isScrolled ? "text-white text-4xl " : "text-blue-500 text-4xl"
              }`}
            >
              KisoIndex
            </Link>

            <div className="flex gap-20 items-center">
              <nav className="flex gap-10 text-sm">
                {NavLinks.map((item) => (
                  <Link
                    href={item.route}
                    className={clsx(
                      `${
                        isScrolled
                          ? "relative hover:text-white transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                          : "relative hover:text-black transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                      }`,
                      {
                        "underline underline-offset-[4px] u ":
                          pathname === item.route,
                      }
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              {/*The button below will navigate to the auth route on which the user will find login page, no need for signup button as there will be option to sign up on login page, two buttons looked ugly  */}
              <Link href="/login" className="hidden md:block">
                <div className="bg-white"></div>
                <Button
                  className={`"" ${
                    isScrolled
                      ? "bg-white text-black hover:bg-blue-700 hover:text-white"
                      : ""
                  }`}
                >
                  Log in
                </Button>
              </Link>
              <IoIosMenu className="block md:hidden"/>
            </div>
          </div>
          {/* <p className="text-lg text-gray-500">
          Data for informed agricultural decisions.
        </p> */}
        </Container>
      </header>
    </div>
  );
}
