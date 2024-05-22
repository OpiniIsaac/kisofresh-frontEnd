"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { IoIosMenu } from "react-icons/io";
import { SlUser } from "react-icons/sl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Login, Logout } from "@/lib/features/accountHandle/loginSlice";
import { Divide } from "lucide-react";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { hedvig, outfit } from "./Fonts";

interface NavLink {
  title: string;
  route: string;
}

const NavLinkCollection: { title: string; route: string }[] = [
  {
    title: "Price analysis & tracking",
    route: "/PriceAnalysis&Tracking/price",
  },
  { title: "Source produce", route: "/SourceProduce" },
];

const NavLinks: NavLink[] = NavLinkCollection.map((item) => {
  return item as NavLink;
});

export default function Header() {
  const [isScrolled, setisScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const islogged = useSelector((state: RootState) => state.LoginState.value);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setIsOpen(true);
  };

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
  const router = useRouter();
  const handleLogout = async () => {
    try {
      router.push("/");
      dispatch(Logout());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <header
        className={` z-10 w-full fixed  top-0 left-0 text-black border ${
          isScrolled ? "bg-blue-500 border-none " : "bg-white"
        }`}
      >
        <Container>
          <div className="flex justify-between">
            <Link
              href="/"
              className={`text-blue-500 font-extrabold ps-4 transition-all ease-in-out ${
                isScrolled
                  ? "text-white text-4xl py-1"
                  : "text-blue-500 text-4xl py-4 "
              } ${hedvig.className}`}
            >
              KisoIndex
            </Link>

            <div className="flex gap-20 items-center ">
              <nav className="flex gap-10 text-sm">
                {NavLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.route}
                    className={clsx(
                      `${
                        isScrolled
                          ? "relative hover:text-white transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-white before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                          : "relative hover:text-black transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hidden md:block"
                      } ${outfit.className}`,
                      {
                        "underline underline-offset-[5px] hover:no-underline":
                          pathname === item.route,
                      }
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              {/*The button below will navigate to the auth route on which the user will find login page, no need for signup button as there will be option to sign up on login page, two buttons looked ugly  */}

              {islogged ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <div
                        className={`${"text-xl flex-col ps-5 items-center hidden md:flex "}`}
                      >
                        <SlUser />
                        <div className="text-sm">Account</div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-60">
                    <div>
                      <br />
                      <h1>Profile</h1>
                      <br />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quidem, unde vitae! Ipsa aspernatur amet laborum
                        omnis, veniam deserunt commodi enim?
                      </p>
                    </div>
                    <br />
                    <div className="flex justify-end">
                      <Button onClick={handleLogout}>Logout</Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div>
                  <Link href="/login" className="hidden md:block">
                    <div className="bg-white"></div>
                    <Button
                      className={`${
                        isScrolled
                          ? "bg-white text-black hover:bg-blue-700 hover:text-white"
                          : ""
                      }`}
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              )}
              <div className="md:absolute">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <IoIosMenu
                        className={`${
                          isScrolled
                            ? "md:hidden mr-4 text-4xl text-white"
                            : "block md:hidden mr-4 text-4xl"
                        }`}
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
                      {NavLinks.map((item) => (
                        <Link key={item.title} href={item.route}>
                          <Button
                            className={clsx(
                              "bg-blue-500/5 w-full my-3 text-black justify-start hover:bg-blue-500 font-semibold text-lg hover:text-white",
                              {
                                "bg-blue-500 text-white":
                                  pathname === item.route,
                              }
                            )}
                          >
                            {item.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <Link href="/sign-up" className="flex justify-end my-4 ">
                      <Button
                        onClick={
                          islogged
                            ? () => dispatch(Logout())
                            : () => dispatch(Login())
                        }
                      >
                        {islogged ? <div>Logout</div> : <div>Login</div>}
                      </Button>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
}
