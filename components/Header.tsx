"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { clearUser } from "@/lib/features/accountHandle/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { hedvig, outfit } from "./Fonts";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/lib/hooks";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";

const NavLinkCollection = [
  {
    title: "Market Trends",
    route: "/PriceAnalysis&Tracking/trends",
  },
  {
    title: "Analysis",
    route: "/PriceAnalysis&Tracking/price",
  },
  { title: "Source Produce", route: "/SourceProduce" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = () => {
    router.push("/sign-up");
  };

  return (
    <header
      className={`z-10 w-full fixed top-0 left-0 text-black border ${
        isScrolled ? "bg-blue-500 border-none" : "bg-white"
      }`}
    >
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className={`ps-4 md:ps-0 text-blue-500 font-extrabold transition-all ease-in-out ${
              isScrolled ? "text-white text-4xl py-1" : "text-blue-500 text-4xl py-4"
            } ${hedvig.className}`}
          >
            KisoIndex
          </Link>
          <nav
            className={`flex gap-10 text-sm ${
              isScrolled ? "text-white" : "text-slate-500"
            }`}
          >
            {NavLinkCollection.map((item) => (
              <Link
                key={item.title}
                href={item.route}
                className={clsx(
                  `relative hover:text-black transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block`,
                  outfit.className,
                  {
                    "text-black": pathname === item.route && !isScrolled,
                    "text-white": pathname === item.route && isScrolled,
                  }
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button className="hidden md:block" onClick={handleLogout}>
                  Log Out
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none flex items-center">
                      <div className="text-xl ps-5 hidden md:flex items-center">
                        {/* User Avatar or Icon can be placed here */}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-60">
                    <div className="p-4">
                      <p className="px-2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Quidem, unde vitae! Ipsa aspernatur amet laborum omnis,
                        veniam deserunt commodi enim?
                      </p>
                    </div>
                    <div className="flex justify-end p-4">
                      <Button onClick={handleLogout} className="m-2">
                        Logout
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button className="hidden md:block" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none md:hidden">
                  <IoIosMenu
                    className={`text-4xl ${isScrolled ? "text-white" : "text-black"}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col justify-between px-4 h-96 w-72 py-4">
                <div>
                  <Link href="/">
                    <Button
                      className={clsx(
                        "bg-blue-500/5 w-full mt-4 mb-3 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white",
                        { "bg-blue-500 text-white": pathname === "/" }
                      )}
                    >
                      Home
                    </Button>
                  </Link>
                  {NavLinkCollection.map((item) => (
                    <Link key={item.title} href={item.route}>
                      <Button
                        className={clsx(
                          "bg-blue-500/5 w-full my-3 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white",
                          {
                            "bg-blue-500 text-white": pathname === item.route,
                          }
                        )}
                      >
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-end p-4">
                  <Button onClick={user ? handleLogout : handleSignIn}>
                    {user ? "Logout" : "Login"}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  );
}
